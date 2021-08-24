import { getWaveReport, getWaveGraphs } from "../../utils/wave";
import { waveFixtures } from "../../fixtures/dataFixtures";

describe("Wave Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("getWaveReport success", async () => {
    fetch.mockResponseOnce(JSON.stringify(waveFixtures.record));
    const waveReport = await getWaveReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(waveReport).toEqual("2.2 ft @ 17 secs from 198º");
  });

  test("getWaveReport error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const waveReport = await getWaveReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(waveReport).toEqual(
      "Error retrieving wave data. Please refresh the page or check back later."
    );
  });

  test("getWaveGraph success", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1625772516834));
    fetch.mockResponseOnce(JSON.stringify(waveFixtures.record));
    fetch.mockResponseOnce(waveFixtures.forecastCDIP);
    fetch.mockResponseOnce(waveFixtures.forecastNOAA);
    const waveGraph = await getWaveGraphs();

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=forecastCDIP`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=forecastNOAA`,
      { method: "GET" }
    );
    expect(waveGraph.waveRecord).toEqual(
      waveFixtures.formattedWaveData.waveRecord
    );
    expect(waveGraph.periodRecord).toEqual(
      waveFixtures.formattedWaveData.periodRecord
    );
    expect(waveGraph.waveForecastCDIP).toEqual(
      waveFixtures.formattedWaveData.waveForecastCDIP
    );
    expect(waveGraph.periodForecast).toEqual(
      waveFixtures.formattedWaveData.periodForecast
    );
    expect(waveGraph.waveForecastNOAA).toEqual(
      waveFixtures.formattedWaveData.waveForecastNOAA
    );
    expect(waveGraph.dateLabels).toEqual(
      waveFixtures.formattedWaveData.dateLabels
    );
    jest.useRealTimers();
  });

  test("getWaveGraph success, firstRecord false", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1627083000000));
    fetch.mockResponseOnce(JSON.stringify(waveFixtures.recordFirstFalse));
    fetch.mockResponseOnce(waveFixtures.forecastCDIP);
    fetch.mockResponseOnce(waveFixtures.forecastNOAA);
    const waveGraph = await getWaveGraphs();

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=forecastCDIP`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=forecastNOAA`,
      { method: "GET" }
    );
    expect(waveGraph.waveRecord).toEqual(
      waveFixtures.formattedWaveData2.waveRecord
    );
    expect(waveGraph.periodRecord).toEqual(
      waveFixtures.formattedWaveData2.periodRecord
    );
    expect(waveGraph.waveForecastCDIP).toEqual(
      waveFixtures.formattedWaveData2.waveForecastCDIP
    );
    expect(waveGraph.periodForecast).toEqual(
      waveFixtures.formattedWaveData2.periodForecast
    );
    expect(waveGraph.waveForecastNOAA).toEqual(
      waveFixtures.formattedWaveData2.waveForecastNOAA
    );
    expect(waveGraph.dateLabels).toEqual(
      waveFixtures.formattedWaveData2.dateLabels
    );
    jest.useRealTimers();
  });

  test("getWaveGraph error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const waveGraph = await getWaveGraphs();

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=forecastCDIP`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=forecastNOAA`,
      { method: "GET" }
    );
    expect(waveGraph.waveRecord).toEqual([]);
    expect(waveGraph.periodRecord).toEqual([]);
    expect(waveGraph.waveForecastCDIP).toEqual([]);
    expect(waveGraph.periodForecast).toEqual([]);
    expect(waveGraph.waveForecastNOAA).toEqual([]);
    expect(waveGraph.dateLabels).toEqual([]);
  });
});
