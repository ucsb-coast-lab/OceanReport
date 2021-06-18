import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Graphs from "../../components/graphs";
import { graphFixtures } from "../../fixtures/dataFixtures";
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

describe("Graph tests", () => {
  test("renders without crashing when given empty data", async () => {
    const args = graphFixtures.empty;
    const { getByTestId } = render(<Graphs {...args} />);
  });

  test("renders without crashing when given full data", async () => {
    const args = graphFixtures.full;
    const { getByTestId } = render(<Graphs {...args} />);
  });
});
