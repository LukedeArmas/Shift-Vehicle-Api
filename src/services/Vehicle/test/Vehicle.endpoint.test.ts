import createServer from '../../../startup/server';
import { Express } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { clearDb, connectDb, closeDb } from '../../../db/config'; 
import { IDIContainer } from 'rsdi'
import * as types from '../../../startup/types';
import configure from '../../../startup/injector';
import { vehicleData } from './vehicleData';
import { IMongooseVehicleModel } from 'services/Vehicle/Vehicle'
import type { Connection } from 'mongoose';
import type { MongoMemoryServer } from 'mongodb-memory-server';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('vehicles', () => {
  const app: Express = createServer();
  let httpServer;
  let dbConnection: Connection;
  let dbServer: MongoMemoryServer;
  let injector: IDIContainer;
  let Vehicle: IMongooseVehicleModel;
  const route = '/api/vehicles';

  before(async () => {
    const { connection, server } = await connectDb();
    dbConnection = connection;
    dbServer = server;
    httpServer = app.listen(5000, () => {
			console.log("Test server has started!")
		})
    injector = configure();
    Vehicle = injector.get(types.Vehicle);

    await Vehicle.insertMany(vehicleData);
  });

  after(async () => {
    await clearDb(dbConnection);
    await closeDb(dbConnection, dbServer);
    httpServer.close();
  });

  describe('GET /api/vehicles', async () => {
    it('Should get all vehicles', async () => {
      const res = await request(app)
          .get(route);
      
      expect(res.status).to.be.equal(200);
      expect(res.body.data.length).to.be.greaterThan(10);
    });
  });

  describe('POST /api/vehicles/:id/battery_swap', async () => {
    it('Should swap battery successfully and have changed recent battery swap time', async () => {
      // Second vehicle in vehicleData.ts
      const vehicleId = '64225b79cb285ace75c810f9';
      // Ideally it's own model 
      const battery = {
        newBatteryLevel: 100,
      };

      const res = await request(app)
          .post(`${route}/${vehicleId}/battery_swap`)
          .send({ newBatteryLevel: battery.newBatteryLevel });
      
      expect(res.status).to.be.equal(200);
      const { success, data: updatedVehicle } = res.body;
      expect(success).to.be.equal(true);
      
      expect(updatedVehicle.battery_level).to.be.equal(battery.newBatteryLevel);

      // Ideally would have more testing to check the swap time on the integration test level 
      expect(updatedVehicle.recent_battery_swap_time).to.exist;
    });

    it('Should fail if battery level is not in correct range', async () => {
      // Second vehicle in vehicleData.ts
      const vehicleId = '64225b79cb285ace75c810f9';
      // Ideally it's own model 
      const battery = {
        newBatteryLevel: 102,
      };

      const res = await request(app)
          .post(`${route}/${vehicleId}/battery_swap`)
          .send({ newBatteryLevel: battery.newBatteryLevel });
      
      expect(res.status).to.be.equal(400);
    });
  });
});


