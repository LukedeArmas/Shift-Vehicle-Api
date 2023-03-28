import init from '../../../startup/init';
import { Express } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { clearDb } from '../../../db/config'; 
import { IDIContainer } from 'rsdi'
import * as types from '../../../startup/types';
import configure from '../../../startup/injector';
import { vehicleData } from './vehicleData';
import { IMongooseVehicleModel } from 'services/Vehicle/Vehicle'

chai.use(chaiHttp);
const { expect, request } = chai;

describe.only('vehicles', () => {
  let app: Express;
  let injector: IDIContainer;
  let Vehicle: IMongooseVehicleModel;
  const route = '/api/vehicles';

  before(async () => {
    // Already connects to db in init function
    app = await init();
    injector = configure();
    Vehicle = injector.get(types.Vehicle);
  });

  beforeEach(async () => {
    await Vehicle.insertMany(vehicleData);
  })

  after(async () => await clearDb());

  describe('vehicles', async () => {
    it('GET /api/vehicles', async () => {
      const res = await request(app)
          .get(route);
      
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.greaterThan(10);
    });
  });
});


