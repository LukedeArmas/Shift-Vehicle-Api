import autoBind from 'auto-bind';
import type { VehicleRepo } from "./VehicleRepo"

export class VehicleService {
  public findAll;

  constructor(
    private vehicleRepo: VehicleRepo,
  ) {
    autoBind(this);
    this.findAll = vehicleRepo.findAll;
  }
}