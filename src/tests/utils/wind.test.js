import { getWindReport, getWindGraph } from "../../utils/wind";
import { windFixtures } from "../../fixtures/dataFixtures";

describe("Wind Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("getWindReport success, North", async () => {
    fetch.mockResponseOnce(JSON.stringify(windFixtures.recordNorth));
    const windReport = await getWindReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(windReport).toEqual("From the north at 3 kts");
  });

  test("getWindReport success, South", async () => {
    fetch.mockResponseOnce(JSON.stringify(windFixtures.recordSouth));
    const windReport = await getWindReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(windReport).toEqual("From the south at 3 kts");
  });

  test("getWindReport success, East", async () => {
    fetch.mockResponseOnce(JSON.stringify(windFixtures.recordEast));
    const windReport = await getWindReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(windReport).toEqual("From the east at 3 kts");
  });

  test("getWindReport success, West", async () => {
    fetch.mockResponseOnce(JSON.stringify(windFixtures.recordWest));
    const windReport = await getWindReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(windReport).toEqual("From the west at 3 kts");
  });

  test("getWindReport success, Calm", async () => {
    fetch.mockResponseOnce(JSON.stringify(windFixtures.record));
    const windReport = await getWindReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(windReport).toEqual("Calm");
  });

  test("getWindReport error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const windReport = await getWindReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(windReport).toEqual(
      "Error retrieving wind data. Please refresh the page or check back later."
    );
  });

  test("getWindGraph success with added first record", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1625772816834));
    fetch.mockResponseOnce(JSON.stringify(windFixtures.record));
    fetch.mockResponseOnce(windFixtures.forecast);
    const windGraph = await getWindGraph();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=forecastNOAA`,
      { method: "GET" }
    );
    expect(windGraph.windRecord).toEqual(
      windFixtures.formattedWindData.windRecord
    );
    expect(windGraph.windForecast).toEqual(
      windFixtures.formattedWindData.windForecast
    );
    expect(windGraph.dateLabels).toEqual(
      windFixtures.formattedWindData.dateLabels
    );
    jest.useRealTimers();
  });

  test("getWindGraph success with out first record", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1625771016834));
    fetch.mockResponseOnce(JSON.stringify(windFixtures.recordNoFirst));
    fetch.mockResponseOnce(windFixtures.forecast);
    const windGraph = await getWindGraph();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=forecastNOAA`,
      { method: "GET" }
    );
    expect(windGraph.windRecord).toEqual(
      windFixtures.formattedWindData.windRecordNoFirst
    );
    expect(windGraph.windForecast).toEqual(
      windFixtures.formattedWindData.windForecastNoFirst
    );
    expect(windGraph.dateLabels).toEqual(
      windFixtures.formattedWindData.dateLabelsNoFirst
    );
    jest.useRealTimers();
  });

  test("getWindGraph error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const windGraph = await getWindGraph();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wind?dataType=forecastNOAA`,
      { method: "GET" }
    );
    expect(windGraph.windRecord).toEqual([]);
    expect(windGraph.windForecast).toEqual([]);
    expect(windGraph.dateLabels).toEqual([]);
  });
});
