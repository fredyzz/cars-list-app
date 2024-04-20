/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import CarsListEmpty from "../CarsListEmpty";

describe("CarsListEmpty", () => {
  test("renders CarsListEmpty with the correct figCaptionText", () => {
    render(<CarsListEmpty />);
    expect(
      screen.getByText(CarsListEmpty.settings.figCaptionText)
    ).toBeInTheDocument();
  });

  test("renders CarsListEmpty with image", () => {
    render(<CarsListEmpty />);
    expect(
      screen.getByAltText(CarsListEmpty.settings.imageAlt)
    ).toBeInTheDocument();
  });

  test("renders CarsListEmpty with hidden text", () => {
    render(<CarsListEmpty />);
    expect(
      screen.getByText(CarsListEmpty.settings.visuallyHiddenText)
    ).toBeInTheDocument();
  });
});
