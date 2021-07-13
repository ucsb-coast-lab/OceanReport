import { getRiseSet, setShadingPoints } from "../../utils/sunRiseSet";
import { sunFixtures, graphFixtures } from "../../fixtures/dataFixtures";

describe("Sun Rise Set Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("getRiseSet returns full array on success", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2021, 0, 4));
    fetch.mockResponse(JSON.stringify(sunFixtures.rawRequestData1));
    const times = await getRiseSet();

    expect(fetch).toHaveBeenCalledTimes(5);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/sunRiseSet?date=2 days ago`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/sunRiseSet?date=yesterday`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/sunRiseSet?date=today`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/sunRiseSet?date=tomorrow`,
      { method: "GET" }
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/sunRiseSet?date=2day`,
      { method: "GET" }
    );
    expect(times).toEqual([
      1609508911000, 1609557337000, 1609595311000, 1609643737000, 1609681711000,
      1609730137000, 1609768111000, 1609816537000, 1609854511000, 1609902937000,
    ]);
    jest.useRealTimers();
  });

  test("getRiseSet returns empty array on error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const times = await getRiseSet();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/sunRiseSet?date=2 days ago`,
      { method: "GET" }
    );
    expect(times).toEqual([]);
  });

  test("setShadingPoints returns correct shade points, with first sunrise", async () => {
    const shadePoints = await setShadingPoints(
      [
        1621116331001, 1621132530999, 1621168530999, 1621218599999,
        1621254599999, 1621304999999, 1621340999999,
      ],
      graphFixtures.full.windData,
      graphFixtures.full.windData2
    );
    expect(shadePoints).toEqual([0, 1, 9, 29, 57, 77, 105, 125, 2000, 2000]);
  });

  test("setShadingPoints returns correct shade points, w/o first sunrise", async () => {
    const shadePoints = await setShadingPoints(
      [
        1621116331000, 1621132530999, 1621168530999, 1621218599999,
        1621254599999, 1621304999999, 1621340999999,
      ],
      graphFixtures.full.windData,
      graphFixtures.full.windData2
    );
    expect(shadePoints).toEqual([
      9, 29, 57, 77, 105, 125, 2000, 2000, 2000, 2000,
    ]);
  });
});
