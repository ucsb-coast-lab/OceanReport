import { round, timeConv } from "../utils/format.js";
var DOMParser = require("xmldom").DOMParser;

const current = new Date(); //Datetime object set to today
const dayBeforeYesterday = new Date();
dayBeforeYesterday.setDate(current.getDate() - 2);

async function getWaveReport() {
  try {
    const waveRecordResponse = await fetch(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      {
        method: "GET",
      }
    );
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
  } catch (e) {
    return "Error retrieving wave data. Please refresh the page or check back later.";
  }
}

async function getWaveGraphs() {
  var dateLabels = [];
  let { waveRecord, periodRecord } = await getWaveRecord(dateLabels);
  let waveForecastCDIP = [];
  let periodForecast = [];
  let waveForecastNOAA = [];
  let result = await getWaveForecastCDIP(
    dateLabels,
    waveRecord.length,
    waveRecord[waveRecord.length - 1],
    periodRecord[waveRecord.length - 1]
  );
  waveForecastCDIP = result.waveForecastCDIP;
  periodForecast = result.periodForecast;
  waveForecastNOAA = await getWaveForecastNOAA(
    waveRecord.length,
    waveRecord[waveRecord.length - 1]
  );

  let graphData = {
    waveRecord: waveRecord,
    periodRecord: periodRecord,
    waveForecastCDIP: waveForecastCDIP,
    periodForecast: periodForecast,
    dateLabels: dateLabels,
    waveForecastNOAA: waveForecastNOAA,
  };
  return graphData;
}

async function getWaveRecord(dates) {
  let waveRecord = []; //Graph Wave Height Data
  let periodRecord = []; //Graph Wave Period Data
  try {
    const waveRecordResponse = await fetch(
      process.env.BASE_URL + `/api/wave?dataType=record`,
      {
        method: "GET",
      }
    );
    const waveRecordData = await waveRecordResponse.json(); //data contains last 96 data records recorded by the SPOT wave buoy

    //Setting up the Graph Data
    let waveTime; //time of wave currently being looked at
    let firstRecord = true;
    let i = 0;
    let previousWave;
    waveRecordData.data.waves.map((wave) => {
      waveTime = new Date(wave.timestamp); //set the waveTime to the time the wave was recorded
      if (
        waveTime.getTime() < current.getTime() &&
        waveTime.getTime() > current.getTime() - 172800000
      ) {
        let previousWaveTime = new Date(previousWave.timestamp);
        if (waveTime.getTime() - previousWaveTime.getTime() > 1860000) {
          //check if data points are more than 31 minutes apart
          let skips = 2;
          if (firstRecord) {
            //First record may only add a single point or none infront
            let diff = waveTime.getTime() - dayBeforeYesterday.getTime(); //Seeing how many points 30 min apart must be added
            skips = parseInt(diff / 1800000);
            firstRecord = false;
          }
          let waveDrop =
            (previousWave.significantWaveHeight - wave.significantWaveHeight) /
            3; //wave height change between added points, gaps are always 90 minutes so divide by 3 to get correct change
          let periodDrop = (previousWave.peakPeriod - wave.peakPeriod) / 3; //wave height change between added points, gaps are always 90 minutes so divide by 3 to get correct change
          for (let s = 0; s < skips; s++) {
            //adds the new points to the graph data
            let newWaveTime = new Date(
              waveTime.getTime() - 1800000 * (skips - s)
            );
            waveRecord[i + s] = {
              x: newWaveTime.getTime(),
              y: round(
                (wave.significantWaveHeight + (skips - s) * waveDrop) / 0.3048,
                2
              ),
            };
            periodRecord[i + s] = {
              x: newWaveTime.getTime(),
              y: round(wave.peakPeriod + (skips - s) * periodDrop, 2), //y is wave period in s
            };
            dates[i + s] =
              newWaveTime.toString().substring(4, 10) +
              ", " +
              timeConv(newWaveTime.toString().substring(16, 21));
          }
          i += skips;
        } else {
          firstRecord = false;
        }
        waveRecord[i] = {
          x: waveTime.getTime(), //the x is time in milliseconds since 01/01/1970
          y: round(wave.significantWaveHeight / 0.3048, 2), //y is height in ft rounded to 2 decimals
        };
        periodRecord[i] = {
          x: waveTime.getTime(),
          y: wave.peakPeriod, //y is wave period in s
        };
        dates[i] = //Setting Date Label
          waveTime.toString().substring(4, 10) +
          ", " +
          timeConv(waveTime.toString().substring(16, 21));
        i++; //incrementing data position
      }
      previousWave = wave;
    });
    return { waveRecord, periodRecord };
  } catch (e) {
    return { waveRecord, periodRecord };
  }
}

