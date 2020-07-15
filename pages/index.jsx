import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Report from "../components/report.jsx";
import Graphs from "../components/graphs.jsx";
import styles from "../styles/style.module.css";

export default function HomePage() {
  const [date, setDate] = useState("");
  const [wave, setWave] = useState("");
  const [wind, setWind] = useState("");
  const [temp, setTemp] = useState("");
  const [tide, setTide] = useState("");
  const [hi, setHi] = useState("");
  const [lo, setLo] = useState("");

  const [waveChart, setWaveChart] = useState([]);
  const [windChart, setWindChart] = useState([]);
  const [tempChart, setTempChart] = useState([]);
  const [tideChart, setTideChart] = useState([]);

  const [waveDates, setWaveDates] = useState([]);
  const [windDates, setWindDates] = useState([]);
  const [tempDates, setTempDates] = useState([]);
  const [tideDates, setTideDates] = useState([]);

  const current = new Date();
  let year = current.getFullYear();
  let month = current.getMonth() + 1;
  let m = "00" + month;
  m = m.substr(m.length - 2);
  let day = current.getDate();
  let d = "00" + day;
  d = d.substr(d.length - 2);
  const next = new Date(current);
  next.setDate(next.getDate() + 1);
  let year2 = next.getFullYear();
  let month2 = next.getMonth() + 1;
  let m2 = "00" + month2;
  m2 = m2.substr(m2.length - 2);
  let day2 = next.getDate();
  let d2 = "00" + day2;
  d2 = d2.substr(d2.length - 2);
  const prev = new Date(current);
  prev.setDate(prev.getDate() - 2);
  let year3 = prev.getFullYear();
  let month3 = prev.getMonth() + 1;
  let m3 = "00" + month3;
  m3 = m3.substr(m3.length - 2);
  let day3 = prev.getDate();
  let d3 = "00" + day3;
  d3 = d3.substr(d3.length - 2);

  const update = () => {
    setWindWave();
    setTempData();
    setTideData();
  };

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

  const setWindWave = async () => {
    var url =
      "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0186&limit=96&includeWindData=true";
    const response = await fetch(url, {
      method: "GET",
      headers: { token: process.env.SPOT_TOKEN },
    });
    const data = await response.json();

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
    const d = new Date(
      data.data.waves[data.data.waves.length - 1].timestamp.substring(0, 10)
    ).getDate();
    let time12 = new Date(
      data.data.waves[data.data.waves.length - 1].timestamp
    );
    currDate +=
      weekday +
      ", " +
      month +
      " " +
      (d + 1) +
      " at " +
      timeConv(time12.toString().substring(16, 21));
    setDate(currDate);

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
    setWave(wave);

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
    setWind(wind);

    let waveTime;
    let chartData = [];
    let dates = [];
    let i = 0;
    data.data.waves.map((wave) => {
      waveTime = new Date(wave.timestamp);
      chartData[i] = {
        x: waveTime.getTime(),
        y: round(wave.significantWaveHeight / 0.3048, 1),
      };
      dates[i] =
        waveTime.toString().substring(4, 10) +
        ", " +
        timeConv(waveTime.toString().substring(16, 21));
      i++;
    });
    setWaveDates(dates);
    setWaveChart(chartData);
    chartData = [];
    dates = [];
    i = 0;
    data.data.wind.map((wind) => {
      waveTime = new Date(wind.timestamp);
      chartData[i] = { x: waveTime.getTime(), y: round(wind.speed, 1) };
      dates[i] =
        waveTime.toString().substring(4, 10) +
        ", " +
        timeConv(waveTime.toString().substring(16, 21));
      i++;
    });
    setWindDates(dates);
    setWindChart(chartData);
  };

  const setTempData = async () => {
    let today = year.toString() + "-" + m + "-" + d;
    let daysAgo = year3.toString() + "-" + m3 + "-" + d3;

    var url =
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
    setTemp(temp);

    let tempData = [];
    let tempDate = [];
    let i = 0;
    data.table.rows.map((sample) => {
      let time = new Date(sample[0]);
      if (
        time.getTime() < current.getTime() &&
        time.getTime() > current.getTime() - 172800000
      ) {
        tempData[i] = {
          x: time.getTime(),
          y: round(sample[1] * (9.0 / 5.0) + 32, 1),
        };
        tempDate[i] =
          time.toString().substring(4, 10) +
          ", " +
          timeConv(time.toString().substring(16, 21));
        i++;
      }
    });
    setTempDates(tempDate);
    setTempChart(tempData);
  };

  const setTideData = async () => {
    let tomorrow = year2.toString() + m2 + d2;
    let daysAgo = year3.toString() + m3 + d3;

    var url =
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
    data.predictions.map((prediction) => {
      let time = new Date(
        prediction.t.substring(0, 10) +
          "T" +
          prediction.t.substring(11, 16) +
          ":00Z"
      );
      if (time.getTime() > current.getTime() && n_pred < 2) {
        t_pred[n_pred] = prediction;
        n_pred++;
      }
    });

    let first, second;
    if (t_pred[0].type === "H") {
      first = "HI ";
      second = "LO ";
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
    setHi(first);
    setLo(second);

    url =
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
    } else {
      currTide += "falling";
    }

    setTide(currTide);

    let tideData = [];
    let tideDate = [];
    let i = 0;
    data.predictions.map((prediction) => {
      let time = new Date(
        prediction.t.substring(0, 10) +
          "T" +
          prediction.t.substring(11, 16) +
          ":00Z"
      );
      if (
        time.getTime() < current.getTime() &&
        time.getTime() > current.getTime() - 172800000
      ) {
        tideData[i] = { x: time.getTime(), y: prediction.v };
        tideDate[i] =
          time.toString().substring(4, 10) +
          ", " +
          timeConv(time.toString().substring(16, 21));
        i++;
      }
    });
    setTideDates(tideDate);
    setTideChart(tideData);
  };

  if (date === "") {
    setDate(" ");
    update();
  }

  return (
    <div className={styles.page}>
      <Report
        date={date}
        wave={wave}
        wind={wind}
        temp={temp}
        tide={tide}
        hi={hi}
        lo={lo}
      />
      <Graphs
        waveData={waveChart}
        windData={windChart}
        tempData={tempChart}
        tideData={tideChart}
        waveLabels={waveDates}
        windLabels={windDates}
        tempLabels={tempDates}
        tideLabels={tideDates}
      />
    </div>
  );
}
