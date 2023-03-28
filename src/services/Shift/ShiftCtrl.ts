import autoBind from 'auto-bind';
import type { ShiftService } from "./ShiftService"
import { Request, Response, NextFunction } from "express";
import { createShiftSchema } from './schemas';
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
}