async function getWaveForecastCDIP(dates, i, lastWave, lastPeriod) {
  let waveForecastCDIP = []; //Second Wave Graph Data
  let periodForecast = []; //Second Wave Period Graph Data
  try {
    const waveForecastResponseCDIP = await fetch(
      process.env.BASE_URL + `/api/wave?dataType=forecastCDIP`,
      {
        method: "GET",
      }
    );
    const waveForecastDataCDIP = await waveForecastResponseCDIP.text(); //text not a json so we have to substring it to loop through values

    waveForecastCDIP[i - 1] = lastWave; //Setting first point of second graph data to last point of original graph data
    periodForecast[i - 1] = lastPeriod; //Setting first point of second graph data to last point of original graph data
    let predictionTimes = waveForecastDataCDIP.substr(
      waveForecastDataCDIP.indexOf("waveTime[80]") + 13,
      958
    ); //chunk of text containing the times
    let predictionHeights = waveForecastDataCDIP.substring(
      waveForecastDataCDIP.indexOf("waveHs[80]") + 11,
      waveForecastDataCDIP.indexOf("waveTp[80]") - 2
    ); //chunk of text containing the heights
    let predictionPeriods = waveForecastDataCDIP.substring(
      waveForecastDataCDIP.indexOf("waveTp[80]") + 11,
      waveForecastDataCDIP.length - 2
    ); //chunk of text containing the periods
    let currHeight;
    let currPeriod;
    let s = 0;
    let i2 = i;
    let skips;
    while (predictionTimes.length) {
      //sets the height to the one currently being looked at
      if (predictionHeights.indexOf(",") !== -1) {
        //if not last height on the list
        currHeight = predictionHeights.substr(
          0,
          predictionHeights.indexOf(",")
        );
        predictionHeights = predictionHeights.substr(
          predictionHeights.indexOf(",") + 2
        );
        currPeriod = predictionPeriods.substr(
          0,
          predictionPeriods.indexOf(",")
        );
        predictionPeriods = predictionPeriods.substr(
          predictionPeriods.indexOf(",") + 2
        );
      } else {
        currHeight = predictionHeights;
        predictionHeights = "";
        currPeriod = predictionPeriods;
        predictionPeriods = "";
      }
      //sets the time to the one currently being looked at
      let currTime = predictionTimes.substr(0, 10);
      predictionTimes = predictionTimes.substr(12);
      let predTime = new Date(parseInt(currTime + "000"));
      if (
        //if the time is greater than last recorded time on original graph and less than that time plus 24 hours
        predTime.getTime() > waveForecastCDIP[i2 - 1].x &&
        predTime.getTime() < current.getTime() + 86400000
      ) {
        if (s === 0) {
          //if this is the first data point
          let diff = predTime.getTime() - waveForecastCDIP[i - 1].x; //Seeing how many points 30 min apart must be added
          skips = parseInt(diff / 1800000); //between last recorded data and this first data point
          let drop = //height change between added points
            (waveForecastCDIP[i - 1].y -
              round(parseFloat(currHeight) / 0.3048, 2)) /
            (skips + 1);
          for (s = 0; s < skips; s++) {
            //adds the new points to the graph data
            let newWaveTime = new Date(
              predTime.getTime() - 1800000 * (skips - s)
            );
            waveForecastCDIP[i + s] = {
              x: newWaveTime.getTime(),
              y: round(waveForecastCDIP[i - 1].y - (s + 1) * drop, 2),
            };
            dates[i + s] =
              newWaveTime.toString().substring(4, 10) +
              ", " +
              timeConv(newWaveTime.toString().substring(16, 21));
          }

          //same process for the wave period
          let drop2 =
            (periodForecast[i - 1].y - round(parseFloat(currPeriod), 2)) /
            (skips + 1);
          for (let f = 0; f < skips; f++) {
            periodForecast[i + f] = {
              x: predTime.getTime() - 1800000 * (skips - f),
              y: round(periodForecast[i - 1].y - (f + 1) * drop2, 2),
            };
          }

          i += skips; //increment the data position by the amount of points added
        }
        //Add current data points to their respective graphs
        periodForecast[i] = {
          x: parseInt(currTime + "000"),
          y: round(parseFloat(currPeriod), 2),
        };
        waveForecastCDIP[i] = {
          x: parseInt(currTime + "000"),
          y: round(parseFloat(currHeight) / 0.3048, 2),
        };
        dates[i] =
          predTime.toString().substring(4, 10) +
          ", " +
          timeConv(predTime.toString().substring(16, 21));

        for (var k = 1; k < 6; k++) {
          //add points after current data point
          let newWaveTime = new Date(predTime.getTime() + 1800000 * k);
          if (
            //if the next time is greater than current time plus 24hrs
            newWaveTime.getTime() >
            current.getTime() + 86400000
          ) {
            break; //leave the loop
          }

          //Set the added points and their labels
          let drop =
            (round(parseFloat(currHeight) / 0.3048, 2) -
              round(
                parseFloat(
                  predictionHeights.substr(0, predictionHeights.indexOf(","))
                ) / 0.3048,
                2
              )) /
            6;
          waveForecastCDIP[i + k] = {
            x: newWaveTime.getTime(),
            y: round(round(parseFloat(currHeight) / 0.3048, 2) - k * drop, 2),
          };

          let drop2 =
            (round(parseFloat(currPeriod), 2) -
              round(
                parseFloat(
                  predictionPeriods.substr(0, predictionPeriods.indexOf(","))
                ),
                2
              )) /
            6;
          periodForecast[i + k] = {
            x: newWaveTime.getTime(),
            y: round(round(parseFloat(currPeriod), 2) - k * drop2, 2),
          };

          dates[i + k] =
            newWaveTime.toString().substring(4, 10) +
            ", " +
            timeConv(newWaveTime.toString().substring(16, 21));
        }
        i += 6;
      }
    }
    return { waveForecastCDIP, periodForecast };
  } catch (e) {
    return { waveForecastCDIP, periodForecast };
  }
}

