import { CarList } from "../../interfaces/carList";
import { Car } from "../../interfaces/car";

import { deleteCar } from "./deleteCar";
import { getCars } from "./getCars";
import { saveCar } from "./saveCar";

interface HTTP {
  deleteCar: (id: string) => void;
  getCars: () => Promise<CarList | undefined>;
  saveCar: (car: Car) => Promise<Car | undefined>;
}

export const HTTP = {
  deleteCar,
  getCars,
  saveCar,
};
