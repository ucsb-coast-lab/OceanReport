import { round, timeConv, formatRiseSet, formatDate } from "../../utils/format";
import { expect } from "@jest/globals";
import { sunFixtures } from "../../fixtures/dataFixtures";

describe("Format Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("round works correctly with string exponent", () => {
    const rounded = round("5.45e-3", 4);
    expect(rounded).toEqual(0.0055);
  });

  test("round works correctly with double", () => {
    const rounded = round(12.555, 1);
    expect(rounded).toEqual(12.6);
  });

  test("timeConv works correctly with AM ", () => {
    const converted = timeConv("03:45");
    expect(converted).toEqual("3:45 AM");
  });

  test("timeConv works correctly with PM ", () => {
    const converted = timeConv("15:45");
    expect(converted).toEqual("3:45 PM");
  });

  test("timeConv works correctly with midnight", () => {
    const converted = timeConv("00:00");
    expect(converted).toEqual("12:00 AM");
  });

  test("timeConv works correctly with noon", () => {
    const converted = timeConv("12:00");
    expect(converted).toEqual("12:00 PM");
  });

  test("formatRiseSet works correctly with sunrise before 1PM", () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2021, 1, 1));
    var sunTimes = [];
    formatRiseSet(sunFixtures.rawRequestData1, sunTimes, 0);
    expect(sunTimes).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      1612100911000,
      1612149337000,
    ]);
    jest.useRealTimers();
  });

  test("formatRiseSet works correctly with 0 offset", () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2021, 1, 1));
    var sunTimes = [];
    formatRiseSet(sunFixtures.rawRequestData2, sunTimes, 0);
    expect(sunTimes).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      1612097311000,
      1612138537000,
    ]);
    jest.useRealTimers();
  });

  test("formatDate works correctly for 1 day offset", () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2021, 1, 1));
    const formatted = formatDate(1);
    expect(formatted.day).toEqual("02");
    expect(formatted.month).toEqual("02");
    expect(formatted.year).toEqual("2021");
    jest.useRealTimers();
  });
});
