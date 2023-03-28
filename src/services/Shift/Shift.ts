import {Schema, model, Document, Model } from 'mongoose';
import type { ObjectId } from 'mongodb';
import { IVehicle } from 'services/Vehicle/Vehicle'


export interface IShift extends Document {
    _id: string | ObjectId;
    employeeId: string;
    vehicles: IVehicle[];
    lat: Number,
    long: Number,
    start_time: Date,
    end_time: Date,
}

export type IMongooseShiftModel = Model<IShift>;

const shiftSchema = new Schema({
  // Normally this would reference an employee db entity
    employeeId: {
        type: String,
        required: true
    },
    vehicles: [{
        type: Schema.Types.ObjectId, 
        ref: 'Vehicle',
        required: true,
    }],
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    // Ideally have a timezone enum here
},
{
    timestamps: true
}
);

export const shiftFactory = () => {
    return model<IShift>('Shift', shiftSchema);
};
