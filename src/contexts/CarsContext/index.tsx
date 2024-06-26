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
  filteredCars: CarList | null;
  loading: boolean;
  selectedCar: Car | undefined;
};

export interface ContextState {
  actions: typeof ACTIONS;
  dispatch: React.Dispatch<Action>;
  state: {
    cars: CarList | null;
    filteredCars: CarList | null;
    error: string | null;
    loading: boolean;
    selectedCar: Car | undefined;
  };
}

export const CarsContext = createContext({} as ContextState);

export const CarsContextProvider = ({
  initialState,
  children,
}: {
  initialState?: State;
  children: React.ReactNode;
}) => {
  const initialEmptyState: State = {
    cars: null,
    error: null,
    filteredCars: null,
    loading: true,
    selectedCar: undefined,
  };

  const [state, dispatch] = useReducer(
    reducer,
    initialState || initialEmptyState
  );

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
    <CarsContext.Provider value={{ state, dispatch, actions: ACTIONS }}>
      {children}
    </CarsContext.Provider>
  );
};
