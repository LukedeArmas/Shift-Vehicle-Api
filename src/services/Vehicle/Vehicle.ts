import {Schema, model, Document, Model } from 'mongoose';
import type { ObjectId } from 'mongodb';
import { enumArray as vehicleModelEnumArray, VehicleModel } from '../../enums/vehicleModel';


export interface IVehicle extends Document {
    _id: string | ObjectId;
    license_plate: string;
    battery_level: number;
    recent_battery_swap_time?: string | Date;
    in_use: boolean;
    model: VehicleModel;
    location: {
        type: string,
        coordinates: number[],
    },
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
    recent_battery_swap_time: {
        type: Date,
        required: false,
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
    location: {
        type: { type: String },
        coordinates: [Number],
    },
},
{
    timestamps: true
}
);

vehicleSchema.index({ "location" : "2dsphere" });
vehicleSchema.index({ batteryLevel: 1 });
vehicleSchema.index({ in_use: 1 });

export const vehicleFactory = () => {
    return model<IVehicle>('Vehicle', vehicleSchema);
};
