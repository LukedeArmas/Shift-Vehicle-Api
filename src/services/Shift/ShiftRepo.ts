import autoBind from 'auto-bind';
import type { IMongooseShiftModel, IShift } from './Shift';

export class ShiftRepo {
  constructor(
    private Shift: IMongooseShiftModel,
  ) {
    autoBind(this);
  }

  public async findAll (): Promise<IShift[]> {
    const { Shift } = this;
    const shifts = await Shift.find({}).lean();

    return shifts;
  }
}