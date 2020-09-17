import React, { useState, useEffect } from "react"; //Used to set State variables
import fetch from "isomorphic-unfetch"; //Used to request data from external sources
import Report from "../components/report.jsx"; //Report component
import Graphs from "../components/graphs.jsx"; //Graph component
import styles from "../styles/style.module.css"; //style sheet for layout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Used to add icons
import { faSync } from "@fortawesome/free-solid-svg-icons"; //Used to add icons

export default function HomePage() {
  const [date, setDate] = useState(""); //Use state variables are React elements
  const [wave, setWave] = useState(""); //that are set using their setter functions
  const [wind, setWind] = useState(""); //and keep track of the state of the reports
  const [temp, setTemp] = useState(""); //information that will be displayed
  const [tide, setTide] = useState("");
  const [rising, setRising] = useState(true);
  const [hi, setHi] = useState("");
  const [lo, setLo] = useState(""); //This first set of varibles are for the top Report

  const [waveChart, setWaveChart] = useState([]);
  const [waveChart2, setWaveChart2] = useState([]);
  const [waveChart3, setWaveChart3] = useState([]);
  const [windChart, setWindChart] = useState([]);
  const [windChart2, setWindChart2] = useState([]);
  const [periodChart, setPeriodChart] = useState([]);
  const [periodChart2, setPeriodChart2] = useState([]);
  const [tempChart, setTempChart] = useState([]);
  const [tempChart2, setTempChart2] = useState([]);
  const [tideChart, setTideChart] = useState([]);
  const [tideChart2, setTideChart2] = useState([]); //This set of varibles are the data for the Graphs

  const [waveDates, setWaveDates] = useState([]);
  const [windDates, setWindDates] = useState([]);
  const [tempDates, setTempDates] = useState([]);
  const [tideDates, setTideDates] = useState([]); //This set of varibles are the Labels for the Graphs

  const [sunShading, setSunShading] = useState([]);
  const [sunPoints, setSunPoints] = useState([]);
  const [sunPoints2, setSunPoints2] = useState([]); //This set of varibles are used for setting the
  const [sunPoints3, setSunPoints3] = useState([]); //day/night shading on the Graphs

  const current = new Date(); //Datetime object set to today
  let year = current.getFullYear(); //current year  year.toString() gives you 4 digit year
  let month = current.getMonth() + 1;
  let m = "00" + month;
  m = m.substr(m.length - 2); //2 digit month
  let day = current.getDate();
  let d = "00" + day;
  d = d.substr(d.length - 2); //2 digit date

  const next = new Date(current); //Datetime object set to tomorrow
  next.setDate(next.getDate() + 1); //tomorrow's year  year2.toString() gives you 4 digit year
  let year2 = next.getFullYear();
  let month2 = next.getMonth() + 1;
  let m2 = "00" + month2;
  m2 = m2.substr(m2.length - 2); //2 digit month for tomorrow
  let day2 = next.getDate();
  let d2 = "00" + day2;
  d2 = d2.substr(d2.length - 2); //2 digit date for tomorrow

  const next2 = new Date(current); //Datetime object set to day after tomorrow
  next2.setDate(next2.getDate() + 2); //day after tomorrow's year  year4.toString() gives you 4 digit year
  let year4 = next2.getFullYear();
  let month4 = next2.getMonth() + 1;
  let m4 = "00" + month4;
  m4 = m4.substr(m4.length - 2); //2 digit month for day after tomorrow
  let day4 = next2.getDate();
  let d4 = "00" + day4;
  d4 = d4.substr(d4.length - 2); //2 digit date for day after tomorrow

  const prev = new Date(current); //Datetime object set to yesterday
  prev.setDate(prev.getDate() - 1); //yesterday's year  year5.toString() gives you 4 digit year
  let year5 = prev.getFullYear();
  let month5 = prev.getMonth() + 1;
  let m5 = "00" + month5;
  m5 = m5.substr(m5.length - 2); //2 digit month for yesterday
  let day5 = prev.getDate();
  let d5 = "00" + day5;
  d5 = d5.substr(d5.length - 2); //2 digit date for yesterday

  const prev2 = new Date(current); //Datetime object set to day before yesterday
  prev2.setDate(prev2.getDate() - 2); //day before yesterday's year  year3.toString() gives you 4 digit year
  let year3 = prev2.getFullYear();
  let month3 = prev2.getMonth() + 1;
  let m3 = "00" + month3;
  m3 = m3.substr(m3.length - 2); //2 digit month for day before yesterday
  let day3 = prev2.getDate();
  let d3 = "00" + day3;
  d3 = d3.substr(d3.length - 2); //2 digit date for day before yesterday

  //This set of useEffect functions are called when used useState varibles listed in the array at the end are updated
  //Each of these functions uses the data about sun rise and sun set in addition to graph data to set up where the
  //day/night shading begins and ends
  useEffect(
    () => {
      if (
        //If all of the data sets are not empty then run
        sunShading.length !== 0 &&
        waveChart.length !== 0 &&
        waveChart2.length !== 0
      ) {
        let shadePoints = [];
        let q = 0; //shadePoints array position
        let d = 1; //sunShading array position to 1 so we skip first sunrise
        if (waveChart[0].x < sunShading[0]) {
          //if the first sun rise is after the first data point
          d = 0; //set sunShading array position to 0 so first sunrise can be used
          shadePoints[0] = 0; //at night so set first shadePoint to first point
          q++;
        }
        for (var u = 0; u < waveChart.length; u++) {
          //loop through graph data
          if (waveChart[u].x > sunShading[d]) {
            //if the data point time is greater than the sunrise/sunset time
            shadePoints[q] = u; //set data point number as shadePoint
            q++;
            d++;
          }
        }
        for (u = u; u < waveChart2.length; u++) {
          //loop through graph data2
          if (waveChart2[u].x > sunShading[d]) {
            //if the data point time is greater than the sunrise/sunset time
            shadePoints[q] = u; //set data point number as shadePoint
            q++;
            d++;
          }
        }
        if (shadePoints.length === 6) {
          //if there are 6 shadePoint then add a 7th that is out of bounds so 4th shade box is hidden
          shadePoints[6] = 145;
        }
        setSunPoints(shadePoints); //use set function to set shadePoints
      }
    },
    [
      sunShading,
      waveChart,
      waveChart2,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  useEffect(
    () => {
      if (
        //If all of the data sets are not empty then run
        sunShading.length !== 0 &&
        tempChart.length !== 0 &&
        tempChart2.length !== 0
      ) {
        let shadePoints2 = [];
        let q = 0; //shadePoints array position
        let d = 1; //sunShading array position to 1 so we skip first sunrise
        if (tempChart[0].x < sunShading[0]) {
          //if the first sun rise is after the first data point
          d = 0; //set sunShading array position to 0 so first sunrise can be used
          shadePoints2[0] = 0; //at night so set first shadePoint to first point
          q++;
        }
        for (var u = 0; u < tempChart.length; u++) {
          //loop through graph data
          if (tempChart[u].x > sunShading[d]) {
            //if the data point time is greater than the sunrise/sunset time
            shadePoints2[q] = u; //set data point number as shadePoint
            q++;
            d++;
          }
        }
        for (u = u; u < tempChart2.length; u++) {
          //loop through graph data2
          if (tempChart2[u].x > sunShading[d]) {
            //if the data point time is greater than the sunrise/sunset time
            shadePoints2[q] = u; //set data point number as shadePoint
            q++;
            d++;
          }
        }
        if (shadePoints2.length === 6) {
          //if there are 6 shadePoint then add a 7th that is out of bounds so 4th shade box is hidden
          shadePoints2[6] = 1081;
        }
        setSunPoints2(shadePoints2); //use set function to set shadePoints2
      }
    },
    [
      sunShading,
      tempChart,
      tempChart2,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  useEffect(
    () => {
      if (
        //If all of the data sets are not empty then run
        sunShading.length !== 0 &&
        tideChart.length !== 0 &&
        tideChart2.length !== 0
      ) {
        let shadePoints3 = [];
        let q = 0; //shadePoints array position
        let d = 1; //sunShading array position to 1 so we skip first sunrise
        if (tideChart[0].x < sunShading[0]) {
          //if the first sun rise is after the first data point
          d = 0; //set sunShading array position to 0 so first sunrise can be used
          shadePoint3[0] = 0; //at night so set first shadePoint to first point
          q++;
        }
        for (var u = 0; u < tideChart.length; u++) {
          //loop through graph data
          if (tideChart[u].x > sunShading[d]) {
            //if the data point time is greater than the sunrise/sunset time
            shadePoints3[q] = u; //set data point number as shadePoint
            q++;
            d++;
          }
        }
        for (u = u; u < tideChart2.length; u++) {
          //loop through graph data2
          if (tideChart2[u].x > sunShading[d]) {
            //if the data point time is greater than the sunrise/sunset time
            shadePoints3[q] = u; //set data point number as shadePoint
            q++;
            d++;
          }
        }
        if (shadePoints3.length === 6) {
          //if there are 6 shadePoint then add a 7th that is out of bounds so 4th shade box is hidden
          shadePoints3[6] = 722;
        }
        setSunPoints3(shadePoints3); //use set function to set shadePoints3
      }
    },
    [
      sunShading,
      tideChart,
      tideChart2,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  const update = () => {
    //function that calls all other functions for setting the report data
    getRiseSet();
    setWindWave();
    setTempData();
    setTideData();
  };

  //this function is given a floating point number and an integer percision and returns that floating point number
  //rounded to however many percision points after the decimal
  function round(number, precision) {
    var shift = function (number, exponent) {
      var numArray = ("" + number).split("e");
      return +(
        numArray[0] +
        "e" +
        (numArray[1] ? +numArray[1] + exponent : exponent)
      );
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

  //this function converts any given time from 24hr to 12hr time and removes leading zeros
  function timeConv(time) {
    if (parseInt(time.substring(0, 2)) < 12) {
      time = time + " AM";
    } else {
      time = time + " PM";
    }
    if (time.substring(0, 2) === "00" || time.substring(0, 2) === "12") {
      time = "12" + time.substring(2, 8);
    } else {
      time = (parseInt(time.substring(0, 2)) % 12) + time.substring(2, 8);
    }
    return time;
  }

  //this function sets the sunShading with the times of the sunrises and sunsets starting 2-days ago through tomorrow
  const getRiseSet = async () => {
    var sunTimes = [];

    var url =
      "https://api.sunrise-sunset.org/json?lat=34.4001&lng=-119.8461&date=2 days ago";
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    let date = new Date(); //create new datetime object and set its hours, minutes, seconds and date for sunrise
    date.setHours(
      data.results.sunrise.substr(0, data.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7); //adjust to pacific time
    if (
      data.results.sunrise.substr(
        data.results.sunrise.length - 2,
        data.results.sunrise.length
      ) === "PM"
    ) {
      date.setHours(date.getHours() + 12); //if PM then adjust 12 hours forward
    }
    date.setMinutes(
      data.results.sunrise.substr(
        data.results.sunrise.indexOf(":") + 1,
        data.results.sunrise.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data.results.sunrise.substr(data.results.sunrise.length - 5, 2)
    );
    date.setDate(date.getDate() - 2); //adjust date from today to 2-days ago
    sunTimes[0] = date.getTime(); //set first sunrise

    date.setHours(
      //reset hours, minutes, seconds and date for sunset
      data.results.sunset.substr(0, data.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    date.setMinutes(
      data.results.sunset.substr(
        data.results.sunset.indexOf(":") + 1,
        data.results.sunset.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data.results.sunset.substr(data.results.sunset.length - 5, 2)
    );
    date.setDate(date.getDate() + 1); //adjust date because hours shifted it a day back
    sunTimes[1] = date.getTime(); //set first sunset

    //The same code repeats 3 more times for each consecutive day
    url =
      "https://api.sunrise-sunset.org/json?lat=34.4001&lng=-119.8461&date=yesterday";
    const response2 = await fetch(url, { method: "GET" });
    const data2 = await response2.json();
    date.setHours(
      data2.results.sunrise.substr(0, data2.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    if (
      data2.results.sunrise.substr(
        data2.results.sunrise.length - 2,
        data2.results.sunrise.length
      ) === "PM"
    )
      date.setHours(date.getHours() + 12);
    date.setMinutes(
      data2.results.sunrise.substr(
        data2.results.sunrise.indexOf(":") + 1,
        data2.results.sunrise.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data2.results.sunrise.substr(data2.results.sunrise.length - 5, 2)
    );
    date.setDate(date.getDate() + 1);
    sunTimes[2] = date.getTime();

    date.setHours(
      data2.results.sunset.substr(0, data2.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    date.setMinutes(
      data2.results.sunset.substr(
        data2.results.sunset.indexOf(":") + 1,
        data2.results.sunset.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data2.results.sunset.substr(data2.results.sunset.length - 5, 2)
    );
    date.setDate(date.getDate() + 1);
    sunTimes[3] = date.getTime();

    url =
      "https://api.sunrise-sunset.org/json?lat=34.4001&lng=-119.8461&date=today";
    const response3 = await fetch(url, { method: "GET" });
    const data3 = await response3.json();
    date.setHours(
      data3.results.sunrise.substr(0, data3.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    if (
      data3.results.sunrise.substr(
        data3.results.sunrise.length - 2,
        data3.results.sunrise.length
      ) === "PM"
    ) {
      date.setHours(date.getHours() + 12);
    }
    date.setMinutes(
      data3.results.sunrise.substr(
        data3.results.sunrise.indexOf(":") + 1,
        data3.results.sunrise.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data3.results.sunrise.substr(data3.results.sunrise.length - 5, 2)
    );
    date.setDate(date.getDate() + 1);
    sunTimes[4] = date.getTime();

    date.setHours(
      data3.results.sunset.substr(0, data3.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    date.setMinutes(
      data3.results.sunset.substr(
        data3.results.sunset.indexOf(":") + 1,
        data3.results.sunset.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data3.results.sunset.substr(data3.results.sunset.length - 5, 2)
    );
    date.setDate(date.getDate() + 1);
    sunTimes[5] = date.getTime();

    url =
      "https://api.sunrise-sunset.org/json?lat=34.4001&lng=-119.8461&date=tomorrow";
    const response4 = await fetch(url, { method: "GET" });
    const data4 = await response4.json();
    date.setHours(
      data4.results.sunrise.substr(0, data4.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    if (
      data4.results.sunrise.substr(
        data4.results.sunrise.length - 2,
        data4.results.sunrise.length
      ) === "PM"
    ) {
      date.setHours(date.getHours() + 12);
    }
    date.setMinutes(
      data4.results.sunrise.substr(
        data4.results.sunrise.indexOf(":") + 1,
        data4.results.sunrise.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data4.results.sunrise.substr(data4.results.sunrise.length - 5, 2)
    );
    date.setDate(date.getDate() + 1);
    sunTimes[6] = date.getTime();

    date.setHours(
      data4.results.sunset.substr(0, data4.results.sunrise.indexOf(":"))
    );
    date.setHours(date.getHours() - 7);
    date.setMinutes(
      data4.results.sunset.substr(
        data4.results.sunset.indexOf(":") + 1,
        data4.results.sunset.split(":", 2).join(":").length - 2
      )
    );
    date.setSeconds(
      data4.results.sunset.substr(data4.results.sunset.length - 5, 2)
    );
    date.setDate(date.getDate() + 1);
    sunTimes[7] = date.getTime();

    setSunShading(sunTimes);
  };

  //this function sets the wind and wave data for the report and graphs
  const setWindWave = async () => {
    var url =
      "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0186&limit=96&includeWindData=true";
    const response = await fetch(url, {
      method: "GET",
      headers: { token: process.env.SPOT_TOKEN },
    });
    const data = await response.json(); //data contains last 96 data records recorded by the SPOT wave buoy

    let currDate = "";
    const dayOfWeek = new Date().getDay();
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
    let time12 = new Date(
      data.data.waves[data.data.waves.length - 1].timestamp
    );
    currDate +=
      weekday +
      ", " +
      month +
      " " +
      day +
      " at " +
      timeConv(time12.toString().substring(16, 21));
    setDate(currDate); //Assembled date for report as last time the buoy recorded data

    let wave =
      round(
        data.data.waves[data.data.waves.length - 1].significantWaveHeight /
          0.3048,
        1
      ) +
      " ft @ " +
      round(data.data.waves[data.data.waves.length - 1].peakPeriod, 0) +
      " secs from " +
      round(data.data.waves[data.data.waves.length - 1].peakDirection, 0) +
      "º";
    setWave(wave); //set wave to the last wave height data point

    let wind;
    if (data.data.wind[data.data.wind.length - 1].speed < 2) {
      wind = "Calm";
    } else {
      let dir = "north";
      let theta = data.data.wind[data.data.wind.length - 1].direction;
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
        round(data.data.wind[data.data.wind.length - 1].speed, 0) +
        " kts";
    }
    setWind(wind); //set wind to the last wind speed data point

    //Setting up the Graph Data
    let waveTime; //time of wave currently being looked at
    let chartData = []; //Graph Wave Height Data
    let periodData = []; //Graph Wave Period Data
    let dates = []; //Labels
    let i = 0; //data position
    data.data.waves.map((wave) => {
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
    setWaveChart(chartData); //set wave height data
    setPeriodChart(periodData); //set wave period data

    url =
      "https://cors-anywhere.herokuapp.com/" + //cors proxy server, used when cors blocks fetch
      "https://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/model/MOP_alongshore/B0391_forecast.nc.ascii?waveTime[0:1:79],waveHs[0:1:79],waveTp[0:1:79]";
    const response2 = await fetch(url, { method: "GET" });
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
    setWaveChart2(chartData2); //Set second wave height data
    setPeriodChart2(periodData2); //Set second wave period data
    setWaveDates(dates); //Set Labels for these two graphs

    //Same process as above but with XML data, creating secondary predictions for wave height
    url =
      "https://cors-anywhere.herokuapp.com/" + //using cors proxy to stop unable to fetch from cors error
      "https://marine.weather.gov/MapClick.php?lat=34.4001&lon=-119.8461&FcstType=digitalDWML";
    const response3 = await fetch(url, { method: "GET" });
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
    setWaveChart3(chartData3);

    //Setting up wind data
    chartData = [];
    dates = [];
    i = 0;
    data.data.wind.map((wind) => {
      waveTime = new Date(wind.timestamp);
      chartData[i] = { x: waveTime.getTime(), y: round(wind.speed, 2) };
      dates[i] =
        waveTime.toString().substring(4, 10) +
        ", " +
        timeConv(waveTime.toString().substring(16, 21));
      i++;
    });
    setWindChart(chartData);

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
    setWindChart2(chartData2);
    setWindDates(dates);
  };

  //this function sets the tempature data for the report and graphs
  const setTempData = async () => {
    let today = year.toString() + "-" + m + "-" + d;
    let daysAgo = year3.toString() + "-" + m3 + "-" + d3;

    var url =
      "https://cors-anywhere.herokuapp.com/" + //cors proxy
      "https://erddap.sccoos.org/erddap/tabledap/autoss.json" +
      "?time%2Ctemperature&station=%22stearns_wharf" +
      "%22&time%3E=" +
      daysAgo +
      "T00%3A00%3A00Z&time%3C" +
      today +
      "T23%3A59%3A59Z&orderBy(%22time%22)";
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    let recent = data.table.rows.length - 1;
    let far = data.table.rows[recent][1] * (9.0 / 5.0) + 32;
    let temp = "Water Temp: " + round(far, 1) + " ºF";
    setTemp(temp); //setting temp to last data point from request

    let tempData = []; //graph data
    let tempDate = []; //labels
    let i = 0; //data position
    data.table.rows.map((sample) => {
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
    setTempChart(tempData);

    var url =
      "https://cors-anywhere.herokuapp.com/" + //cors proxy
      "http://west.rssoffice.com:8080/thredds/dodsC/roms/CA3km-forecast/CA/ca_subCA_fcst_" +
      year5.toString() +
      m5 +
      d5 +
      "03.nc.ascii?temp%5B0:1:69%5D%5B0:1:0%5D%5B103:1:103%5D%5B255:1:255%5D";
    const response2 = await fetch(url, { method: "GET" });
    const data2 = await response2.text(); //Data is a text and from the day before

    let tempData2 = [];
    tempData2[i - 1] = tempData[i - 1];
    let lastTemp = (tempData2[i - 1].y - 32) * (5.0 / 9.0);
    let lastTime = new Date(tempData2[i - 1].x); //set to last recorded temp time
    let temps = data2.substring(data2.indexOf("[21][0][0],") + 10); //skipping all the previous days data, should start on today at 00:00
    let count = 0;

    for (var k = 0; k < 49; k++) {
      //k is synced to the hours so k = 10 would be 10am, k = 34 would be 10am the next day
      let newTemp = temps.substring(2, temps.indexOf("\n")); //gets the next temp
      temps = temps.substring(temps.indexOf("\n"));
      temps = temps.substring(temps.indexOf(",")); //set up rest to be ready
      if (count < 24 && lastTime.getHours() < k) {
        //if there hasn't been 24 temps logged and k is greater than the last temp time
        count++;
        let t = new Date(current); //setup new date time to current time
        t.setHours(k - 1); //set hours to k-1
        t.setMinutes(0); //set rest to 0
        t.setSeconds(0);
        t.setMilliseconds(0);
        if (count === 1) {
          //if first then add only extra points needed
          t.setMinutes(lastTime.getMinutes());
          let divs = parseInt((60 - lastTime.getMinutes()) / 4) + 1;
          let drop = (parseFloat(lastTemp) - parseFloat(newTemp)) / divs;
          for (var g = 1; g < divs; g++) {
            t.setMinutes(t.getMinutes() + 4);
            tempData2[i] = {
              x: t.getTime(),
              y: round((parseFloat(lastTemp) - g * drop) * (9.0 / 5.0) + 32, 2),
            };
            tempDate[i] =
              t.toString().substring(4, 10) +
              ", " +
              timeConv(t.toString().substring(16, 21));
            i++;
          }
        } else {
          //else add 14 extra points at 4 minute increments
          let drop = (parseFloat(lastTemp) - parseFloat(newTemp)) / 15;
          for (var r = 1; r < 15; r++) {
            t.setMinutes(t.getMinutes() + 4);
            tempData2[i] = {
              x: t.getTime(),
              y: round((parseFloat(lastTemp) - r * drop) * (9.0 / 5.0) + 32, 2),
            };
            tempDate[i] =
              t.toString().substring(4, 10) +
              ", " +
              timeConv(t.toString().substring(16, 21));
            i++;
          }
        }
        //Add predicted temp data
        t.setHours(k);
        if (k > 24) {
          t.setDate(t.getDate() - 1);
        }
        t.setMinutes(0);
        tempData2[i] = {
          x: t.getTime(),
          y: round(parseFloat(newTemp) * (9.0 / 5.0) + 32, 2),
        };
        tempDate[i] =
          t.toString().substring(4, 10) +
          ", " +
          timeConv(t.toString().substring(16, 21));
        i++;
        lastTemp = newTemp;
        if (count === 24) {
          //add extra points after the last data point
          let extras = parseInt(lastTime.getMinutes() / 4);
          newTemp = temps.substring(2, temps.indexOf("\n"));
          let drop = (parseFloat(lastTemp) - parseFloat(newTemp)) / 15;
          for (var j = 1; j <= extras; j++) {
            t.setMinutes(t.getMinutes() + 4);
            tempData2[i] = {
              x: t.getTime(),
              y: round((parseFloat(lastTemp) - j * drop) * (9.0 / 5.0) + 32, 2),
            };
            tempDate[i] =
              t.toString().substring(4, 10) +
              ", " +
              timeConv(t.toString().substring(16, 21));
            i++;
          }
        }
      }
    }
    setTempDates(tempDate);
    setTempChart2(tempData2);
  };

  //this function sets the tide data for the report and graphs
  const setTideData = async () => {
    let tomorrow = year2.toString() + m2 + d2;
    let twoAhead = year4.toString() + m4 + d4;
    let daysAgo = year3.toString() + m3 + d3;

    //Setting hi and lo for report
    var url =
      "https://cors-anywhere.herokuapp.com/" + //cors proxy
      "https://tidesandcurrents.noaa.gov/api/datagetter?" +
      "station=9411340" +
      "&product=predictions" +
      "&datum=mllw" +
      "&units=english" +
      "&time_zone=gmt" +
      "&application=UCSB" +
      "&format=json" +
      "&interval=hilo" +
      "&begin_date=" +
      daysAgo +
      "&end_date=" +
      tomorrow;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    let t_pred = {};
    let n_pred = 0;
    let hiloTimes = [];
    let k = 0;

    data.predictions.map((prediction) => {
      //loops through predictions and puts each as prediction
      let time = new Date(
        prediction.t.substring(0, 10) +
          "T" +
          prediction.t.substring(11, 16) +
          ":00Z"
      );
      if (
        time.getTime() < current.getTime() + 86400000 &&
        time.getTime() > current.getTime() - 172800000
      ) {
        hiloTimes[k] = time; //recording hi and low time for 2-days ago through tomorrow for use in the graph
        k++;
      }
      if (time.getTime() > current.getTime() && n_pred < 2) {
        //gathering 2 data points that will be the next hi and low on the report
        t_pred[n_pred] = prediction;
        n_pred++;
      }
    });

    //This is where it is determined if the the tide is high or low and it sets the string to be displayed
    let first, second;
    if (t_pred[0].type === "H") {
      first = "HI: ";
      second = "LO: ";
    } else {
      first = "LO: ";
      second = "HI: ";
    }
    let height = round(parseFloat(t_pred[0].v), 1);
    let height2 = round(parseFloat(t_pred[1].v), 1);
    let time1 = new Date(
      t_pred[0].t.substring(0, 10) +
        "T" +
        t_pred[0].t.substring(11, 16) +
        ":00Z"
    );
    let time2 = new Date(
      t_pred[1].t.substring(0, 10) +
        "T" +
        t_pred[1].t.substring(11, 16) +
        ":00Z"
    );
    let t1 = timeConv(time1.toString().substring(16, 21));
    let t2 = timeConv(time2.toString().substring(16, 21));
    first += height + " ft @ " + t1;
    second += height2 + " ft @ " + t2;
    setHi(first); //hi and lo state variables don't necessarily contain the hi or lo
    setLo(second);

    //setting current tide for report
    url =
      "https://cors-anywhere.herokuapp.com/" + //using cors proxy to stop unable to fetch from cors error
      "https://tidesandcurrents.noaa.gov/api/datagetter?" +
      "station=9411340" +
      "&product=water_level" +
      "&datum=mllw" +
      "&units=english" +
      "&time_zone=gmt" +
      "&application=UCSB" +
      "&format=json" +
      "&date=latest";
    const response2 = await fetch(url, { method: "GET" });
    const data2 = await response2.json();

    let currTide =
      "Tide: " + round(parseFloat(data2.data[0].v), 1) + " ft and ";
    if (data2.data[0].v < t_pred[0].v) {
      currTide += "rising";
      setRising(true); //this variable is used during rendering to choose the right tide icon
    } else {
      currTide += "falling";
      setRising(false);
    }
    setTide(currTide);

    //setting tide graph data
    url =
      "https://cors-anywhere.herokuapp.com/" + //using cors proxy to stop unable to fetch from cors error
      "https://tidesandcurrents.noaa.gov/api/datagetter?" +
      "station=9411340" +
      "&product=predictions" +
      "&datum=mllw" +
      "&units=english" +
      "&time_zone=gmt" +
      "&application=UCSB" +
      "&format=json" +
      "&begin_date=" +
      daysAgo +
      "&end_date=" +
      twoAhead;
    const res = await fetch(url, { method: "GET" });
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
        time.getTime() > current.getTime() - 172800000
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
    setTideChart(tideData);
    setTideChart2(tideData2);
  };

  //This is the main function to run and it calls update once if the report data has not been set yet
  if (date === "") {
    setDate(" ");
    update();
  }

  //This is what gets rendered on the page
  //It is a mix of html and javascript with {} used around js code
  //Mainly it loads a loading screen until all the report items are filled
  //Then it displays the report and graphs components with info disclaimers
  return (
    <div className={styles.page}>
      {date === "" ||
      wave === "" ||
      wind === "" ||
      temp === "" ||
      tide === "" ||
      hi === "" ||
      lo === "" ? (
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
            date={date}
            wave={wave}
            wind={wind}
            temp={temp}
            tide={tide}
            rising={rising}
            hi={hi}
            lo={lo}
          />
          <p className={styles.disclaimer}>
            Each graph shows a 2-Day history of the data with some graphs also
            showing the next 24 hours of predictions in a lighter shade.
          </p>
          <Graphs
            waveData={waveChart}
            waveData2={waveChart2}
            waveData3={waveChart3}
            windData={windChart}
            windData2={windChart2}
            periodData={periodChart}
            periodData2={periodChart2}
            tempData={tempChart}
            tempData2={tempChart2}
            tideData={tideChart}
            tideData2={tideChart2}
            waveLabels={waveDates}
            windLabels={windDates}
            tempLabels={tempDates}
            tideLabels={tideDates}
            sun={sunPoints}
            sun2={sunPoints2}
            sun3={sunPoints3}
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
