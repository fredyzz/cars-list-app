/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import CarListEmpty from "../CarListEmpty";

describe("CarListEmpty", () => {
  test("renders CarsListEmpty with the correct figCaptionText", () => {
    render(<CarListEmpty />);
    expect(
      screen.getByText(CarListEmpty.settings.figCaptionText)
    ).toBeInTheDocument();
  });

  test("renders CarsListEmpty with image", () => {
    render(<CarListEmpty />);
    expect(
      screen.getByAltText(CarListEmpty.settings.imageAlt)
    ).toBeInTheDocument();
  });

  test("renders CarsListEmpty with hidden text", () => {
    render(<CarListEmpty />);
    expect(
      screen.getByText(CarListEmpty.settings.visuallyHiddenText)
    ).toBeInTheDocument();
  });
});
