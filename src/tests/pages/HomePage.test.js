import React from "react";
import { render, act, getByTestId } from "@testing-library/react";
import HomePage from "../../pages/index";
import {
  waveFixtures,
  windFixtures,
  tempFixtures,
  tideFixtures,
} from "../../fixtures/dataFixtures";
import { reportFixtures } from "../../fixtures/dataFixtures";
import getDate from "../../utils/date.js";
import * as wave from "../../utils/wave.js";
import * as wind from "../../utils/wind.js";
import * as temp from "../../utils/temp.js";
import * as tide from "../../utils/tide.js";
import * as sunRiseSet from "../../utils/sunRiseSet.js";

jest.mock("../../utils/date.js");
jest.mock("../../utils/wave.js");
jest.mock("../../utils/wind.js");
jest.mock("../../utils/temp.js");
jest.mock("../../utils/tide.js");
jest.mock("../../utils/sunRiseSet.js");
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

describe("HomePage tests", () => {
  test("renders without crashing when given complete data", async () => {
    sunRiseSet.getRiseSet.mockImplementation(() => [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    sunRiseSet.setShadingPoints.mockImplementation(() => [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    getDate.mockImplementation(() => {
      return reportFixtures.rising.date;
    });
    wave.getWaveGraphs.mockImplementation(() => {
      return waveFixtures.formattedWaveData;
    });
    wave.getWaveReport.mockImplementation(() => {
      return reportFixtures.rising.wave;
    });
    wind.getWindGraph.mockImplementation(() => {
      return windFixtures.formattedWindData;
    });
    wind.getWindReport.mockImplementation(() => {
      return reportFixtures.rising.wind;
    });
    temp.getTempGraph.mockImplementation(() => {
      return tempFixtures.formattedTempData;
    });
    temp.getTempReport.mockImplementation(() => {
      return reportFixtures.rising.temp;
    });
    tide.getTideGraph.mockImplementation(() => {
      return tideFixtures.formattedTideData;
    });
    tide.getTideReport.mockImplementation(() => {
      return reportFixtures.rising;
    });
    await act(async () => render(<HomePage />));
  });
});
