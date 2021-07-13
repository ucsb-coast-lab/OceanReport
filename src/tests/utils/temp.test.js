import { getTempReport, getTempGraph } from "../../utils/temp";
import { tempFixtures } from "../../fixtures/dataFixtures";

describe("Temp Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("getTempReport, success", async () => {
    fetch.mockResponseOnce(JSON.stringify(tempFixtures.record));
    const tempReport = await getTempReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/temp?dataType=record`,
      { method: "GET" }
    );
    expect(tempReport).toEqual("Water Temp: 69 ºF");
  });

  test("getTempReport, error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const tempReport = await getTempReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/temp?dataType=record`,
      { method: "GET" }
    );
    expect(tempReport).toEqual(
      "Error retrieving Temp data. Please refresh the page or check back later."
    );
  });

  test("getTempGraph, success", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1625679775587));
    fetch.mockResponseOnce(JSON.stringify(tempFixtures.record));
    fetch.mockResponseOnce(JSON.stringify(tempFixtures.forecast));
    const tempGraph = await getTempGraph();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/temp?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/temp?dataType=forecast`,
      { method: "GET" }
    );
    expect(tempGraph.tempRecord).toEqual(
      tempFixtures.formattedTempData.tempRecord
    );
    expect(tempGraph.tempForecast).toEqual(
      tempFixtures.formattedTempData.tempForecast
    );
    expect(tempGraph.dateLabels).toEqual(
      tempFixtures.formattedTempData.dateLabels
    );
    jest.useRealTimers();
  });

  test("getTempGraph, error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const tempGraph = await getTempGraph();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/temp?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/temp?dataType=forecast`,
      { method: "GET" }
    );
    expect(tempGraph.tempRecord).toEqual([]);
    expect(tempGraph.tempForecast).toEqual([]);
    expect(tempGraph.dateLabels).toEqual([]);
  });
});
