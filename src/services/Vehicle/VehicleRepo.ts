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

  public async getClosestVehiclesToPoint (lat: number, long: number, options: { maxDistance?: number, limit?: number }): Promise<any> {
    const { Vehicle } = this;
    // 200 miles in meters
    const { maxDistance = 321869, limit = 20 } = options;
    const vehicles: IVehicle[] = await Vehicle.aggregate([
   {
     $geoNear: {
        near: { 
          type: "Point",
          coordinates: [ lat , long]
        },
        distanceField: "dist.calculated",
        maxDistance,
        spherical: true
     }
   }, 
   {
      $limit: limit,
   }
  ]);

    return vehicles;
  }
}