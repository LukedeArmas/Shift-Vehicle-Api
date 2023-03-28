import autoBind from 'auto-bind';
import { IVehicle } from 'services/Vehicle/Vehicle'
import { VehicleService } from 'services/Vehicle/VehicleService'
import CustomError from '../../utils/CustomError'
import { IShift } from './Shift';
import type { ShiftRepo } from './ShiftRepo';

export class ShiftService {
  public findAll: () => Promise<IShift[]>;
  public findById: (shiftId: string) => Promise<IShift>;

  constructor(
    private shiftRepo: ShiftRepo,
    private vehicleService: VehicleService,
  ) {
    autoBind(this);
    this.findAll = shiftRepo.findAll;
    this.findById = shiftRepo.findById;
  }


  public async create (shiftData: IShift): Promise<IShift> {
    const { shiftRepo } = this;
    // business logic goes here

  
    const createdShift = await shiftRepo.create(shiftData);

    return createdShift;
  }

  public async addVehiclesToShift (shiftId: string, vehicleIds: string[]): Promise<IShift> {
    const { shiftRepo, vehicleService } = this;
  
    const vehicles = await vehicleService.findByIds(vehicleIds);
    if (vehicles.length !== vehicleIds.length) {
      throw new CustomError(400, 'Could not find a vehicle for every vehicle id');
    }
  
    return shiftRepo.update(shiftId, { vehicles });
  }

  private async checkVehiclesWithBatterySwapCompletedInShift (shiftId: string): Promise<IVehicle[]> {
    const { shiftRepo } = this;
  
    const populatedShift = await shiftRepo.findByIdPopulated(shiftId);
    const { vehicles, start_time, end_time } = populatedShift;
    const vehiclesWithSwapInShift: IVehicle[] = [];

    for (const vh of vehicles) {
      if (vh.recent_battery_swap_time && vh.recent_battery_swap_time >= start_time && vh.recent_battery_swap_time <= end_time) {
        vehiclesWithSwapInShift.push(vh);
      }
    }

  // Return vehicles that have had battery swap 
    return vehiclesWithSwapInShift;
  }

  public async checkOneBatterySwapCompletedInShift (shiftId: string): Promise<boolean> {
    const { checkVehiclesWithBatterySwapCompletedInShift } = this;
  
    const vehiclesWithSwapInShift = await checkVehiclesWithBatterySwapCompletedInShift(shiftId);

    return vehiclesWithSwapInShift.length ? true : false;
  }

  public async checkAllBatterySwapsCompletedInShift (shiftId: string): Promise<boolean> {
    const { shiftRepo, checkVehiclesWithBatterySwapCompletedInShift } = this;
  
    const { vehicles: vehiclesInShift } = await shiftRepo.findById(shiftId);
    const swappedVehicles = await checkVehiclesWithBatterySwapCompletedInShift(shiftId);

    return vehiclesInShift.length === swappedVehicles.length;
  }
}
