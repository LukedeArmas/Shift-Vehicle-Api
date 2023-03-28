import {Schema, model, Document, Model } from 'mongoose';
import type { ObjectId } from 'mongodb';
import { IVehicle } from 'services/Vehicle/Vehicle'


export interface IShift extends Document {
    _id: string | ObjectId;
    employeeId?: string;
    vehicles: IVehicle[];
    location: {
        type: string,
        coordinates: number[],
    },
    start_time: Date;
    end_time: Date;
}

export type IMongooseShiftModel = Model<IShift>;

const shiftSchema = new Schema({
  // Normally this would reference an employee db entity
    employeeId: {
        type: String,
        required: false,
    },
    vehicles: [{
        type: Schema.Types.ObjectId, 
        ref: 'Vehicle',
        required: true,
    }],
    location: {
        type: { type: String },
        coordinates: [Number],
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
