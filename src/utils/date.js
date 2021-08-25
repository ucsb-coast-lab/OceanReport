import { timeConv } from "../utils/format.js";

export default async function getDate() {
  try {
    //uses wave backend because it wants the last recorded data
    const dateResponse = await fetch(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      {
        method: "GET",
      }
    );
    const dateData = await dateResponse.json(); //data contains time of last recorded data
    let currDate = "";
    const current = new Date();
    const dayOfWeek = current.getDay();
    let weekday = isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
    const m = current.getMonth();
    let month = isNaN(m)
      ? null
      : [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ][m];
    let day = current.getDate();
    let time12 = new Date(
      dateData.data.waves[dateData.data.waves.length - 1].timestamp
    );
    console.log(time12.toString());
    if (weekday === null || month === null) {
      return "Error retrieving date data. Please refresh the page or check back later.";
    }
    currDate +=
      weekday +
      ", " +
      month +
      " " +
      day +
      " at " +
      timeConv(time12.toString().substring(16, 21));

    return currDate; //Assembled date for report as last time the buoy recorded data
  } catch (e) {
    return "Error retrieving date data. Please refresh the page or check back later.";
  }
}
