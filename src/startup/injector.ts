import DIContainer, { IDIContainer } from "rsdi";
import { register as vehicleRegister } from '../services/Vehicle/injector';
import { register as shiftRegister } from '../services/Shift/injector';

export default function configure(): IDIContainer {
  const injector: DIContainer = new DIContainer();

  // Add dependencies to injector by microservice
  vehicleRegister(injector);
  shiftRegister(injector);

  return injector as IDIContainer;
}