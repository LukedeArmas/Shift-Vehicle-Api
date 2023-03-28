import autoBind from 'auto-bind';
import type { ShiftService } from "./ShiftService"
import { Request, Response, NextFunction } from "express";


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
}
