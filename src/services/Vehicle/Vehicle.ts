import {Schema, model, Document, Model } from 'mongoose';
import type { ObjectId } from 'mongodb';
import { enumArray as vehicleModelEnumArray } from '../../enums/vehicleModel';


export interface IVehicle extends Document {
    _id: string | ObjectId;
    username: string;
    battery_level: number;
    in_use: boolean;
    model: string;
}

export type IMongooseVehicleModel = Model<IVehicle>;

const vehicleSchema = new Schema({
    license_plate: {
        type: String,
        required: true
    },
    battery_level: {
        type: Number,
        required: true,
        default: 0,
    },
    in_use: {
        type: Boolean,
        required: true,
    },
    model: {
        type: String,
        required: true,
        enum: vehicleModelEnumArray,
    },
},
{
    timestamps: true
}
);

export const vehicleFactory = () => {
    return model<IVehicle>('Vehicle', vehicleSchema);
};
