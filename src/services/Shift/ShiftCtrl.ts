import autoBind from 'auto-bind';
import type { ShiftService } from "./ShiftService"
import { Request, Response, NextFunction } from "express";
import { createShiftSchema, autoCreateShiftSchema } from './schemas';
import CustomError from '../../utils/CustomError';
import * as utils from '../../utils/utils';


export class ShiftCtrl {
  constructor(
    private shiftService: ShiftService,
  ) {
    autoBind(this);
  }

  public findAll (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    (async () => {
      const shifts = await shiftService.findAll();
      res.status(200).json(shifts);
    })()
    .catch(next);
  }

  public create (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    const { shiftData } = req.body;

    if (!shiftData) {
      return next(new Error('shiftData does not exist'));
    }

    const {error} = createShiftSchema.validate(shiftData, {convert:false});
    
    if (error) {
      // Convert joi error message string to be more readable
        const message = utils.convertJoiErrorMessage(error);
        // CustomError allows us to include a status
        throw new CustomError(400, message)
    }

    (async () => {
      const createdShift = await shiftService.create(shiftData);
      res.status(201).json({ success: true, data: createdShift });
    })()
    .catch(next);
  }

  public addVehiclesToShift (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    const { id } = req.params;
    const { vehicles } = req.body;

    if (!id || !vehicles) {
      return next(new CustomError(400, 'Must include shift id and vehicles'));
    }

    (async () => {
      const shift = await shiftService.findById(id);
      if (!shift) {
        throw new CustomError(404, 'Shift not found');
      }

      const updatedShift = await shiftService.addVehiclesToShift(id, vehicles);

      res.status(200).json({ success: true, data: updatedShift });
    })()
    .catch(next);
  }

  public findVehiclesForShift (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(400, 'Must include shift id'));
    }

    (async () => {
      const shift = await shiftService.findById(id);
      if (!shift) {
        throw new CustomError(404, 'Shift not found');
      }

      res.status(200).json({ success: true, data: shift?.vehicles });
    })()
    .catch(next);
  }

  public checkOneBatterySwapCompletedInShift (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(400, 'Must include shift id'));
    }

    (async () => {
      const shift = await shiftService.findById(id);
      if (!shift) {
        throw new CustomError(404, 'Shift not found');
      }

      const result = await shiftService.checkOneBatterySwapCompletedInShift(id);

      res.status(200).json({ result });
    })()
    .catch(next);
  }

  public checkAllBatterySwapsCompletedInShift (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(400, 'Must include shift id'));
    }

    (async () => {
      const shift = await shiftService.findById(id);
      if (!shift) {
        throw new CustomError(404, 'Shift not found');
      }

      const result = await shiftService.checkAllBatterySwapsCompletedInShift(id);

      res.status(200).json({ result });
    })()
    .catch(next);
  }

  public autoCreation (req: Request, res: Response, next: NextFunction) {
    const { shiftService } = this;
    const { shiftData } = req.body;

    if (!shiftData) {
      return next(new Error('shiftData does not exist'));
    }

    const {error} = autoCreateShiftSchema.validate(shiftData, {convert:false});
    
    if (error) {
      // Convert joi error message string to be more readable
        const message = utils.convertJoiErrorMessage(error);
        // CustomError allows us to include a status
        throw new CustomError(400, message)
    }

    (async () => {
      const createdShift = await shiftService.autoCreation(shiftData);
      res.status(201).json({ success: true, data: createdShift });
    })()
    .catch(next);
  }
}
