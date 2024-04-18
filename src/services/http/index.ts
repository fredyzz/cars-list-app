import { CarList } from "../../interfaces/carList";
import { deleteCar } from "./deleteCar";
import { getCars } from "./getCars";

interface HTTP {
  deleteCar: (id: string) => string;
  getCars: () => CarList;
}

export const HTTP = {
  deleteCar,
  getCars,
};
