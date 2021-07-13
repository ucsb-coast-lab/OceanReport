import React from "react";
import { render } from "@testing-library/react";
import Report from "../../components/report";
import { reportFixtures } from "../../fixtures/dataFixtures";

describe("Report tests", () => {
  test("renders without crashing when given falling data", async () => {
    const args = reportFixtures.rising;
    const { getByTestId } = render(<Report {...args} />);

    const date = getByTestId("report-date-id");
    expect(typeof date.textContent).toBe("string");
    expect(date.textContent).toEqual("Sunday, May 16 at 10:05 AM");

    const wave = getByTestId("report-wave-id");
    expect(typeof wave.textContent).toBe("string");
    expect(wave.textContent).toEqual("1.7 ft @ 17 secs from 198º");

    const wind = getByTestId("report-wind-id");
    expect(typeof wind.textContent).toBe("string");
    expect(wind.textContent).toEqual("Calm");

    const temp = getByTestId("report-temp-id");
    expect(typeof temp.textContent).toBe("string");
    expect(temp.textContent).toEqual("Water Temp: 32 ºF");

    const tide = getByTestId("report-tide-id");
    expect(typeof tide.textContent).toBe("string");
    expect(tide.textContent).toEqual("Tide: 3.6 ft and rising");

    const hi = getByTestId("report-hi-id");
    expect(typeof hi.textContent).toBe("string");
    expect(hi.textContent).toEqual("HI: 4.8 ft @ 12:34 AM");

    const lo = getByTestId("report-lo-id");
    expect(typeof lo.textContent).toBe("string");
    expect(lo.textContent).toEqual("LO: 0.1 ft @ 8:53 AM");
  });

  test("renders without crashing when given rising data", async () => {
    const args = reportFixtures.falling;
    const { getByTestId } = render(<Report {...args} />);

    const date = getByTestId("report-date-id");
    expect(typeof date.textContent).toBe("string");
    expect(date.textContent).toEqual("Sunday, May 16 at 10:05 AM");

    const wave = getByTestId("report-wave-id");
    expect(typeof wave.textContent).toBe("string");
    expect(wave.textContent).toEqual("1.7 ft @ 17 secs from 198º");

    const wind = getByTestId("report-wind-id");
    expect(typeof wind.textContent).toBe("string");
    expect(wind.textContent).toEqual("Calm");

    const temp = getByTestId("report-temp-id");
    expect(typeof temp.textContent).toBe("string");
    expect(temp.textContent).toEqual("Water Temp: 32 ºF");

    const tide = getByTestId("report-tide-id");
    expect(typeof tide.textContent).toBe("string");
    expect(tide.textContent).toEqual("Tide: 3.7 ft and falling");

    const hi = getByTestId("report-hi-id");
    expect(typeof hi.textContent).toBe("string");
    expect(hi.textContent).toEqual("LO: 2.1 ft @ 2:31 PM");

    const lo = getByTestId("report-lo-id");
    expect(typeof lo.textContent).toBe("string");
    expect(lo.textContent).toEqual("HI: 7.1 ft @ 9:01 PM");
  });
});
