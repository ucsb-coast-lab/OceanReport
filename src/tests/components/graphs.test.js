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

    const waveError = getByTestId("waveErrorMessage");
    expect(waveError.textContent).toEqual(
      "Error retrieving wave graph data. Please refresh the page or check back later."
    );
    const periodError = getByTestId("periodErrorMessage");
    expect(periodError.textContent).toEqual(
      "Error retrieving period graph data. Please refresh the page or check back later."
    );
    const windError = getByTestId("periodErrorMessage");
    expect(windError.textContent).toEqual(
      "Error retrieving period graph data. Please refresh the page or check back later."
    );
    const tempError = getByTestId("tempErrorMessage");
    expect(tempError.textContent).toEqual(
      "Error retrieving tempature graph data. Please refresh the page or check back later."
    );
    const tideError = getByTestId("tideErrorMessage");
    expect(tideError.textContent).toEqual(
      "Error retrieving tide graph data. Please refresh the page or check back later."
    );
  });

  test("renders without crashing when given full data", async () => {
    const args = graphFixtures.full;
    const { getByTestId } = render(<Graphs {...args} />);
  });
});
