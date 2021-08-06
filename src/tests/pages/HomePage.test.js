import React from "react";
import { render, act, fireEvent, getByTestId } from "@testing-library/react";
import HomePage from "../../pages/index";
// import { reportFixtures } from "../../fixtures/dataFixtures";
jest.mock("../../utils/sunRiseSet.js");
// jest.mock('../utils/sunRiseSet.js', () => {
//   return {
//     getRiseSet: jest.fn(),
//   };
// });

describe("Report tests", () => {
  test("renders without crashing when given complete data", async () => {
    getRiseSet.mockImplementation(() => [0, 1, 2, 3, 4]);
    // (getRiseSet as jest.MockedFunction<typeof getRiseSet>).mockResolvedValueOnce([0, 1, 2, 3, 4]);
    const { getByTestId } = render(<HomePage />);
    // act(() => {
    //   const { getByTestId } = render(<HomePage />);
    // });
  });
});
