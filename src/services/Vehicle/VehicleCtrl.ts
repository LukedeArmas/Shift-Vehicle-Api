import autoBind from 'auto-bind';
import type { VehicleService } from "./VehicleService"
import { Request, Response, NextFunction } from "express";


export class VehicleCtrl {
  constructor(
    private vehicleService: VehicleService,
  ) {
    autoBind(this);
  }

  public findAll (req: Request, res: Response, next: NextFunction) {
    const { vehicleService } = this;
    (async () => {
      const vehicles = await vehicleService.findAll();
      res.status(200).json(vehicles);
    })()
    .catch(next);
  }
}
