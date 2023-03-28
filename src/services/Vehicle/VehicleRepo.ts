import autoBind from 'auto-bind';
import type { IMongooseVehicleModel, IVehicle } from './Vehicle';

export class VehicleRepo {
  constructor(
    private Vehicle: IMongooseVehicleModel,
  ) {
    autoBind(this);
  }

  public async findAll (): Promise<IVehicle[]> {
    const { Vehicle } = this;
    const vehicles = await Vehicle.find({}).lean();

    return vehicles;
  }
}