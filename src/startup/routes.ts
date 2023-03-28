import { Express } from 'express';
import { IDIContainer } from "rsdi";
import * as types from './types';
import type { VehicleCtrl } from 'services/Vehicle/VehicleCtrl';
import type { ShiftCtrl } from 'services/Shift/ShiftCtrl';

export default function configure(app: Express, injector: IDIContainer) {
  const vehicleCtrl: VehicleCtrl = injector.get(types.VehicleCtrl);
  const shiftCtrl: ShiftCtrl = injector.get(types.ShiftCtrl);

  // vehicle routes
  app.get(`/api/vehicles`, vehicleCtrl.findAll);

  // shift routes
  app.get(`/api/shifts`, shiftCtrl.findAll);
  app.post(`/api/shifts`, shiftCtrl.create);
}