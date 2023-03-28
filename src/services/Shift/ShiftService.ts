import autoBind from 'auto-bind';
import { IShift } from './Shift';
import type { ShiftRepo } from './ShiftRepo';

export class ShiftService {
  public findAll;

  constructor(
    private shiftRepo: ShiftRepo,
  ) {
    autoBind(this);
    this.findAll = shiftRepo.findAll;
  }


  public async create (shiftData: IShift): Promise<IShift> {
    const { shiftRepo } = this;
    // business logic goes here

  
    const createdShift = await shiftRepo.create(shiftData);

    return createdShift;
  }
}