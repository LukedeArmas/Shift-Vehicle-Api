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

  describe('vehicles', async () => {
    it('GET /api/vehicles', async () => {
      const res = await request(app)
          .get(route);
      
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.greaterThan(10);
    });
  });
});


