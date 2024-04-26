/**
 * @jest-environment jsdom
 */

import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CarsContextProvider } from "../../contexts/CarsContext";

import CarList from "../CarList";
import CarListEmpty from "../CarListEmpty";

import {
  INITIAL_STATE_WITH_FILTERED_CARS,
  INITIAL_STATE_WITH_INITIAL_CARS,
} from "./mocks/ContextInitialStates";

describe("CarsList", () => {
  test("should render a car list using filtered cars", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CarsContextProvider initialState={INITIAL_STATE_WITH_FILTERED_CARS}>
            <CarList />
          </CarsContextProvider>
        </MemoryRouter>
      );
    });

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByText("TestFilterd")).toHaveLength(2);
  });

  test("should render a car list using cars stored when page loads", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CarsContextProvider initialState={INITIAL_STATE_WITH_INITIAL_CARS}>
            <CarList />
          </CarsContextProvider>
        </MemoryRouter>
      );
    });

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByText("TestInitialCards")).toHaveLength(1);
  });

  test(`should show "${CarListEmpty.settings.figCaptionText}" when a user filter cars but there is no result`, async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CarsContextProvider
            initialState={{
              ...INITIAL_STATE_WITH_INITIAL_CARS,
              filteredCars: [],
            }}
          >
            <CarList />
          </CarsContextProvider>
        </MemoryRouter>
      );
    });

    expect(
      screen.getByText(CarListEmpty.settings.figCaptionText)
    ).toBeInTheDocument();
  });
});
