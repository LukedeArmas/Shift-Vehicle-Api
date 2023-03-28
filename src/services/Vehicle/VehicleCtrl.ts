import autoBind from 'auto-bind';
import type { VehicleService } from "./VehicleService"
import { Request, Response, NextFunction } from "express";
import CustomError from '../../utils/CustomError'


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
      res.status(200).json({ success: true, data: vehicles });
    })()
    .catch(next);
  }

  public swapBattery (req: Request, res: Response, next: NextFunction) {
    const { vehicleService } = this;
    const { id } = req.params;
    const { newBatteryLevel } = req.body;

    if (!id || !newBatteryLevel) {
      return next(new CustomError(400, 'Must include vehicle id and new battery level'));
    }

    if (typeof newBatteryLevel !== 'number') {
      return next(new CustomError(400, 'Battery level must be a number'));
    }

    (async () => {
      const vehicle = await vehicleService.findById(id);
      if (!vehicle) {
        throw new CustomError(404, 'Vehicle not found');
      }

      const updatedVehicle = await vehicleService.swapBattery(id, newBatteryLevel);

      res.status(200).json({ success: true, data: updatedVehicle });
    })()
    .catch(next);
  }
}
