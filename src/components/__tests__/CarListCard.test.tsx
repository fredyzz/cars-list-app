/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import CarListCard from "../CarListCard";

test("renders CarListCard", () => {
  const expectedPropsToDisplay = ["make", "model", "year"];
  const expectedPropsNotToDisplay = [
    "color",
    "engine",
    "transmission",
    "doors",
  ];

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
  render(<CarListCard car={car} />);

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