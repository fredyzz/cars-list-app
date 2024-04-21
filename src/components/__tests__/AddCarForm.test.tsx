/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act, waitFor } from "@testing-library/react";
import AddCarForm from "../AddCarForm";
import { HTTP } from "../../services/http/index";

describe("AddCarForm", () => {
  test("renders form inputs", () => {
    render(
      <MemoryRouter>
        <AddCarForm />
      </MemoryRouter>
    );

    const makeInput = screen.getByLabelText("Make");
    const modelInput = screen.getByLabelText("Model");
    const yearInput = screen.getByLabelText("Year");
    const colorInput = screen.getByLabelText("Color");
    const engineInput = screen.getByLabelText("Engine");
    const transmissionInput = screen.getByLabelText("Transmission");
    const doorsInput = screen.getByLabelText("Doors");
    const addButton = screen.getByRole("button", { name: "Save Car" });

    expect(makeInput).toBeInTheDocument();
    expect(modelInput).toBeInTheDocument();
    expect(yearInput).toBeInTheDocument();
    expect(colorInput).toBeInTheDocument();
    expect(engineInput).toBeInTheDocument;
    expect(transmissionInput).toBeInTheDocument();
    expect(doorsInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("submits form with correct values", async () => {
    const formValues = {
      make: "Toyota",
      model: "Camry",
      year: 2022,
      color: "Red",
      engine: "V6",
      transmission: "Automatic",
      doors: 4,
    };
    const mockNavigate = jest.fn();

    const spySaveCar = jest.spyOn(HTTP, "saveCar");

    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <AddCarForm />
      </MemoryRouter>
    );

    const makeInput = screen.getByLabelText("Make");
    const modelInput = screen.getByLabelText("Model");
    const yearInput = screen.getByLabelText("Year");
    const colorInput = screen.getByLabelText("Color");
    const engineInput = screen.getByLabelText("Engine");
    const transmissionInput = screen.getByLabelText("Transmission");
    const doorsInput = screen.getByLabelText("Doors");
    const addButton = screen.getByRole("button", { name: "Save Car" });

    act(() => {
      fireEvent.change(makeInput, { target: { value: formValues.make } });
      fireEvent.change(modelInput, { target: { value: formValues.model } });
      fireEvent.change(yearInput, { target: { value: formValues.year } });
      fireEvent.change(colorInput, { target: { value: formValues.color } });
      fireEvent.change(engineInput, { target: { value: formValues.engine } });
      fireEvent.change(transmissionInput, {
        target: { value: formValues.transmission },
      });
      fireEvent.change(doorsInput, { target: { value: formValues.doors } });
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(spySaveCar).toHaveBeenCalledWith(formValues);
    });
  });
});
