import DIContainer, { object, use, factory } from "rsdi";
import * as types from '../../startup/types';
import { ShiftCtrl } from "./ShiftCtrl";
import { ShiftService } from "./ShiftService";
import { ShiftRepo } from "./ShiftRepo";
import { shiftFactory } from "./Shift";
import { NamedResolvers } from "rsdi/dist/types"

export const register = (injector: DIContainer) => {
  const resolvers: NamedResolvers = {
    [types.Shift]: factory(shiftFactory),
    [types.ShiftRepo]: object(ShiftRepo).construct(
      use(types.Shift),
    ),
    [types.ShiftService]: object(ShiftService).construct(
      use(types.ShiftRepo),
    ),
    [types.ShiftCtrl]: object(ShiftCtrl).construct(
      use(types.ShiftService),
    ),
  };

  injector.add(resolvers);
}