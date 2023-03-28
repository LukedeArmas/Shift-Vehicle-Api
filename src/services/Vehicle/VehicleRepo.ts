import autoBind from 'auto-bind';
import type { IMongooseVehicleModel, IVehicle } from './Vehicle';

export class VehicleRepo {
  constructor(
    private Vehicle: IMongooseVehicleModel,
  ) {
    autoBind(this);
  }

  // Ideally could make a factory for these kind of repetitive query methods, where we plug in the model
  // and it spits out all of these functions for us
  public async findAll (): Promise<IVehicle[]> {
    return this.Vehicle.find({}).lean();
  }

  public async findByIds (ids: string[]): Promise<IVehicle[]> {
    return this.Vehicle.find({ _id: { $in: ids } }).lean();
  }

  public async findById (id: string): Promise<IVehicle> {
    return this.Vehicle.findById(id).lean();
  }

  public async update (id: string, body: Partial<IVehicle>): Promise<IVehicle> {
    return this.Vehicle.findByIdAndUpdate(id, body, { new: true }).lean();
  }
}