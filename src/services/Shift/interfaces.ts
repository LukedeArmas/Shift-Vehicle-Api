import { IVehicle } from "../../services/Vehicle/Vehicle"

export interface ICreateShift {
    employeeId?: string;
    vehicles: IVehicle[];
    lat: number;
    long: number;
    start_time: Date;
    end_time: Date;
}

export interface IAutoCreateShift {
    employeeId?: string;
    lat: number;
    long: number;
    start_time: Date;
    end_time: Date;
}