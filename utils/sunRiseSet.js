import { formatRiseSet } from "../utils/format.js";

export async function getRiseSet() {
  var sunTimes = [];

  const response2DaysAgo = await fetch(`/api/sunRiseSet?date=2 days ago`, {
    method: "GET",
  });
  const data2DaysAgo = await response2DaysAgo.json();
  formatRiseSet(data2DaysAgo, sunTimes, -2);

  const responseYesterday = await fetch(`/api/sunRiseSet?date=yesterday`, {
    method: "GET",
  });
  const dataYesterday = await responseYesterday.json();
  formatRiseSet(dataYesterday, sunTimes, -1);

  const responseToday = await fetch(`/api/sunRiseSet?date=today`, {
    method: "GET",
  });
  const dataToday = await responseToday.json();
  formatRiseSet(dataToday, sunTimes, 0);

  const responseTomorrow = await fetch(`/api/sunRiseSet?date=tomorrow`, {
    method: "GET",
  });
  const dataTomorrow = await responseTomorrow.json();
  formatRiseSet(dataTomorrow, sunTimes, 1);

  const response2Day = await fetch(`/api/sunRiseSet?date=2day`, {
    method: "GET",
  });
  const data2Day = await response2Day.json();
  formatRiseSet(data2Day, sunTimes, 2);

  return sunTimes;
}

export function setShadingPoints(sunShading, dataHistory, dataPredictions) {
  let shadePoints = [];
  let q = 0; //shadePoints array position
  let d = 1; //sunShading array position to 1 so we skip first sunrise
  if (dataHistory[0].x < sunShading[0]) {
    //if the first sun rise is after the first data point
    d = 0; //set sunShading array position to 0 so first sunrise can be used
    shadePoints[0] = 0; //at night so set first shadePoint to first point
    q++;
  }
  for (var u = 0; u < dataHistory.length; u++) {
    //loop through graph data
    if (dataHistory[u].x > sunShading[d]) {
      //if the data point time is greater than the sunrise/sunset time
      shadePoints[q] = u; //set data point number as shadePoint
      q++;
      d++;
    }
  }
  for (u = u; u < dataPredictions.length; u++) {
    //loop through graph data2
    if (dataPredictions[u].x > sunShading[d]) {
      //if the data point time is greater than the sunrise/sunset time
      shadePoints[q] = u; //set data point number as shadePoint
      q++;
      d++;
    }
  }
  //Setting remaing shadepoints to be out of bounds
  for (var i = shadePoints.length; i < 10; i++) {
    shadePoints[i] = 2000;
  }
  return shadePoints; //use set function to set shadePoints
}
