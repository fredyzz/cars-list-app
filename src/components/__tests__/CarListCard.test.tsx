/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CarListCard from "../CarListCard";

describe("CarListCard", () => {
  const car = {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Red",
    engine: "1.8L I4",
    transmission: "Automatic",
    doors: 4,
  };

  test("renders CarListCard", () => {
    const expectedPropsToDisplay = ["make", "model", "year"];
    const expectedPropsNotToDisplay = [
      "color",
      "engine",
      "transmission",
      "doors",
    ];

    render(
      <MemoryRouter>
        <CarListCard car={car} />
      </MemoryRouter>
    );

    expectedPropsToDisplay.forEach((prop) => {
      // @ts-expect-error - disabled for test
      const regex = new RegExp(`${car[prop]}`, "i");
      expect(screen.getByText(regex)).toBeInTheDocument();
    });

    expectedPropsNotToDisplay.forEach((prop) => {
      // @ts-expect-error - disabled for test
      const regex = new RegExp(`${car[prop]}`, "i");
      expect(screen.queryByText(regex)).not.toBeInTheDocument();
    });
  });

  // test("renders delete button", () => {
  //   render(
  //     <MemoryRouter>
  //       <CarListCard car={car} />
  //     </MemoryRouter>
  //   );

  //   expect(
  //     screen.getByLabelText(`Delete car with id ${car.id}`)
  //   ).toBeInTheDocument();
  // });

  // test("renders edit button", () => {
  //   render(
  //     <MemoryRouter>
  //       <CarListCard car={car} />
  //     </MemoryRouter>
  //   );

  //   expect(
  //     screen.getByLabelText(`Edit car with id ${car.id}`)
  //   ).toBeInTheDocument();
  // });
});
