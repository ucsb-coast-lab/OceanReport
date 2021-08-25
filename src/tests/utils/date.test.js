import getDate from "../../utils/date";
var MockDate = require("mockdate");

describe("Date Util tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
    // jest.useFakeTimers("modern");
  });

  afterAll(async () => {
    MockDate.reset();
    // jest.useRealTimers();
  });

  test("getDate returns successfully, January, Monday", async () => {
    MockDate.set(new Date(2021, 0, 4).getTime());
    // jest.setSystemTime(new Date(2021, 0, 4));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Monday, January 4 at 11:13 AM");
  });

  test("getDate returns successfully, February, Tuesday", async () => {
    MockDate.set(new Date(2021, 1, 2).getTime());
    // jest.setSystemTime(new Date(2021, 1, 2));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Tuesday, February 2 at 11:13 AM");
  });

  test("getDate returns successfully, March, Wednesday", async () => {
    MockDate.set(new Date(2021, 2, 24).getTime());
    // jest.setSystemTime(new Date(2021, 2, 24));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Wednesday, March 24 at 11:13 AM");
  });

  test("getDate returns successfully, April, Thursday", async () => {
    MockDate.set(new Date(2021, 3, 22).getTime());
    // jest.setSystemTime(new Date(2021, 3, 22));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Thursday, April 22 at 11:13 AM");
  });

  test("getDate returns successfully, May, Friday", async () => {
    MockDate.set(new Date(2021, 4, 21).getTime());
    // jest.setSystemTime(new Date(2021, 4, 21));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Friday, May 21 at 11:13 AM");
  });

  test("getDate returns successfully, June, Saturday", async () => {
    MockDate.set(new Date(2021, 5, 26).getTime());
    // jest.setSystemTime(new Date(2021, 5, 26));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Saturday, June 26 at 11:13 AM");
  });

  test("getDate returns successfully, July, Sunday", async () => {
    MockDate.set(new Date(2021, 6, 25).getTime());
    // jest.setSystemTime(new Date(2021, 6, 25));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Sunday, July 25 at 11:13 AM");
  });

  test("getDate returns successfully, August, Sunday", async () => {
    MockDate.set(new Date(2021, 7, 22).getTime());
    // jest.setSystemTime(new Date(2021, 7, 22));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Sunday, August 22 at 11:13 AM");
  });

  test("getDate returns successfully, September, Sunday", async () => {
    MockDate.set(new Date(2021, 8, 26).getTime());
    // jest.setSystemTime(new Date(2021, 8, 26));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Sunday, September 26 at 11:13 AM");
  });

  test("getDate returns successfully, October, Sunday", async () => {
    MockDate.set(new Date(2021, 9, 24).getTime());
    // jest.setSystemTime(new Date(2021, 9, 24));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Sunday, October 24 at 11:13 AM");
  });

  test("getDate returns successfully, November, Sunday", async () => {
    MockDate.set(new Date(2021, 10, 21).getTime());
    // jest.setSystemTime(new Date(2021, 10, 21));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Sunday, November 21 at 11:13 AM");
  });

  test("getDate returns successfully, December, Sunday", async () => {
    MockDate.set(new Date(2021, 11, 26).getTime());
    // jest.setSystemTime(new Date(2021, 11, 26));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual("Sunday, December 26 at 11:13 AM");
  });

  test("getDate returns error message on error", async () => {
    fetch.mockReject(new Error("fake error message"));
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(date).toEqual(
      "Error retrieving date data. Please refresh the page or check back later."
    );
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
  });

  test("getDate returns error when date is undefined", async () => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(undefined));
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          waves: [{ timestamp: 1624401356 }],
        },
      })
    );
    const date = await getDate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      { method: "GET" }
    );
    expect(date).toEqual(
      "Error retrieving date data. Please refresh the page or check back later."
    );
    jest.useRealTimers();
  });
});
