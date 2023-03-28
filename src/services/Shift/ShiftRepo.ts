import autoBind from 'auto-bind';
import type { IMongooseShiftModel, IShift } from './Shift';

export class ShiftRepo {
  constructor(
    private Shift: IMongooseShiftModel,
  ) {
    autoBind(this);
  }

  public async findAll (): Promise<IShift[]> {
    return this.Shift.find({}).lean();
  }

  public async create (data: IShift): Promise<IShift> {
    return this.Shift.create(data);
  }

  public async findById (id: string): Promise<IShift> {
    return this.Shift.findById(id).lean();
  }

  public async findByIdPopulated (id: string): Promise<IShift> {
    return this.Shift.findById(id).populate('vehicles').lean();
  }

  public async update (id: string, body: Partial<IShift>): Promise<IShift> {
    return this.Shift.findByIdAndUpdate(id, body, { new: true }).lean();
  }
}