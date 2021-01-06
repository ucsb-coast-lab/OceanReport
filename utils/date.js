import { timeConv } from "../utils/format.js";

export default async function getDate() {
  let dateResponse = await fetch(`/api/spotBuoy?dataType=record`, {
    method: "GET",
  }); //uses wave backend because it wants the last recorded data
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
  const m = new Date().getMonth();
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
  currDate +=
    weekday +
    ", " +
    month +
    " " +
    day +
    " at " +
    timeConv(time12.toString().substring(16, 21));

  return currDate; //Assembled date for report as last time the buoy recorded data
}
