import { Car } from "../../interfaces/car";
import { CarList } from "../../interfaces/carList";

import { State } from "./index";

export enum ACTIONS {
  ADD_CAR = "ADD_CAR",
  DELETE_CAR = "DELETE_CAR",
  EDIT_CAR = "EDIT_CAR",
  FILTER_CARS = "FILTER_CARS",
  RESET_FILTER = "RESET_FILTER",
  RESET_SELECTED_CAR = "RESET_SELECTED_CAR",
  SET_CARS = "SET_CARS",
  SET_ERROR = "SET_ERROR",
  SET_LOADING = "SET_LOADING",
  SET_SELECTED_CAR_BY_ID = "SET_SELECTED_CAR_BY_ID",
}

export type Action =
  | { type: ACTIONS.ADD_CAR; payload: Car }
  | { type: ACTIONS.EDIT_CAR; payload: Car }
  | { type: ACTIONS.DELETE_CAR; payload: string }
  | { type: ACTIONS.SET_CARS; payload: CarList }
  | { type: ACTIONS.FILTER_CARS; payload: (car: Car) => boolean }
  | { type: ACTIONS.RESET_FILTER }
  | { type: ACTIONS.RESET_SELECTED_CAR }
  | { type: ACTIONS.SET_ERROR; payload: string }
  | { type: ACTIONS.SET_LOADING; payload: boolean }
  | { type: ACTIONS.SET_SELECTED_CAR_BY_ID; payload: string };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.ADD_CAR:
      return {
        ...state,
        cars: [...(state.cars || []), action.payload],
      };
    case ACTIONS.EDIT_CAR:
      return {
        ...state,
        cars:
          state.cars?.map((car) =>
            car.id === action.payload.id ? action.payload : car
          ) || [],
      };
    case ACTIONS.DELETE_CAR:
      return {
        ...state,
        cars: state.cars?.filter((car) => car.id !== action.payload) || [],
      };
    case ACTIONS.SET_CARS:
      return { ...state, cars: action.payload };
    case ACTIONS.FILTER_CARS:
      return {
        ...state,
        filteredCars: state.cars?.filter(action.payload) || [],
      };
    case ACTIONS.RESET_FILTER:
      return { ...state, filteredCars: null };
    case ACTIONS.RESET_SELECTED_CAR:
      return { ...state, selectedCar: undefined };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_SELECTED_CAR_BY_ID:
      return {
        ...state,
        selectedCar:
          state.cars?.find((car) => car.id === action.payload) || undefined,
      };
    default:
      return state;
  }
};
