import DIContainer, { object, use, factory } from "rsdi";
import * as types from '../../startup/types';
import { VehicleCtrl } from "./VehicleCtrl";
import { VehicleService } from "./VehicleService";
import { VehicleRepo } from "./VehicleRepo";
import { vehicleFactory } from "./Vehicle";
import { NamedResolvers } from "rsdi/dist/types"

export const register = (injector: DIContainer) => {
  const resolvers: NamedResolvers = {
    [types.Vehicle]: factory(vehicleFactory),
    [types.VehicleRepo]: object(VehicleRepo).construct(
      use(types.Vehicle),
    ),
    [types.VehicleService]: object(VehicleService).construct(
      use(types.VehicleRepo),
    ),
    [types.VehicleCtrl]: object(VehicleCtrl).construct(
      use(types.VehicleService),
    ),
  };

  injector.add(resolvers);
}