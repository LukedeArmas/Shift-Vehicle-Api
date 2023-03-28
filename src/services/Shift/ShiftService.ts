import autoBind from 'auto-bind';
import type { ShiftRepo } from "./ShiftRepo"

export class ShiftService {
  public findAll;

  constructor(
    private shiftRepo: ShiftRepo,
  ) {
    autoBind(this);
    this.findAll = shiftRepo.findAll;
  }
}