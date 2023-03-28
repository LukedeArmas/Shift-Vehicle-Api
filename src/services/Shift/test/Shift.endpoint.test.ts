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

chai.use(chaiHttp);
const { expect, request } = chai;

describe('shifts', () => {
  const app: Express = createServer();
  let httpServer;
  let dbConnection: Connection;
  let dbServer: MongoMemoryServer;
  let injector: IDIContainer;
  let Shift: IMongooseShiftModel;
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

    await Shift.insertMany(shiftData);
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
      expect(res.body.length).to.be.equal(3);
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
});


