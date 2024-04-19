import React, { createContext, useEffect, useReducer } from "react";

import { getCars } from "../../services/http/getCars";

import { Car } from "../../interfaces/car";
import { CarList } from "../../interfaces/carList";
import { Action } from "./reducer";
import { reducer } from "./reducer";
import { ACTIONS } from "./reducer";
import { UNKNOWN_ERROR_MESSAGE } from "../../services/http/settings";

export type State = {
  cars: CarList | null;
  error: string | null;
  loading: boolean;
  selectedCar: Car | null;
};

export interface ContextState {
  state: {
    cars: CarList | null;
    error: string | null;
    loading: boolean;
    selectedCar: Car | null;
  };
  dispatch: React.Dispatch<Action>;
}

export const CarsContext = createContext({} as ContextState);

export const CarsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: State = {
    cars: null,
    error: null,
    loading: true,
    selectedCar: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const loadCars = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const cars = await getCars();

      if (cars) {
        dispatch({ type: ACTIONS.SET_CARS, payload: cars });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      } else {
        dispatch({ type: ACTIONS.SET_ERROR, payload: UNKNOWN_ERROR_MESSAGE });
      }
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <CarsContext.Provider value={{ state, dispatch }}>
      {children}
    </CarsContext.Provider>
  );
};
