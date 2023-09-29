import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";

// *** The following test does not work currently ***
test("Mounted #react-p5 div", () => {
  const app = render(<App />);
  const p5Div = screen.getByTestId("react-p5");
  expect(p5Div).not.toBeNull();
});