async function getWaveForecastNOAA(i2, lastWave) {
  try {
    const waveForecastResponseNOAA = await fetch(
      process.env.BASE_URL + `/api/wave?dataType=forecastNOAA`,
      {
        method: "GET",
      }
    );
    const str = await waveForecastResponseNOAA.text();
    const waveForecastDataNOAA = new DOMParser().parseFromString(
      str,
      "text/xml"
    ); //XML format
    let waves = waveForecastDataNOAA.getElementsByTagName("waves");
    let times = waveForecastDataNOAA.getElementsByTagName("start-valid-time");

    let waveForecastNOAA = [];
    waveForecastNOAA[i2 - 1] = lastWave;
    let r = i2;
    let a = 0;
    for (var t = 0; t < 30; t++) {
      let predTime = new Date(times[t].textContent);
      let drop;
      if (
        predTime.getTime() > waveForecastNOAA[r - 1].x &&
        predTime.getTime() < current.getTime() + 86400000
      ) {
        if (a === 0) {
          let diff = predTime.getTime() - waveForecastNOAA[i2 - 1].x;
          let skips = parseInt(diff / 1800000);
          drop =
            (waveForecastNOAA[i2 - 1].y -
              parseInt(waves[t].firstChild.textContent)) /
            (skips + 1);
          for (var w = 0; w < skips; w++) {
            waveForecastNOAA[i2 + w] = {
              x: predTime.getTime() - 1800000 * (skips - w),
              y: round(waveForecastNOAA[i2 - 1].y - (w + 1) * drop, 2),
            };
          }
          i2 += w;
          a++;
        }
        waveForecastNOAA[i2] = {
          x: predTime.getTime(),
          y: parseInt(waves[t].firstChild.textContent),
        };
        let newWaveTime = new Date(predTime.getTime() + 1800000);
        if (newWaveTime.getTime() < current.getTime() + 86400000) {
          drop =
            (parseInt(waves[t].firstChild.textContent) -
              parseInt(waves[t + 1].firstChild.textContent)) /
            2;
          waveForecastNOAA[i2 + 1] = {
            x: predTime.getTime(),
            y: parseInt(waves[t].firstChild.textContent) - drop,
          };
        }
        i2 += 2;
      }
    }
    return waveForecastNOAA;
  } catch (e) {
    return [];
  }
}

export { getWaveReport, getWaveGraphs };
