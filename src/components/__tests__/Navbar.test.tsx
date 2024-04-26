/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

import { routesConfig } from "../../routes";

describe("Navbar", () => {
  test("renders logo correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByRole("link", { name: "App logo" });
    expect(logo).toBeInTheDocument();
  });

  test("renders the main aria attributes correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation", { name: "Main Navigation" });
    expect(nav).toBeInTheDocument();
  });

  test("renders navigation links correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    routesConfig.forEach((route) => {
      if (route.path === "*" || route.notVisible) return;

      const link = screen.getByRole("menuitem", { name: route.label });
      expect(link).toBeInTheDocument();
    });
  });

  test("should not render default route", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const defaultRoute = screen.queryByRole("menuitem", { name: "Default" });
    expect(defaultRoute).not.toBeInTheDocument();
  });
});
