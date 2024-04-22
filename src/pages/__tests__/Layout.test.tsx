/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useCarsContext } from "../../contexts/CarsContext/useCarsContext";
import Layout from "../Layout";

jest.mock("../../contexts/CarsContext/useCarsContext", () => ({
  useCarsContext: jest.fn(() => ({
    state: {
      loading: false,
      error: null,
    },
  })),
}));

describe("Layout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Router>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Router>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  test("renders loading state if state loading is true in context", () => {
    // Override the mock for this test
    (useCarsContext as jest.Mock).mockImplementation(() => ({
      state: {
        loading: true,
        error: null,
      },
    }));

    const { getByText } = render(
      <Router>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Router>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state if state error is true in context", () => {
    // Override the mock for this test
    (useCarsContext as jest.Mock).mockImplementation(() => ({
      state: {
        loading: false,
        error: "Error message",
      },
    }));

    const { getByText } = render(
      <Router>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Router>
    );

    expect(getByText("Error: Error message")).toBeInTheDocument();
  });
});
