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

async function getTempForecast(tempDate, i, lastTemp) {
  const current = new Date(); //Datetime object set to today
  try {
    const tempForecastResponse = await fetch(
      process.env.BASE_URL + `/api/temp?dataType=forecast`,
      {
        method: "GET",
      }
    );
    const tempForecastData = await tempForecastResponse.json();
    // //USE formatDate instead of below
    // const prev = new Date(current); //Datetime object set to yesterday
    // prev.setDate(prev.getDate() - 1); //yesterday's year  year5.toString() gives you 4 digit year
    // let year5 = prev.getFullYear();
    // let month5 = prev.getMonth() + 1;
    // let m5 = "00" + month5;
    // m5 = m5.substr(m5.length - 2); //2 digit month for yesterday
    // let day5 = prev.getDate();
    // let d5 = "00" + day5;
    // d5 = d5.substr(d5.length - 2); //2 digit date for yesterday

    // var url =
    //   // "https://cors-anywhere.herokuapp.com/" + //cors proxy
    //   "http://west.rssoffice.com:8080/thredds/dodsC/roms/CA3km-forecast/CA/ca_subCA_fcst_" +
    //   year5.toString() +
    //   m5 +
    //   d5 +
    //   "03.nc.ascii?temp%5B0:1:69%5D%5B0:1:0%5D%5B103:1:103%5D%5B255:1:255%5D";
    // const response2 = await fetch(url, { method: "GET" });
    // const data2 = await response2.text(); //Data is a text and from the day before
    // console.log(data2)

    let tempForecast = [];
    // tempForecast[i - 1] = tempRecord[i - 1];
    // let lastTemp = (tempForecast[i - 1].y - 32) * (5.0 / 9.0);
    // let lastTime = new Date(tempForecast[i - 1].x); //set to last recorded temp time
    // let temps = data2.substring(data2.indexOf("[21][0][0],") + 10); //skipping all the previous days data, should start on today at 00:00
    // let count = 0;

    // for (var k = 0; k < 49; k++) {
    //   //k is synced to the hours so k = 10 would be 10am, k = 34 would be 10am the next day
    //   let newTemp = temps.substring(2, temps.indexOf("\n")); //gets the next temp
    //   temps = temps.substring(temps.indexOf("\n"));
    //   temps = temps.substring(temps.indexOf(",")); //set up rest to be ready
    //   if (count < 24 && lastTime.getHours() < k) {
    //     //if there hasn't been 24 temps logged and k is greater than the last temp time
    //     count++;
    //     let t = new Date(current); //setup new date time to current time
    //     t.setHours(k - 1); //set hours to k-1
    //     t.setMinutes(0); //set rest to 0
    //     t.setSeconds(0);
    //     t.setMilliseconds(0);
    //     if (count === 1) {
    //       //if first then add only extra points needed
    //       t.setMinutes(lastTime.getMinutes());
    //       let divs = parseInt((60 - lastTime.getMinutes()) / 4) + 1;
    //       let drop = (parseFloat(lastTemp) - parseFloat(newTemp)) / divs;
    //       for (var g = 1; g < divs; g++) {
    //         t.setMinutes(t.getMinutes() + 4);
    //         tempForecast[i] = {
    //           x: t.getTime(),
    //           y: round((parseFloat(lastTemp) - g * drop) * (9.0 / 5.0) + 32, 2),
    //         };
    //         tempDate[i] =
    //           t.toString().substring(4, 10) +
    //           ", " +
    //           timeConv(t.toString().substring(16, 21));
    //         i++;
    //       }
    //     } else {
    //       //else add 14 extra points at 4 minute increments
    //       let drop = (parseFloat(lastTemp) - parseFloat(newTemp)) / 15;
    //       for (var r = 1; r < 15; r++) {
    //         t.setMinutes(t.getMinutes() + 4);
    //         tempForecast[i] = {
    //           x: t.getTime(),
    //           y: round((parseFloat(lastTemp) - r * drop) * (9.0 / 5.0) + 32, 2),
    //         };
    //         tempDate[i] =
    //           t.toString().substring(4, 10) +
    //           ", " +
    //           timeConv(t.toString().substring(16, 21));
    //         i++;
    //       }
    //     }
    //     //Add predicted temp data
    //     t.setHours(k);
    //     if (k > 24) {
    //       t.setDate(t.getDate() - 1);
    //     }
    //     t.setMinutes(0);
    //     tempForecast[i] = {
    //       x: t.getTime(),
    //       y: round(parseFloat(newTemp) * (9.0 / 5.0) + 32, 2),
    //     };
    //     tempDate[i] =
    //       t.toString().substring(4, 10) +
    //       ", " +
    //       timeConv(t.toString().substring(16, 21));
    //     i++;
    //     lastTemp = newTemp;
    //     if (count === 24) {
    //       //add extra points after the last data point
    //       let extras = parseInt(lastTime.getMinutes() / 4);
    //       newTemp = temps.substring(2, temps.indexOf("\n"));
    //       let drop = (parseFloat(lastTemp) - parseFloat(newTemp)) / 15;
    //       for (var j = 1; j <= extras; j++) {
    //         t.setMinutes(t.getMinutes() + 4);
    //         tempForecast[i] = {
    //           x: t.getTime(),
    //           y: round((parseFloat(lastTemp) - j * drop) * (9.0 / 5.0) + 32, 2),
    //         };
    //         tempDate[i] =
    //           t.toString().substring(4, 10) +
    //           ", " +
    //           timeConv(t.toString().substring(16, 21));
    //         i++;
    //       }
    //     }
    //   }
    // }
    return tempForecast;
  } catch (e) {
    return [];
  }
}

export { getTempReport, getTempGraph };
