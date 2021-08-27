import { getTideReport, getTideGraph } from "../../utils/tide";
import { tideFixtures } from "../../fixtures/dataFixtures";

describe("Tide Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("getTideReport, rising hi lo", async () => {
    jest.setSystemTime(new Date(1624909035205));
    expect(new Date().valueOf()).toBe(1624909035205);
    fetch.mockResponseOnce(JSON.stringify(tideFixtures.hilo));
    fetch.mockResponseOnce(JSON.stringify(tideFixtures.currentTide));
    const tideReport = await getTideReport();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL +
        `/api/tide?reqNum=2&begin_date=` +
        "20210626" +
        `&end_date=` +
        "20210629",
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/tide?reqNum=1`,
      { method: "GET" }
    );
    expect(tideReport.tide).toEqual("Tide: 3 ft and rising");
    expect(tideReport.rising).toEqual(true);
    expect(tideReport.hi).toEqual("HI: 4.1 ft @ 9:29 PM");
    expect(tideReport.lo).toEqual("LO: 2.7 ft @ 2:09 AM");
  });

  test("getTideReport, falling lo hi", async () => {
    jest.setSystemTime(new Date(1624909035205 + 10800000));
    fetch.mockResponseOnce(JSON.stringify(tideFixtures.hilo));
    fetch.mockResponseOnce(JSON.stringify(tideFixtures.currentTide));
    const tideReport = await getTideReport();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL +
        `/api/tide?reqNum=2&begin_date=` +
        "20210626" +
        `&end_date=` +
        "20210629",
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/tide?reqNum=1`,
      { method: "GET" }
    );
    expect(tideReport.tide).toEqual("Tide: 3 ft and falling");
    expect(tideReport.rising).toEqual(false);
    expect(tideReport.hi).toEqual("LO: 2.7 ft @ 2:09 AM");
    expect(tideReport.lo).toEqual("HI: 5.3 ft @ 8:04 AM");
  });

  test("getTideReport error", async () => {
    jest.setSystemTime(new Date(1624909035205));
    fetch.mockReject(new Error("fake error message"));
    const tideReport = await getTideReport();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL +
        `/api/tide?reqNum=2&begin_date=` +
        "20210626" +
        `&end_date=` +
        "20210629",
      { method: "GET" }
    );
    expect(tideReport.tide).toEqual(
      "Error retrieving tide data. Please refresh the page or check back later."
    );
    expect(tideReport.rising).toEqual(true);
    expect(tideReport.hi).toEqual("HI: ");
    expect(tideReport.lo).toEqual("LO: ");
  });

  test("getTideGraph success", async () => {
    jest.setSystemTime(new Date(1624994113750));
    fetch.mockResponseOnce(JSON.stringify(tideFixtures.hilo0629));
    fetch.mockResponseOnce(JSON.stringify(tideFixtures.completeTideData));
    const tideGraph = await getTideGraph();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL +
        `/api/tide?reqNum=2&begin_date=` +
        "20210627" +
        `&end_date=` +
        "20210630",
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL +
        `/api/tide?reqNum=3&begin_date=` +
        "20210627" +
        `&end_date=` +
        "20210701",
      { method: "GET" }
    );
    expect(tideGraph).toEqual(tideFixtures.formattedTideData);
  });

  test("getTideGraph error", async () => {
    jest.setSystemTime(new Date(1624909035205));
    fetch.mockReject(new Error("fake error message"));
    const tideGraph = await getTideGraph();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL +
        `/api/tide?reqNum=2&begin_date=` +
        "20210626" +
        `&end_date=` +
        "20210629",
      { method: "GET" }
    );
    expect(tideGraph.tideRecord).toEqual([]);
    expect(tideGraph.tideForecast).toEqual([]);
    expect(tideGraph.dateLabels).toEqual([]);
  });
});
