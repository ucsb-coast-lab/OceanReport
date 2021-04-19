import { round, timeConv } from "../utils/format.js";

const current = new Date(); //Datetime object set to today
const dayBeforeYesterday = new Date();
dayBeforeYesterday.setDate(current.getDate() - 2);

async function getWindReport() {
  const windRecordResponse = await fetch(`/api/wind?dataType=record`, {
    method: "GET",
  });
  const windRecordData = await windRecordResponse.json(); //data contains latest records from SPOT wave buoy

  let wind;
  if (windRecordData.data.wind[windRecordData.data.wind.length - 1].speed < 2) {
    wind = "Calm";
  } else {
    let dir = "north";
    let theta =
      windRecordData.data.wind[windRecordData.data.wind.length - 1].direction;
    if (theta >= 45 && theta < 135) {
      dir = "east";
    } else if (theta >= 135 && theta < 225) {
      dir = "south";
    } else if (theta >= 225 && theta < 315) {
      dir = "west";
    }
    wind =
      "From the " +
      dir +
      " at " +
      round(
        windRecordData.data.wind[windRecordData.data.wind.length - 1].speed,
        0
      ) +
      " kts";
  }

  return wind;
}

async function getWindGraph() {
  const windRecordResponse = await fetch(`/api/wind?dataType=record`, {
    method: "GET",
  });
  const windRecordData = await windRecordResponse.json(); //data contains last 96 data records recorded by the SPOT wave buoy

  const windForecastResponse = await fetch(`/api/wind?dataType=forecastNOAA`, {
    method: "GET",
  });
  const windForecastText = await windForecastResponse.text();
  const windForecastData = await new window.DOMParser().parseFromString(
    windForecastText,
    "text/xml"
  ); //XML format
  let times = windForecastData.getElementsByTagName("start-valid-time");

  //Setting up wind data
  let windRecord = [];
  let dates = [];
  let i = 0;
  let firstRecord = true;
  let previousWind;
  let previousWindTime;
  windRecordData.data.wind.map((wind) => {
    let windTime = new Date(wind.timestamp);
    if (
      windTime.getTime() < current.getTime() &&
      windTime.getTime() > current.getTime() - 172800000
    ) {
      previousWindTime = new Date(previousWind.timestamp);
      if (windTime.getTime() - previousWindTime.getTime() > 1860000) {
        //check if data points are more than 31 minutes apart
        let skips = 2;
        if (firstRecord) {
          //First record may only add a single point or none infront
          let diff = windTime.getTime() - dayBeforeYesterday.getTime(); //Seeing how many points 30 min apart must be added
          skips = parseInt(diff / 1800000);
          firstRecord = false;
        }
        let drop = (previousWind.speed - wind.speed) / 3; //wind speed change between added points, gaps are always 90 minutes so divide by 3 to get correct change
        for (let s = 0; s < skips; s++) {
          //adds the new points to the graph data
          let newWindTime = new Date(
            windTime.getTime() - 1800000 * (skips - s)
          );
          windRecord[i + s] = {
            x: newWindTime.getTime(),
            y: round(wind.speed + (skips - s) * drop, 2),
          };
          dates[i + s] =
            newWindTime.toString().substring(4, 10) +
            ", " +
            timeConv(newWindTime.toString().substring(16, 21));
        }
        i += skips;
      } else {
        firstRecord = false;
      }
      windRecord[i] = { x: windTime.getTime(), y: round(wind.speed, 2) };
      dates[i] =
        windTime.toString().substring(4, 10) +
        ", " +
        timeConv(windTime.toString().substring(16, 21));
      i++;
    }
    previousWind = wind;
  });

  let winds = windForecastData.getElementsByTagName("wind-speed")[0];
  let currWind = winds.firstElementChild;
  let windForecast = [];
  windForecast[i - 1] = windRecord[i - 1];
  let r = i;
  let a = 0;
  for (var t = 0; t < 30; t++) {
    let predTime = new Date(times[t].textContent);
    let drop;
    if (
      predTime.getTime() > windForecast[r - 1].x &&
      predTime.getTime() < current.getTime() + 86400000
    ) {
      if (a === 0) {
        let diff = predTime.getTime() - windForecast[i - 1].x;
        let skips = parseInt(diff / 1800000);
        drop =
          (windForecast[i - 1].y - parseInt(currWind.textContent) * 1.151) /
          (skips + 1);
        for (let w = 0; w < skips; w++) {
          let newWindTime = new Date(
            predTime.getTime() - 1800000 * (skips - w)
          );
          windForecast[i + w] = {
            x: newWindTime.getTime(),
            y: round(windForecast[i - 1].y - (w + 1) * drop, 2),
          };
          dates[i + w] =
            newWindTime.toString().substring(4, 10) +
            ", " +
            timeConv(newWindTime.toString().substring(16, 21));
        }
        i += skips;
        a++;
      }
      windForecast[i] = {
        x: predTime.getTime(),
        y: round(parseInt(currWind.textContent) * 1.151, 2),
      };
      dates[i] =
        predTime.toString().substring(4, 10) +
        ", " +
        timeConv(predTime.toString().substring(16, 21));
      let newWindTime = new Date(predTime.getTime() + 1800000);
      if (newWindTime.getTime() < current.getTime() + 86400000) {
        drop =
          (parseInt(currWind.textContent) * 1.151 -
            parseInt(currWind.nextElementSibling.textContent) * 1.151) /
          2;
        windForecast[i + 1] = {
          x: newWindTime.getTime(),
          y: round(parseInt(currWind.textContent) * 1.151 - drop, 2),
        };
        dates[i + 1] =
          newWindTime.toString().substring(4, 10) +
          ", " +
          timeConv(newWindTime.toString().substring(16, 21));
      }
      i += 2;
      currWind = currWind.nextElementSibling;
    }
  }

  let graphData = {
    windRecord: windRecord,
    windForecast: windForecast,
    dateLabels: dates,
  };
  return graphData;
}

export { getWindReport, getWindGraph };
