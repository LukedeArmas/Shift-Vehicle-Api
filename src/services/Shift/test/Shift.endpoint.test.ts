import init from '../../../startup/init';
import { Express } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { clearDb } from '../../../db/config'; 
import { IDIContainer } from 'rsdi'
import * as types from '../../../startup/types';
import configure from '../../../startup/injector';
import { shiftData } from './shiftData';
import { IMongooseShiftModel } from 'services/Shift/Shift'

chai.use(chaiHttp);
const { expect, request } = chai;

describe('shifts', () => {
  let app: Express;
  let injector: IDIContainer;
  let Shift: IMongooseShiftModel;
  const route = '/api/shifts';

  before(async () => {
    // Already connects to db in init function
    app = await init();
    injector = configure();
    Shift = injector.get(types.Shift);
  });

  beforeEach(async () => {
    await Shift.insertMany(shiftData);
  })

  after(async () => await clearDb());

  describe('shifts', async () => {
    it('GET /api/shifts', async () => {
      const res = await request(app)
          .get(route);
      
      expect(res.status).to.be.equal(200);
      console.log(res.body);
    });
  });
});


