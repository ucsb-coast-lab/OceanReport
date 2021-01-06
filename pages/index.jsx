import React, { useState, useEffect } from "react"; //Used to set State variables
import Report from "../components/report.jsx"; //Report component
import Graphs from "../components/graphs.jsx"; //Graph component
import styles from "../styles/style.module.css"; //style sheet for layout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Used to add icons
import { faSync } from "@fortawesome/free-solid-svg-icons"; //Used to add icons
import { round, timeConv, formatDate } from "../utils/format.js";
import { getRiseSet, setShadingPoints } from "../utils/sunRiseSet.js";
import getDate from "../utils/date.js";
import { getWaveReport, getWaveGraphs } from "../utils/wave.js";
import { getWindReport, getWindGraph } from "../utils/wind.js";
import { getTempReport, getTempGraph } from "../utils/temp.js";
import { getTideReport, getTideGraph } from "../utils/tide.js";

export default function HomePage() {
  //Report Variables
  const [dateReport, setDateReport] = useState(""); //Use state variables are React elements
  const [waveReport, setWaveReport] = useState(""); //that are set using their setter functions
  const [windReport, setWindReport] = useState(""); //and keep track of the state of the reports
  const [tempReport, setTempReport] = useState(""); //information that will be displayed
  const [tideReport, setTideReport] = useState("");
  const [rising, setRising] = useState(true);
  const [hiReport, setHiReport] = useState("");
  const [loReport, setLoReport] = useState(""); //This first set of varibles are for the top Report

  //Graph Varibales
  //Data
  const [waveRecord, setWaveRecord] = useState([]);
  const [waveForecastCDIP, setWaveForecastCDIP] = useState([]);
  const [waveForecastNOAA, setWaveForecastNOAA] = useState([]);
  const [windRecord, setWindRecord] = useState([]);
  const [windForecast, setWindForecast] = useState([]);
  const [periodRecord, setPeriodRecord] = useState([]);
  const [periodForecast, setPeriodForecast] = useState([]);
  const [tempRecord, setTempRecord] = useState([]);
  const [tempForecast, setTempForecast] = useState([]);
  const [tideRecord, setTideRecord] = useState([]);
  const [tideForecast, setTideForecast] = useState([]); //This set of varibles are the data for the Graphs
  //Labels
  const [wavePeriodDates, setWavePeriodDates] = useState([]);
  const [windDates, setWindDates] = useState([]);
  const [tempDates, setTempDates] = useState([]);
  const [tideDates, setTideDates] = useState([]); //This set of varibles are the Labels for the Graphs
  //Sun rise and set points for different graphs
  const [sunTimes, setSunTimes] = useState([]);
  const [sunPointsWaveWind, setSunPointsWaveWind] = useState([]);
  const [sunPointsTemp, setSunPointsTemp] = useState([]); //This set of varibles are used for setting the
  const [sunPointsTide, setSunPointsTide] = useState([]); //day/night shading on the Graphs

  //These are formated for easy use in url requests
  const today = formatDate(0);
  const tomorrow = formatDate(1);
  const dayAfterTomorrow = formatDate(2);
  const threeDaysAhead = formatDate(3);
  const dayBeforeYesterday = formatDate(-2);
  const twoDaysBefore = formatDate(-3);

  const current = new Date(); //Datetime object set to today

  //This set of useEffect functions are called when used useState varibles listed in the array at the end are updated
  //Each of these functions uses the data about sun rise and sun set in addition to graph data to set up where the
  //day/night shading begins and ends
  useEffect(
    () => {
      //If all of the data sets are not empty then run
      if (sunTimes.length !== 0 && waveRecord.length !== 0) {
        setSunPointsWaveWind(
          setShadingPoints(sunTimes, waveRecord, waveForecastCDIP)
        );
      }
    },
    [
      sunTimes,
      waveRecord,
      waveForecastCDIP,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  useEffect(
    () => {
      //If all of the data sets are not empty then run
      if (sunTimes.length !== 0 && tempRecord.length !== 0) {
        setSunPointsTemp(setShadingPoints(sunTimes, tempRecord, tempForecast));
      }
    },
    [
      sunTimes,
      tempRecord,
      tempForecast,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  useEffect(
    () => {
      //If all of the data sets are not empty then run
      if (sunTimes.length !== 0 && tideRecord.length !== 0) {
        setSunPointsTide(setShadingPoints(sunTimes, tideRecord, tideForecast));
      }
    },
    [
      sunTimes,
      tideRecord,
      tideForecast,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  //function that calls all other functions for setting the data
  const updateReport = async () => {
    //Report
    setDateReport(await getDate());
    setWaveReport(await getWaveReport()); //set wave to the last wave height data point
    setWindReport(await getWindReport()); //set wind to the last wind speed data point
    setTempReport(await getTempReport()); //setting temp to last data point from request

    let tideData = await getTideReport();
    setTideReport(tideData.tide);
    setRising(tideData.rising);
    setHiReport(tideData.hi);
    setLoReport(tideData.lo);
  };

  const updateGraphs = async () => {
    //Sets sunrise and set times
    setSunTimes(await getRiseSet());

    //Graphs
    let waveGraphData = await getWaveGraphs();
    setWaveRecord(waveGraphData.waveRecord);
    setWaveForecastCDIP(waveGraphData.waveForecastCDIP);
    setWaveForecastNOAA(waveGraphData.waveForecastNOAA);
    setPeriodRecord(waveGraphData.periodRecord);
    setPeriodForecast(waveGraphData.periodForecast);
    setWavePeriodDates(waveGraphData.dateLabels);

    let windGraphData = await getWindGraph();
    setWindRecord(windGraphData.windRecord);
    setWindForecast(windGraphData.windForecast);
    setWindDates(windGraphData.dateLabels);

    let tideGraphData = await getTideGraph();
    setTideRecord(tideGraphData.tideRecord);
    setTideForecast(tideGraphData.tideForecast);
    setTideDates(tideGraphData.dateLabels);

    let tempGraphData = await getTempGraph();
    setTempRecord(tempGraphData.tempRecord);
    setTempForecast(tempGraphData.tempForecast);
    setTempDates(tempGraphData.dateLabels);
  };

  //This is the main function to run and it calls update once if the report data has not been set yet
  //Main purpose is to prevent the update from being called infite amount of times while data is trying to be set
  if (dateReport === "") {
    setDateReport(" ");
    updateReport();
    updateGraphs();
  }

  //this function sets the wind and wave data for the report and graphs
  const setWindWave = async () => {
    const waveRecordResponse = await fetch(`/api/spotBuoy?dataType=record`, {
      method: "GET",
    });
    const waveRecordData = await waveRecordResponse.json(); //data contains last 96 data records recorded by the SPOT wave buoy

    // let wave =
    //   round(
    //     waveRecordData.data.waves[waveRecordData.data.waves.length - 1].significantWaveHeight /
    //       0.3048,
    //     1
    //   ) +
    //   " ft @ " +
    //   round(waveRecordData.data.waves[waveRecordData.data.waves.length - 1].peakPeriod, 0) +
    //   " secs from " +
    //   round(waveRecordData.data.waves[waveRecordData.data.waves.length - 1].peakDirection, 0) +
    //   "º";
    // setWaveReport(wave); //set wave to the last wave height data point

    // let wind;
    // if (waveRecordData.data.wind[waveRecordData.data.wind.length - 1].speed < 2) {
    //   wind = "Calm";
    // } else {
    //   let dir = "north";
    //   let theta = waveRecordData.data.wind[waveRecordData.data.wind.length - 1].direction;
    //   if (theta >= 45 && theta < 135) {
    //     dir = "east";
    //   } else if (theta >= 135 && theta < 225) {
    //     dir = "south";
    //   } else if (theta >= 225 && theta < 315) {
    //     dir = "west";
    //   }
    //   wind =
    //     "From the " +
    //     dir +
    //     " at " +
    //     round(waveRecordData.data.wind[waveRecordData.data.wind.length - 1].speed, 0) +
    //     " kts";
    // }
    // setWindReport(wind); //set wind to the last wind speed data point

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
    setWaveRecord(chartData); //set wave height data
    setPeriodRecord(periodData); //set wave period data

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
    setWaveForecastCDIP(chartData2); //Set second wave height data
    setPeriodForecast(periodData2); //Set second wave period data
    setWavePeriodDates(dates); //Set Labels for these two graphs

    // Same process as above but with XML data, creating secondary predictions for wave height
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
    setWaveForecastNOAA(chartData3);

    //Setting up wind data
    chartData = [];
    dates = [];
    i = 0;
    waveRecordData.data.wind.map((wind) => {
      let waveTime = new Date(wind.timestamp);
      chartData[i] = { x: waveTime.getTime(), y: round(wind.speed, 2) };
      dates[i] =
        waveTime.toString().substring(4, 10) +
        ", " +
        timeConv(waveTime.toString().substring(16, 21));
      i++;
    });
    setWindRecord(chartData);

    let winds = data3.getElementsByTagName("wind-speed")[0];
    let currWind = winds.firstElementChild;
    chartData2 = [];
    chartData2[i - 1] = chartData[i - 1];
    r = i;
    a = 0;
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
    setWindForecast(chartData2);
    setWindDates(dates);
  };

  //this function sets the tempature data for the report and graphs
  const setTempData = async () => {
    let todayURLFormat = today.year + "-" + today.month + "-" + today.day;
    let tomorrowURLFormat =
      tomorrow.year + "-" + tomorrow.month + "-" + tomorrow.day;
    let dayBeforeYesterdayURLFormat =
      dayBeforeYesterday.year +
      "-" +
      dayBeforeYesterday.month +
      "-" +
      dayBeforeYesterday.day;
    let threeDaysAheadURLFormat =
      threeDaysAhead.year +
      "-" +
      threeDaysAhead.month +
      "-" +
      threeDaysAhead.day;

    const tempRecordResponse = await fetch(
      `/api/temp?dataType=record&begin_date=` +
        dayBeforeYesterdayURLFormat +
        `&end_date=` +
        tomorrowURLFormat,
      { method: "GET" }
    );
    const tempRecordData = await tempRecordResponse.json();

    // console.log(tempRecordData)

    // let recent = tempRecordData.table.rows.length - 1;
    // let far = tempRecordData.table.rows[recent][1] * (9.0 / 5.0) + 32;
    // let temp = "Water Temp: " + round(far, 1) + " ºF";
    // setTempReport(temp); //setting temp to last data point from request

    let tempData = []; //graph data
    let tempDate = []; //labels
    let i = 0; //data position
    tempRecordData.table.rows.map((sample) => {
      //this function loops through rows and puts the current row in sample each time
      //sample[0] conains the time stamp, sample[1] contains the temp value in C
      let time = new Date(sample[0]);
      if (
        time.getTime() < current.getTime() &&
        time.getTime() > current.getTime() - 172800000
      ) {
        tempData[i] = {
          x: time.getTime(),
          y: round(sample[1] * (9.0 / 5.0) + 32, 2),
        };
        tempDate[i] =
          time.toString().substring(4, 10) +
          ", " +
          timeConv(time.toString().substring(16, 21));
        i++;
      }
    });
    setTempRecord(tempData);

    // var url =
    //   "https://cors-anywhere.herokuapp.com/" + //cors proxy
    //   "http://west.rssoffice.com:8080/thredds/dodsC/roms/CA3km-forecast/CA/ca_subCA_fcst_" +
    //   year5.toString() +
    //   m5 +
    //   d5 +
    //   "03.nc.ascii?temp%5B0:1:69%5D%5B0:1:0%5D%5B103:1:103%5D%5B255:1:255%5D";
    // const response2 = await fetch(url, { method: "GET" });
    // const data2 = await response2.text(); //Data is a text and from the day before

    // let tempData2 = [];
    // tempData2[i - 1] = tempData[i - 1];
    // let lastTemp = (tempData2[i - 1].y - 32) * (5.0 / 9.0);
    // let lastTime = new Date(tempData2[i - 1].x); //set to last recorded temp time
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
    //         tempData2[i] = {
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
    //         tempData2[i] = {
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
    //     tempData2[i] = {
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
    //         tempData2[i] = {
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
    setTempDates(tempDate);
    // setTempForecast(tempData2);
  };

  //this function sets the tide data for the report and graphs
  const setTideData = async () => {
    let tomorrowURLFormat = tomorrow.year + tomorrow.month + tomorrow.day;
    let dayAfterTomorrowURLFormat =
      dayAfterTomorrow.year + dayAfterTomorrow.month + dayAfterTomorrow.day;
    let dayBeforeYesterdayURLFormat =
      dayBeforeYesterday.year +
      dayBeforeYesterday.month +
      dayBeforeYesterday.day;
    let twoDaysBeforeURLFormat =
      twoDaysBefore.year + twoDaysBefore.month + twoDaysBefore.day;

    //Setting hi and lo for report
    const response = await fetch(
      `/api/tide?reqNum=2&begin_date=` +
        dayBeforeYesterdayURLFormat +
        `&end_date=` +
        tomorrowURLFormat,
      { method: "GET" }
    );
    const data = await response.json();

    // let t_pred = {};
    // let n_pred = 0;
    let hiloTimes = [];
    let k = 0;

    data.predictions.map((prediction) => {
      // //loops through predictions and puts each as prediction
      let time = new Date(
        prediction.t.substring(0, 10) +
          "T" +
          prediction.t.substring(11, 16) +
          ":00Z"
      );
      if (
        time.getTime() < current.getTime() + 86400000 &&
        time.getTime() > current.getTime() - 259200000
      ) {
        hiloTimes[k] = time; //recording hi and low time for 3-days ago through tomorrow for use in the graph
        k++;
      }
      // if (time.getTime() > current.getTime() && n_pred < 2) {
      //   //gathering 2 data points that will be the next hi and low on the report
      //   t_pred[n_pred] = prediction;
      //   n_pred++;
      // }
    });

    //This is where it is determined if the the tide is high or low and it sets the string to be displayed
    // let first, second;
    // if (t_pred[0].type === "H") {
    //   first = "HI: ";
    //   second = "LO: ";
    // } else {
    //   first = "LO: ";
    //   second = "HI: ";
    // }
    // let height = round(parseFloat(t_pred[0].v), 1);
    // let height2 = round(parseFloat(t_pred[1].v), 1);
    // let time1 = new Date(
    //   t_pred[0].t.substring(0, 10) +
    //     "T" +
    //     t_pred[0].t.substring(11, 16) +
    //     ":00Z"
    // );
    // let time2 = new Date(
    //   t_pred[1].t.substring(0, 10) +
    //     "T" +
    //     t_pred[1].t.substring(11, 16) +
    //     ":00Z"
    // );
    // let t1 = timeConv(time1.toString().substring(16, 21));
    // let t2 = timeConv(time2.toString().substring(16, 21));
    // first += height + " ft @ " + t1;
    // second += height2 + " ft @ " + t2;
    // setHiReport(first); //hi and lo state variables don't necessarily contain the hi or lo
    // setLoReport(second);

    // const response2 = await fetch(`/api/tide?reqNum=1`, {method: "GET"});
    // const data2 = await response2.json();

    // let currTide =
    //   "Tide: " + round(parseFloat(data2.data[0].v), 1) + " ft and ";
    // if (data2.data[0].v < t_pred[0].v) {
    //   currTide += "rising";
    //   setRising(true); //this variable is used during rendering to choose the right tide icon
    // } else {
    //   currTide += "falling";
    //   setRising(false);
    // }
    // setTideReport(currTide);

    const res = await fetch(
      `/api/tide?reqNum=3&begin_date=` +
        twoDaysBeforeURLFormat +
        `&end_date=` +
        dayAfterTomorrowURLFormat,
      { method: "GET" }
    );
    const data3 = await res.json();

    let tideData = []; //Graph history data
    let tideDate = []; //Labels
    let i = 0;
    let tideData2 = []; //Graph predicted data
    let j = 0;

    data3.predictions.map((prediction) => {
      //looping through each prediction in predictions
      let time = new Date(
        prediction.t.substring(0, 10) +
          "T" +
          prediction.t.substring(11, 16) +
          ":00Z"
      );
      if (
        time.getTime() <= current.getTime() &&
        time.getTime() > current.getTime() - 259200000
      ) {
        tideData[i] = { x: time.getTime(), y: prediction.v };
        tideDate[i] = "";
        if (time.getTime() >= hiloTimes[j]) {
          //Labels only inlcude hilo times
          tideDate[i] =
            hiloTimes[j].toString().substring(4, 10) +
            ", " +
            timeConv(hiloTimes[j].toString().substring(16, 21));
          j++;
        }
        i++;
      } else if (
        time.getTime() < current.getTime() + 86400000 &&
        time.getTime() > current.getTime()
      ) {
        tideData2[i] = { x: time.getTime(), y: prediction.v };
        tideDate[i] = "";
        if (time.getTime() >= hiloTimes[j]) {
          tideDate[i] =
            hiloTimes[j].toString().substring(4, 10) +
            ", " +
            timeConv(hiloTimes[j].toString().substring(16, 21));
          j++;
        }
        i++;
      }
    });
    setTideDates(tideDate);
    setTideRecord(tideData);
    setTideForecast(tideData2);
  };

  //This is what gets rendered on the page
  //It is a mix of html and javascript with {} used around js code
  //Mainly it loads a loading screen until all the report items are filled
  //Then it displays the report and graphs components with info disclaimers
  return (
    <div className={styles.page}>
      {dateReport === "" ||
      waveReport === "" ||
      windReport === "" ||
      tempReport === "" ||
      tideReport === "" ||
      hiReport === "" ||
      loReport === "" ? (
        <div>
          <FontAwesomeIcon className={styles.iconsLoading} icon={faSync} />
          <p>Loading Ocean Report</p>
        </div>
      ) : (
        <div>
          <p className={styles.disclaimer}>
            Click on any section of the report to see where that data was
            gathered from.
          </p>
          <Report
            date={dateReport}
            wave={waveReport}
            wind={windReport}
            temp={tempReport}
            tide={tideReport}
            rising={rising}
            hi={hiReport}
            lo={loReport}
          />
          <p className={styles.disclaimer}>
            Each graph shows a 3-Day history of the data with some graphs also
            showing the next 24 hours of predictions in a lighter shade.
          </p>
          <Graphs
            waveData={waveRecord}
            waveData2={waveForecastCDIP}
            waveData3={waveForecastNOAA}
            windData={windRecord}
            windData2={windForecast}
            periodData={periodRecord}
            periodData2={periodForecast}
            tempData={tempRecord}
            tempData2={tempForecast}
            tideData={tideRecord}
            tideData2={tideForecast}
            wavePeriodLabels={wavePeriodDates}
            windLabels={windDates}
            tempLabels={tempDates}
            tideLabels={tideDates}
            sunPointsWaveWind={sunPointsWaveWind}
            sunPointsTemp={sunPointsTemp}
            sunPointsTide={sunPointsTide}
          />
          <p className={styles.disclaimer}>
            *The UCSB SPOT Wave Buoy is located off 3/4 of a mile off of Campus
            Point and records real time wave and wind data. To see more of its
            records click{" "}
            <a
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-0186"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            **The Sterns Wharf Automated Shore Station is run by SCCOOS and is
            located about 10 miles East of UCSB Campus Point. To see more data
            collected by the Stersn Wharf Automated Shore Station click{" "}
            <a
              target="_blank"
              href="https://www.sccoos.org/data/autoss/timeline/?main=single&station=stearns_wharf"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            ***The NOAA Santa Barbara Station, 9411340, is located at Point
            Castillo, about 10 miles East of UCSB Campus Point. To see more data
            collected by the NOAA Santa Barbara Station click{" "}
            <a
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            Predictions for wave height(lighter), wind, and tide come from
            NOAA's tubular forecast. To see more information click{" "}
            <a
              target="_blank"
              href="https://marine.weather.gov/MapClick.php?w3=sfcwind&w3u=0&w10=swlp&w11=swlm&w12=swlp2&w13=swlm2&w14=wwh&w15=wvh&AheadHour=0&Submit=Submit&FcstType=digital&textField1=34.4001&textField2=-119.8461&site=all&unit=0&dd=&bw=&marine=1"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            Predictions for wave height(darker) and wave period come from the
            CDIP socal forecast model made by UCSD. To see more information
            click{" "}
            <a
              target="_blank"
              href="http://cdip.ucsd.edu/m/forecast/?wave_model=socal&layer=waveHs"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            Predictions for water temp come from the California ROMS forecast
            model made by UCLA. To see more information click{" "}
            <a
              target="_blank"
              href="https://catalog.data.gov/dataset/california-roms-forecast-3km"
            >
              here
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
