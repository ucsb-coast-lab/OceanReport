import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HomePage from "../../pages/index";
// import { reportFixtures } from "../../fixtures/dataFixtures";

describe("Report tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("renders without crashing when given complete data", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );

    const { getByTestId } = render(<HomePage />);
  });
});
