import autoBind from 'auto-bind';
import CustomError from '../../utils/CustomError';
import { IVehicle } from './Vehicle';
import type { VehicleRepo } from './VehicleRepo';

export class VehicleService {
  public findAll: () => Promise<IVehicle[]>;
  public findById: (shiftId: string) => Promise<IVehicle>;
  public findByIds: (vehicleIds: string[]) => Promise<IVehicle[]>;
  public getClosestVehiclesToPoint: (lat: number, long: number, options: { maxDistance?: number, limit?: number }) => Promise<any>;

  constructor(
    private vehicleRepo: VehicleRepo,
  ) {
    autoBind(this);
    this.findAll = vehicleRepo.findAll;
    this.findByIds = vehicleRepo.findByIds;
    this.findById = vehicleRepo.findById;
    this.getClosestVehiclesToPoint = vehicleRepo.getClosestVehiclesToPoint;
  }

  public async swapBattery(vehicleId: string, newBatteryLevel: number) {
    const { vehicleRepo } = this;

    // domain logic is considered here
    if (newBatteryLevel < 0 || newBatteryLevel > 100) {
      throw new CustomError(400, 'Invalid battery level');
    }

    const recent_battery_swap_time = new Date().toISOString();

    // Also update with latest battery swap time
    return vehicleRepo.update(vehicleId, { battery_level: newBatteryLevel, recent_battery_swap_time });
  }
}