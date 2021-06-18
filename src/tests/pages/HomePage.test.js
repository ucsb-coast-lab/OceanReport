import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HomePage from "../../pages/index";
// import { reportFixtures } from "../../fixtures/dataFixtures";

describe("Report tests", () => {
  test("renders without crashing when given complete data", () => {
    const { getByTestId } = render(<HomePage />);
  });
});
