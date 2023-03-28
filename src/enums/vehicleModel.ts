export enum VehicleModel {
  NIU,
}

export const en = {
  NIU: {
    ordinal: 0,
    display: 'Niu'
  },
};

export const enumArray = Object.values(en).map((val) => val.ordinal);
