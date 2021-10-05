import { round, formatDate, timeConv } from "../utils/format.js";

async function getTempReport() {
  try {
    const tempRecordResponse = await fetch(
      process.env.BASE_URL + `/api/temp?dataType=record`,
      {
        method: "GET",
      }
    );
    const tempRecordData = await tempRecordResponse.json();

    let recent = tempRecordData.data.smartMooringData.length - 1;
    let far =
      tempRecordData.data.smartMooringData[recent].sensorData[0].degrees *
        (9.0 / 5.0) +
      32;
    let temp = "Water Temp: " + round(far, 1) + " ºF";
    return temp;
  } catch (e) {
    return "Error retrieving Temp data. Please refresh the page or check back later.";
  }
}

async function getTempGraph() {
  let dateLabels = [];
  let tempRecord = await getTempRecord(dateLabels);
  let tempForecast = [];
  tempForecast = await getTempForecast(
    dateLabels,
    tempRecord.length,
    tempRecord[tempRecord.length - 1]
  );

  let graphData = {
    tempRecord: tempRecord,
    tempForecast: tempForecast,
    dateLabels: dateLabels,
  };
  return graphData;
}

async function getTempRecord(tempDate) {
  const current = new Date(); //Datetime object set to today
  try {
    const tempRecordResponse = await fetch(
      process.env.BASE_URL + `/api/temp?dataType=record`,
      {
        method: "GET",
      }
    );
    const tempRecordData = await tempRecordResponse.json();

    let tempTime; //time of temp data currently being looked at
    let tempRecord = []; //graph data
    let i = 0; //data position
    tempRecordData.data.smartMooringData.map((sample) => {
      //this function loops through rows and puts the current row in sample each time
      //sample.sensorData[0].degrees is the temp in C at the surface
      tempTime = new Date(sample.timestamp); //set the waveTime to the time the wave was recorded
      if (
        tempTime.getTime() < current.getTime() &&
        tempTime.getTime() > current.getTime() - 172800000
      ) {
        tempRecord[i] = {
          x: tempTime.getTime(), //the x is time in milliseconds since 01/01/1970
          y: round(sample.sensorData[0].degrees * (9.0 / 5.0) + 32, 2),
        };
        tempDate[i] = //Setting Date Label
          tempTime.toString().substring(4, 10) +
          ", " +
          timeConv(tempTime.toString().substring(16, 21));
        i++; //incrementing data position
      }
    });
    return tempRecord;
  } catch (e) {
    return [];
  }
}

async function getTempForecast(tempDate, i, lastTempRecord) {
  const current = new Date(); //Datetime object set to today
  try {
    // formats the month and date to have leading zero if only a single digit
    let month = "00" + (current.getMonth() + 1);
    month = month.substr(month.length - 2);
    let date = "00" + current.getDate();
    date = date.substr(date.length - 2);
    const tempForecastResponse = await fetch(
      process.env.BASE_URL +
        `/api/temp?dataType=forecast&date=` +
        current.getFullYear() +
        month +
        date,
      { method: "GET" }
    );
    const tempForecastData = await tempForecastResponse.text();
    
    let tempForecast = [];
    tempForecast[i - 1] = lastTempRecord;
    let lastTime = new Date(tempForecast[i - 1].x); //set to last recorded temp time
    let lastTemp = (tempForecast[i - 1].y - 32) * (5.0 / 9.0); // set last temp in celcius

    let times = tempForecastData.substring(
      tempForecastData.indexOf("temp.time") + 14
    );
    times = times.substring(0, times.indexOf("\n"));
    let temps = tempForecastData.substring(
      tempForecastData.indexOf("[0][0][0],") + 11
    );
    temps = temps.substring(0, temps.indexOf("temp.time") - 1);
    let first = true;
    while (times !== "") {
      let time = times.substring(0, times.indexOf(","));
      let temp = temps.substring(0, temps.indexOf("["));
      if (times.indexOf(",") !== -1) {
        times = times.substring(times.indexOf(",") + 2);
        temps = temps.substring(temps.indexOf("]") + 9);
      } else {
        time = times;
        times = "";
        temp = temps;
        temps = "";
      }
      let t = new Date(parseInt(time + "000"));
      if (
        t.getTime() >= lastTime.getTime() &&
        t.getTime() < current.getTime() + 86400000
      ) {
        if (first) {
          // add more pionts before the first time as needed
          first = false;
          let skips = parseInt((t.getTime() - lastTime.getTime()) / 600000); // number of added points
          let tempDiff = (lastTemp - temp) / (skips + 1);
          for (let k = skips; k > 0; k--) {
            let t2 = new Date(t.getTime() - k * 600000);
            tempForecast[i] = {
              x: t2.getTime(),
              y: round((parseFloat(temp) + k * tempDiff) * (9.0 / 5.0) + 32, 2),
            };
            tempDate[i] =
              t2.toString().substring(4, 10) +
              ", " +
              timeConv(t2.toString().substring(16, 21));
            i++;
          }
        }
        tempForecast[i] = {
          x: t.getTime(),
          y: round(parseFloat(temp) * (9.0 / 5.0) + 32, 2),
        };
        tempDate[i] =
          t.toString().substring(4, 10) +
          ", " +
          timeConv(t.toString().substring(16, 21));
        i++;
        // add up to 5 points after the time as needed
        let skips = parseInt(
          (current.getTime() + 86400000 - t.getTime()) / 600000
        );
        let nextTemp = temps.substring(0, temps.indexOf("["));
        if (times.indexOf(",") === -1) {
          nextTemp = temps;
        }
        let tempDiff = (nextTemp - temp) / 6;
        if (skips > 5) {
          skips = 5;
        }
        for (let k = 1; k < skips + 1; k++) {
          let t2 = new Date(t.getTime() + k * 600000);
          tempForecast[i] = {
            x: t2.getTime(),
            y: round((parseFloat(temp) + k * tempDiff) * (9.0 / 5.0) + 32, 2),
          };
          tempDate[i] =
            t2.toString().substring(4, 10) +
            ", " +
            timeConv(t2.toString().substring(16, 21));
          i++;
        }
      }
    }

    return tempForecast;
  } catch (e) {
    return [];
  }
}

export { getTempReport, getTempGraph };
