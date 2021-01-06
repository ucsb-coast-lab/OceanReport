import { round, timeConv } from "../utils/format.js";

async function getWaveReport() {
  const waveRecordResponse = await fetch(`/api/spotBuoy?dataType=record`, {
    method: "GET",
  });
  const waveRecordData = await waveRecordResponse.json(); //data contains last 96 data records recorded by the SPOT wave buoy

  let wave =
    round(
      waveRecordData.data.waves[waveRecordData.data.waves.length - 1]
        .significantWaveHeight / 0.3048,
      1
    ) +
    " ft @ " +
    round(
      waveRecordData.data.waves[waveRecordData.data.waves.length - 1]
        .peakPeriod,
      0
    ) +
    " secs from " +
    round(
      waveRecordData.data.waves[waveRecordData.data.waves.length - 1]
        .peakDirection,
      0
    ) +
    "º";

  return wave;
}

async function getWaveGraphs() {
  const waveRecordResponse = await fetch(`/api/spotBuoy?dataType=record`, {
    method: "GET",
  });
  const waveRecordData = await waveRecordResponse.json(); //data contains last 96 data records recorded by the SPOT wave buoy

  //Setting up the Graph Data
  let waveTime; //time of wave currently being looked at
  let chartData = []; //Graph Wave Height Data
  let periodData = []; //Graph Wave Period Data
  let dates = []; //Labels
  let i = 0; //data position
  waveRecordData.data.waves.map((wave) => {
    waveTime = new Date(wave.timestamp); //set the waveTime to the time the wave was recorded
    chartData[i] = {
      x: waveTime.getTime(), //the x is time in milliseconds since 01/01/1970
      y: round(wave.significantWaveHeight / 0.3048, 2), //y is height in ft rounded to 2 decimals
    };
    periodData[i] = {
      x: waveTime.getTime(),
      y: wave.peakPeriod, //y is wave period in s
    };
    dates[i] = //Setting Date Label
      waveTime.toString().substring(4, 10) +
      ", " +
      timeConv(waveTime.toString().substring(16, 21));
    i++; //incrementing data position
  });

  const response2 = await fetch(`/api/spotBuoy?dataType=forecastCDIP`, {
    method: "GET",
  });
  const data2 = await response2.text(); //text not a json so we have to substring it to loop through values

  let chartData2 = []; //Second Wave Graph Data
  chartData2[i - 1] = chartData[i - 1]; //Setting first point of second graph data to last point of original graph data
  let periodData2 = []; //Second Wave Period Graph Data
  periodData2[i - 1] = periodData[i - 1]; //Setting first point of second graph data to last point of original graph data
  let predTimes = data2.substr(data2.indexOf("waveTime[80]") + 13, 958); //chunk of text containing the times
  let predHeights = data2.substring(
    data2.indexOf("waveHs[80]") + 11,
    data2.indexOf("waveTp[80]") - 2
  ); //chunk of text containing the heights
  let predPeriods = data2.substring(
    data2.indexOf("waveTp[80]") + 11,
    data2.length - 2
  ); //chunk of text containing the periods
  let currHeight;
  let currPeriod;
  let s = 0;
  let i2 = i;
  let skips;
  while (predTimes.length) {
    //sets the height to the one currently being looked at
    if (predHeights.indexOf(",") !== -1) {
      //if not last height on the list
      currHeight = predHeights.substr(0, predHeights.indexOf(","));
      predHeights = predHeights.substr(predHeights.indexOf(",") + 2);
      currPeriod = predPeriods.substr(0, predPeriods.indexOf(","));
      predPeriods = predPeriods.substr(predPeriods.indexOf(",") + 2);
    } else {
      currHeight = predHeights;
      predHeights = "";
      currPeriod = predPeriods;
      predPeriods = "";
    }
    //sets the time to the one currently being looked at
    let currTime = predTimes.substr(0, 10);
    predTimes = predTimes.substr(12);
    if (
      //if the time is greater than last recorded time on original graph and less than that time plus 24 hours
      parseInt(currTime + "000") > chartData2[i2 - 1].x &&
      parseInt(currTime + "000") < chartData2[i2 - 1].x + 86400000
    ) {
      let t = new Date(parseInt(currTime + "000")); //set new DateTime object to the time of current wave
      if (s === 0) {
        //if this is the first data point
        let diff = parseInt(currTime + "000") - chartData2[i - 1].x; //Seeing how many points 30 min apart must be added
        skips = parseInt(diff / 1800000); //between last recorded data and this first data point
        let drop = //height change between added points
          (chartData2[i - 1].y - round(parseFloat(currHeight) / 0.3048, 2)) /
          skips;
        for (s = 0; s < skips - 1; s++) {
          //adds the new points to the graph data
          let j = new Date(t.getTime() - 1800000 * (skips - 1 - s));
          chartData2[i + s] = {
            x: j.getTime(),
            y: round(chartData[i - 1].y - (s + 1) * drop, 2),
          };
          dates[i + s] =
            j.toString().substring(4, 10) +
            ", " +
            timeConv(j.toString().substring(16, 21));
        }

        //same process for the wave period
        let drop2 =
          (periodData2[i - 1].y - round(parseFloat(currPeriod), 2)) / skips;
        for (let f = 0; f < skips - 1; f++) {
          periodData2[i + f] = {
            x: t.getTime() - 1800000 * (skips - 1 - f),
            y: round(periodData2[i - 1].y - (f + 1) * drop2, 2),
          };
        }

        i = i + s; //increment the data position by the amount of points added
      }
      //Add current data points to their respective graphs
      periodData2[i] = {
        x: parseInt(currTime + "000"),
        y: round(parseFloat(currPeriod), 2),
      };
      chartData2[i] = {
        x: parseInt(currTime + "000"),
        y: round(parseFloat(currHeight) / 0.3048, 2),
      };
      dates[i] =
        t.toString().substring(4, 10) +
        ", " +
        timeConv(t.toString().substring(16, 21));

      for (var k = 1; k <= 5; k++) {
        //add points after current data point
        if (
          //if the next time is greater than last recorded time plus 24hrs and added points plus skips exceeds 5
          parseInt(predTimes.substr(0, 10) + "000") >
            chartData2[i2 - 1].x + 86400000 &&
          k + skips > 5
        ) {
          break; //leave the loop
        }

        //Set the added points and their labels
        let drop =
          (round(parseFloat(currHeight) / 0.3048, 2) -
            round(
              parseFloat(predHeights.substr(0, predHeights.indexOf(","))) /
                0.3048,
              2
            )) /
          6;
        let j = new Date(t.getTime() + 1800000 * k);
        chartData2[i + k] = {
          x: j.getTime(),
          y: round(round(parseFloat(currHeight) / 0.3048, 2) - k * drop, 2),
        };

        let drop2 =
          (round(parseFloat(currPeriod), 2) -
            round(
              parseFloat(predPeriods.substr(0, predPeriods.indexOf(","))),
              2
            )) /
          6;
        periodData2[i + k] = {
          x: t.getTime() + 1800000 * k,
          y: round(round(parseFloat(currPeriod), 2) - k * drop2, 2),
        };

        dates[i + k] =
          j.toString().substring(4, 10) +
          ", " +
          timeConv(j.toString().substring(16, 21));
      }
      i = i + 6;
      t++;
    }
  }

  const response3 = await fetch(`/api/spotBuoy?dataType=forecastNOAA`, {
    method: "GET",
  });
  const str = await response3.text();
  const data3 = await new window.DOMParser().parseFromString(str, "text/xml"); //XML format
  let waves = data3.getElementsByTagName("waves");
  let times = data3.getElementsByTagName("start-valid-time");

  let chartData3 = [];
  chartData3[i2 - 1] = chartData[i2 - 1];
  let r = i2;
  let a = 0;
  for (var t = 0; t < 30; t++) {
    let predTime = new Date(times[t].textContent);
    let drop;
    if (
      predTime.getTime() > chartData3[r - 1].x &&
      predTime.getTime() < chartData3[r - 1].x + 86400000
    ) {
      if (a === 0) {
        let diff = predTime.getTime() - chartData3[i2 - 1].x;
        let skips = parseInt(diff / 1800000);
        drop =
          (chartData3[i2 - 1].y - parseInt(waves[t].firstChild.textContent)) /
          skips;
        for (var w = 0; w < skips - 1; w++) {
          chartData3[i2 + w] = {
            x: predTime.getTime() - 1800000 * (skips - 1 - w),
            y: round(chartData3[i2 - 1].y - (w + 1) * drop, 2),
          };
        }
        i2 += w;
        a++;
      }
      chartData3[i2] = {
        x: predTime.getTime(),
        y: parseInt(waves[t].firstChild.textContent),
      };
      drop =
        (parseInt(waves[t].firstChild.textContent) -
          parseInt(waves[t + 1].firstChild.textContent)) /
        2;
      chartData3[i2 + 1] = {
        x: predTime.getTime(),
        y: parseInt(waves[t].firstChild.textContent) - drop,
      };
      i2 += 2;
    }
  }

  let graphData = {
    waveRecord: chartData,
    periodRecord: periodData,
    waveForecastCDIP: chartData2,
    periodForecast: periodData2,
    dateLabels: dates,
    waveForecastNOAA: chartData3,
  };
  return graphData;
}

export { getWaveReport, getWaveGraphs };
