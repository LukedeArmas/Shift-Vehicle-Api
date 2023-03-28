import { VehicleModel } from "../../../enums/vehicleModel";

// Mongo automatically adds an id for each
export const vehicleData = [
    {
        _id: '64225b79cb285ace75c810f8',
        license_plate: "NY0001",
        battery_level: 90,
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.680245,
        long: -73.996955,
    },
    {
        _id: '64225b79cb285ace75c810f9',
        license_plate: "NY0002",
        battery_level: 9,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.684978,
        long: -73.998965
    },
    {
        _id: '64225b79cb285ace75c810fa',
        license_plate: "NY0003",
        battery_level: 65,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.683574,
        long: -73.990715
    },
    {
        _id: '64225b79cb285ace75c810fb',
        license_plate: "NY0004",
        battery_level: 34,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.67942,
        long: -73.983841
    },
    {
        _id: '64225b79cb285ace75c810fc',
        license_plate: "NY0005",
        battery_level: 20,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.676695,
        long: -73.988838
    },
    {
        _id: '64225b79cb285ace75c810fd',
        license_plate: "NY0006",
        battery_level: 15,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.675496,
        long: -73.99468
    },
    {
        _id: '64225b79cb285ace75c810fe',
        license_plate: "NY0007",
        battery_level: 90,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.678274,
        long: -74.001642
    },
    {
        _id: '64225b79cb285ace75c810ff',
        license_plate: "NY0008",
        battery_level: 9,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.678434,
        long: -73.997158
    },
    {
        _id: '64225b79cb285ace75c81100',
        license_plate: "NY0009",
        battery_level: 90,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.683456,
        long: -74.002047
    },
    {
        _id: '64225b79cb285ace75c81101',
        license_plate: "NY0010",
        battery_level: 22,
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.677941,
        long: -73.982731
    },
    {
        _id: '64225b79cb285ace75c81102',
        license_plate: "NY0011",
        battery_level: 76,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.673533,
        long: -73.981992
    },
    {
        _id: '64225b79cb285ace75c81103',
        license_plate: "NY0012",
        battery_level: 90,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.668346,
        long: -73.976115
    },
    {
        _id: '64225b79cb285ace75c81104',
        license_plate: "NY0013",
        battery_level: 2,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.669861,
        long: -73.989846
    },
    {
        _id: '64225b79cb285ace75c81105',
        license_plate: "NY0014",
        battery_level: 13,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.673568,
        long: -74.000575
    },
    {
        _id: '64225b79cb285ace75c81106',
        license_plate: "NY0015",
        battery_level: 17,
        in_use: false,
        model: VehicleModel.NIU,
        lat: 40.676001,
        long: -73.987382
    },
    {
        _id: '6422a72e74228ccb9d7ae092',
        license_plate: "NY00023",
        battery_level: 90,
        // Should be within shift window
        recent_battery_swap_time: new Date().toISOString(),
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.680245,
        long: -73.996955,
    },
    {
        _id: '6422a75cd7e61c744bad58ee',
        license_plate: "NY00024",
        battery_level: 90,
        recent_battery_swap_time: new Date().toISOString(),
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.680245,
        long: -73.996955,
    },
    {
        _id: '6422a798015d8476eee65206',
        license_plate: "NY00025",
        battery_level: 90,
        recent_battery_swap_time: new Date().toISOString(),
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.680245,
        long: -73.996955,
    },
    {
        _id: '6422a8b53d094083edda3480',
        license_plate: "NY00026",
        battery_level: 90,
        recent_battery_swap_time: new Date(new Date().setHours(new Date().getHours() - 6)).toISOString(),
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.680245,
        long: -73.996955,
    },
    {
        _id: '6422a8ebf6b65eb304d268c9',
        license_plate: "NY00027",
        battery_level: 90,
        recent_battery_swap_time: new Date(new Date().setHours(new Date().getHours() - 7)).toISOString(),
        in_use: true,
        model: VehicleModel.NIU,
        lat: 40.680245,
        long: -73.996955,
    }

];
