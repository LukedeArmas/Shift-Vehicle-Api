import createServer from '../../../startup/server';
import { Express } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { clearDb, closeDb, connectDb } from '../../../db/config'; 
import { IDIContainer } from 'rsdi'
import * as types from '../../../startup/types';
import configure from '../../../startup/injector';
import { shiftData } from './shiftData';
import { IMongooseShiftModel } from 'services/Shift/Shift';
import type { Connection } from 'mongoose';
import type { MongoMemoryServer } from 'mongodb-memory-server';
import { IMongooseVehicleModel, IVehicle } from 'services/Vehicle/Vehicle'
import { vehicleData } from '../../Vehicle/test/vehicleData'
import { VehicleModel } from '../../../enums/vehicleModel'

chai.use(chaiHttp);
const { expect, request } = chai;

describe('shifts', () => {
  const app: Express = createServer();
  let httpServer;
  let dbConnection: Connection;
  let dbServer: MongoMemoryServer;
  let injector: IDIContainer;
  let Shift: IMongooseShiftModel;
  let Vehicle: IMongooseVehicleModel;
  const route = '/api/shifts';

  before(async () => {
    const { connection, server } = await connectDb();
    dbConnection = connection;
    dbServer = server;
    httpServer = app.listen(5000, () => {
			console.log("Test server has started!")
		})
    injector = configure();
    Shift = injector.get(types.Shift);
    Vehicle = injector.get(types.Vehicle);

    // Ideally have a seeding file
    await Shift.insertMany(shiftData);
    await Vehicle.insertMany(vehicleData);
  });

  after(async () => {
    await clearDb(dbConnection);
    await closeDb(dbConnection, dbServer);
    httpServer.close();
  } );

  describe('GET /api/shifts', async () => {
    it('Should get all shifts', async () => {
      const res = await request(app)
          .get(route);
      
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(shiftData.length);
    });
  });

  describe('POST /api/shifts', async () => {
    it('Should create shift', async () => {
      const shiftData = {
        employeeId: '7a040e05-5ca1-4f78-bbbc-8c851450aa0f',
        vehicles: [],
        lat: 40.712776,
        long: -74.005974,
        start_time: new Date().toISOString(),
        end_time: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
      }

      const res = await request(app)
          .post(route)
          .send({ shiftData });

      expect(res.status).to.be.equal(201);

      const { success, data: resultShift } = res.body;
      expect(success).to.be.true;
      
      // Confirm shift is created in db
      const shift = await Shift.findById(resultShift._id);
      expect(shift).to.exist;
      expect(shift.employeeId).to.be.equal(shiftData.employeeId);
      expect(shift.lat).to.be.equal(shiftData.lat);
    });
  });

  describe('POST /api/shifts/:id/add_vehicles', async () => {
    it('Should add vehicles to shift', async () => {
      // First shift in shiftData.ts
      const shiftId = '64225a94447d020e297715e2';
      // First two vehicles from vehicleData.ts
      const vehicleOne = '64225b79cb285ace75c810f8';
      const vehicleTwo = '64225b79cb285ace75c810f9';

      const res = await request(app)
          .post(`${route}/${shiftId}/add_vehicles`)
          .send({ vehicles: [vehicleOne, vehicleTwo] });
      
      expect(res.status).to.be.equal(200);
      const { success} = res.body;
      expect(success).to.be.true;

      const updatedShift = await Shift.findById(shiftId).lean();
      // Could compare other properties if we wanted to, just checking if the ids are there
      const vehicleIds = updatedShift.vehicles.map(vh => vh._id.toString());
      expect(vehicleIds.includes(vehicleOne) && vehicleIds.includes(vehicleTwo)).to.be.true;
    });

    it('Should fail for a non-existent shift id', async () => {
      const nonExistentShiftId = '64225a94447d020e29771333';

      const res = await request(app)
          .post(`${route}/${nonExistentShiftId}/add_vehicles`)
          .send({ vehicles: [] });
      
      // Able to differentiate the error by this status code
      expect(res.status).to.be.equal(404);
    });

    it('Should fail for a non-existent vehicle', async () => {
      const shiftId = '64225a94447d020e297715e2';
      const nonExistentVehicle = '64225b79cb285ace75c81333';

      const res = await request(app)
          .post(`${route}/${shiftId}/add_vehicles`)
          .send({ vehicles: [nonExistentVehicle] });
      
      expect(res.status).to.be.equal(400);
    });
  });

  describe('POST /api/shifts/:id/find_vehicles', async () => {
    // Second shift in shiftData.ts
    const shiftId = '64225a94447d020e297715e3';
    // Third and Fourth in vehicleData.ts
    const vehicleIdThree = '64225b79cb285ace75c810fa';
    const vehicleIdFour = '64225b79cb285ace75c810fb';

    // We don't want this block to rely on previous tests, which is why we load up what we want in the before hook
    before(async () => {
      await Shift.findByIdAndUpdate(shiftId, { vehicles: [vehicleIdThree, vehicleIdFour] });
    });

    after(async () => {
      await Shift.findByIdAndUpdate(shiftId, { vehicles: [] });
    });


    it('Should get vehicles for shift', async () => {
      const res = await request(app)
          .get(`${route}/${shiftId}/find_vehicles`);
      
      expect(res.status).to.be.equal(200);
      const { success, data: vehicleIds } = res.body;
      expect(success).to.be.true;

      expect(vehicleIds.includes(vehicleIdThree) && vehicleIds.includes(vehicleIdFour)).to.be.true;
    });

    it('Should fail for a non-existent shift id', async () => {
      const nonExistentShiftId = '64225a94447d020e29771333';

      const res = await request(app)
          .get(`${route}/${nonExistentShiftId}/find_vehicles`);
      
      // Able to differentiate the error by this status code
      expect(res.status).to.be.equal(404);
    });
  });

  describe('POST /api/shifts/:id/find_vehicles', async () => {
    // Second shift in shiftData.ts
    const shiftId = '64225a94447d020e297715e3';
    // Third and Fourth in vehicleData.ts
    const vehicleIdThree = '64225b79cb285ace75c810fa';
    const vehicleIdFour = '64225b79cb285ace75c810fb';

    // We don't want this block to rely on previous tests, which is why we load up what we want in the before hook
    before(async () => {
      await Shift.findByIdAndUpdate(shiftId, { vehicles: [vehicleIdThree, vehicleIdFour] });
    });

    after(async () => {
      await Shift.findByIdAndUpdate(shiftId, { vehicles: [] });
    });


    it('Should get vehicles for shift', async () => {
      const res = await request(app)
          .get(`${route}/${shiftId}/find_vehicles`);
      
      expect(res.status).to.be.equal(200);
      const { success, data: vehicleIds } = res.body;
      expect(success).to.be.true;

      expect(vehicleIds.includes(vehicleIdThree) && vehicleIds.includes(vehicleIdFour)).to.be.true;
    });

    it('Should fail for a non-existent shift id', async () => {
      const nonExistentShiftId = '64225a94447d020e29771333';

      const res = await request(app)
          .get(`${route}/${nonExistentShiftId}/find_vehicles`);
      
      // Able to differentiate the error by this status code
      expect(res.status).to.be.equal(404);
    });
  });

  describe('POST /api/shifts/:id/check_one_battery_swap_completed', async () => {
    // Added one vehicle with a recent battery swap in range (in shiftData.ts)
    const shift = '6422a70622c0796f77a3983c';
    // Added two vehicles with recent battery swaps out of range (in shiftData.ts)
    const shiftWithNoSwaps = '6422a95033457486396de1b9';


    it('Should be true for shift', async () => {
      const res = await request(app)
          .get(`${route}/${shift}/check_one_battery_swap_completed`);
      
      expect(res.status).to.be.equal(200);
      const { result } = res.body;
      expect(result).to.be.true;
    });

    it('Should be false for shift', async () => {
      const res = await request(app)
          .get(`${route}/${shiftWithNoSwaps}/check_one_battery_swap_completed`);
      
      expect(res.status).to.be.equal(200);
      const { result } = res.body;
      expect(result).to.be.false;
    });
  });

  describe('POST /api/shifts/:id/check_all_battery_swaps_completed', async () => {
    // Added two vehicles with recent battery swaps out of range (in shiftData.ts)
    const shiftWithNoSwaps = '6422a95033457486396de1b9';
    // Added three vehicles with only one swapped in shift
    const shiftWithOneButNotAllSwaps = '6422adde6923ab73e768fed5';
    // Added two vehicles with both swapped in shift
    const shiftWithAllVehiclesSwapped = '6422ae558d85cfce53e8738e';


    it('Should be false for shift with no vehicle swaps', async () => {
      const res = await request(app)
          .get(`${route}/${shiftWithNoSwaps}/check_all_battery_swaps_completed`);
      
      expect(res.status).to.be.equal(200);
      const { result } = res.body;
      expect(result).to.be.false;
    });

    it('Should be false for shift with some but not all vehicle swaps', async () => {
      const res = await request(app)
          .get(`${route}/${shiftWithOneButNotAllSwaps}/check_all_battery_swaps_completed`);
      
      expect(res.status).to.be.equal(200);
      const { result } = res.body;
      expect(result).to.be.false;
    });

    it('Should be true for shift with every vehicle swapped', async () => {
      const res = await request(app)
          .get(`${route}/${shiftWithAllVehiclesSwapped}/check_all_battery_swaps_completed`);
      
      expect(res.status).to.be.equal(200);
      const { result } = res.body;
      expect(result).to.be.true;
    });
  });
});


