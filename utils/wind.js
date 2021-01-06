import { round, timeConv } from "../utils/format.js";

async function getWindReport() {
  const windRecordResponse = await fetch(`/api/spotBuoy?dataType=record`, {
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
  const waveRecordResponse = await fetch(`/api/spotBuoy?dataType=record`, {
    method: "GET",
  });
  const waveRecordData = await waveRecordResponse.json(); //data contains last 96 data records recorded by the SPOT wave buoy

  const response3 = await fetch(`/api/spotBuoy?dataType=forecastNOAA`, {
    method: "GET",
  });
  const str = await response3.text();
  const data3 = await new window.DOMParser().parseFromString(str, "text/xml"); //XML format
  let times = data3.getElementsByTagName("start-valid-time");

  //Setting up wind data
  let chartData = [];
  let dates = [];
  let i = 0;
  waveRecordData.data.wind.map((wind) => {
    let waveTime = new Date(wind.timestamp);
    chartData[i] = { x: waveTime.getTime(), y: round(wind.speed, 2) };
    dates[i] =
      waveTime.toString().substring(4, 10) +
      ", " +
      timeConv(waveTime.toString().substring(16, 21));
    i++;
  });

  let winds = data3.getElementsByTagName("wind-speed")[0];
  let currWind = winds.firstElementChild;
  let chartData2 = [];
  chartData2[i - 1] = chartData[i - 1];
  let r = i;
  let a = 0;
  for (var t = 0; t < 30; t++) {
    let predTime = new Date(times[t].textContent);
    let drop;
    if (
      predTime.getTime() > chartData2[r - 1].x &&
      predTime.getTime() < chartData2[r - 1].x + 86400000
    ) {
      if (a === 0) {
        let diff = predTime.getTime() - chartData2[i - 1].x;
        let skips = parseInt(diff / 1800000);
        drop =
          (chartData2[i - 1].y - parseInt(currWind.textContent) * 1.151) /
          skips;
        for (var w = 0; w < skips - 1; w++) {
          let j = new Date(predTime.getTime() - 1800000 * (skips - 1 - w));
          chartData2[i + w] = {
            x: j.getTime(),
            y: round(chartData2[i - 1].y - (w + 1) * drop, 2),
          };
          dates[i + w] =
            j.toString().substring(4, 10) +
            ", " +
            timeConv(j.toString().substring(16, 21));
        }
        i += w;
        a++;
      }
      chartData2[i] = {
        x: predTime.getTime(),
        y: round(parseInt(currWind.textContent) * 1.151, 2),
      };
      dates[i] =
        predTime.toString().substring(4, 10) +
        ", " +
        timeConv(predTime.toString().substring(16, 21));
      drop =
        (parseInt(currWind.textContent) * 1.151 -
          parseInt(currWind.nextElementSibling.textContent) * 1.151) /
        2;
      chartData2[i + 1] = {
        x: predTime.getTime(),
        y: round(parseInt(currWind.textContent) * 1.151 - drop, 2),
      };
      let j = new Date(predTime.getTime() + 1800000);
      dates[i + 1] =
        j.toString().substring(4, 10) +
        ", " +
        timeConv(j.toString().substring(16, 21));
      i += 2;
      currWind = currWind.nextElementSibling;
    }
  }

  let graphData = {
    windRecord: chartData,
    windForecast: chartData2,
    dateLabels: dates,
  };
  return graphData;
}

export { getWindReport, getWindGraph };
