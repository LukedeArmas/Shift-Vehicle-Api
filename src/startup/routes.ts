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
  // Complete battery swap for a vehicle
  app.post(`/api/vehicles/:id/battery_swap`, vehicleCtrl.swapBattery);

  // shift routes

  app.get(`/api/shifts`, shiftCtrl.findAll);
  // Create a shift
  app.post(`/api/shifts`, shiftCtrl.create);
  // Add vehicles to a shift
  app.post(`/api/shifts/:id/add_vehicles`, shiftCtrl.addVehiclesToShift);
  // Review all vehicles in a shift
  app.get(`/api/shifts/:id/find_vehicles`, shiftCtrl.findVehiclesForShift);
  // check if a swap has been completed for any vehicle in a shift
  app.get(`/api/shifts/:id/check_one_battery_swap_completed`, shiftCtrl.checkOneBatterySwapCompletedInShift);
  // query shift to see if all vehicles in the shift have had their battery swaps
  app.get(`/api/shifts/:id/check_all_battery_swaps_completed`, shiftCtrl.checkAllBatterySwapsCompletedInShift);


}