import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../App";

test("App renders without crashing", () => {
  render(<App />);
  expect(screen.getByText("HOME")).toBeInTheDocument();
  expect(screen.getByText("GitHub")).toBeInTheDocument();
});
