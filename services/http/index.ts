import { CarList } from "../../interfaces/carList";
import { getCars } from "./getCars";

interface HTTP {
  getCars: () => CarList;
}

export const HTTP = {
  getCars,
};
