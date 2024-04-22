/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import FilterBarMakeField from "../FilterBarMakeField";

describe("FilterBarMakeField", () => {
  const filterValues = ["Ford", "Toyota", "Honda"];
  const filterOptions = ["Select a make", ...filterValues];
  const onChange = jest.fn();

  it("renders the filter bar make fields correctly plus the default option", () => {
    const { getByLabelText } = render(
      <FilterBarMakeField
        filterValues={filterValues}
        onChange={onChange}
        value=""
      />
    );

    const selectElement = getByLabelText("make");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("");

    const optionElements = selectElement.querySelectorAll("option");
    expect(optionElements.length).toBe(filterOptions.length);

    optionElements.forEach((option) => {
      expect(filterOptions).toContain(option.innerHTML);
    });
  });

  it("calls the onChange function when the value is changed", () => {
    const { getByLabelText } = render(
      <FilterBarMakeField
        filterValues={filterValues}
        onChange={onChange}
        value=""
      />
    );

    const selectElement = getByLabelText("make selection");
    fireEvent.change(selectElement, { target: { value: "Ford" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
