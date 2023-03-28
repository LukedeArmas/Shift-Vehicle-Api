import { expect } from 'chai';
import { clearDb, connectDb, closeDb } from '../../../db/config'; 
import { IDIContainer } from 'rsdi'
import * as types from '../../../startup/types';
import configure from '../../../startup/injector';
import { vehicleData } from './vehicleData';
import { IMongooseVehicleModel } from 'services/Vehicle/Vehicle'
import type { Connection } from 'mongoose';
import type { MongoMemoryServer } from 'mongodb-memory-server';
import { VehicleService } from '../VehicleService'


describe('ShiftService integration', () => {
  let dbConnection: Connection;
  let dbServer: MongoMemoryServer;
  let injector: IDIContainer;
  let Vehicle: IMongooseVehicleModel;
  let vehicleService: VehicleService;

  before(async () => {
    const { connection, server } = await connectDb();
    dbConnection = connection;
    dbServer = server;
    injector = configure();
    Vehicle = injector.get(types.Vehicle);
    vehicleService = injector.get(types.VehicleService);

    await Vehicle.insertMany(vehicleData);
  });

  after(async () => {
    await clearDb(dbConnection);
    await closeDb(dbConnection, dbServer);
  });

  describe('getClosestVehiclesToPoint', async () => {
    it('Should get 20 closest vehicles to point in order', async () => {
      const lat = 40.712776;
      const long = -74.005974;

      // Calculated and sorted from mongo $geoNear
      const closestVehicles = await vehicleService.getClosestVehiclesToPoint(lat, long, {});
      expect(closestVehicles.length).to.be.equal(20);

      // check in sorted ascending order
      for (let i=0; i < closestVehicles.length - 1; i++) {
        expect(closestVehicles[i].dist.calculated <= closestVehicles[i+1].dist.calculated).to.be.true;
      }
    });
  });
});
