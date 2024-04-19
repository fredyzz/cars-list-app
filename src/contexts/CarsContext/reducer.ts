import { Car } from "../../interfaces/car";
import { CarList } from "../../interfaces/carList";

import { State } from "./index";

export type Action =
  | { type: "SET_CARS"; payload: CarList }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SELECTED_CAR"; payload: Car };

export enum ACTIONS {
  SET_CARS = "SET_CARS",
  SET_ERROR = "SET_ERROR",
  SET_LOADING = "SET_LOADING",
  SET_SELECTED_CAR = "SET_SELECTED_CAR",
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SET_CARS:
      return { ...state, cars: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_SELECTED_CAR:
      return { ...state, selectedCar: action.payload };
    default:
      return state;
  }
};
