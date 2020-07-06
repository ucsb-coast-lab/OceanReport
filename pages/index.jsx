import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Report from "../components/report.jsx";
import Graphs from "../components/graphs.jsx";
import styles from "../styles/style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { controllers } from "chart.js";

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
    if (time.substring(0, 2) === "00" || time.substring(0, 2) === "12") {
      time = "12" + time.substring(2, 5);
    } else {
      time = (parseInt(time.substring(0, 2)) % 12) + time.substring(2, 5);
    }
    return time;
  }

  const setWindWave = async () => {
    var url =
      "https://api.sofarocean.com/api/latest-data?spotterId=SPOT-0186&limit=0&includeWindData=true";
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
    const d = new Date(data.data.waves[1].timestamp.substring(0, 10)).getDate();
    let time12 = new Date(data.data.waves[1].timestamp);
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
      round(data.data.waves[1].significantWaveHeight / 0.3048, 1) +
      " ft @ " +
      parseInt(data.data.waves[1].peakPeriod) +
      " secs from " +
      round(data.data.waves[1].peakDirection, 0) +
      "º";
    setWave(wave);

    let wind;
    if (data.data.wind[1].speed < 2) {
      wind = "Calm";
    } else {
      let dir = "north";
      let theta = data.data.wind[1].direction;
      if (theta >= 45 && theta < 135) {
        dir = "east";
      } else if (theta >= 135 && theta < 225) {
        dir = "south";
      } else if (theta >= 225 && theta < 315) {
        dir = "west";
      }
      wind =
        "From the " + dir + " at " + parseInt(data.data.wind[1].speed) + " kts";
    }
    setWind(wind);

    url =
      "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0186&limit=96&includeWindData=true";
    const response2 = await fetch(url, {
      method: "GET",
      headers: { token: process.env.SPOT_TOKEN },
    });
    const data2 = await response2.json();
    let waveTime;
    let chartData = [];
    let point;
    let i = 0;
    data2.data.waves.map((wave) => {
      waveTime = new Date(wave.timestamp);
      point = { x: waveTime.getTime(), y: wave.significantWaveHeight / 0.3048 };
      chartData[i] = point;
      i++;
    });
    setWaveChart(chartData);
    chartData = [];
    i = 0;
    data2.data.wind.map((wind) => {
      waveTime = new Date(wind.timestamp);
      point = { x: waveTime.getTime(), y: wind.speed };
      chartData[i] = point;
      i++;
    });
    setWindChart(chartData);
  };

  const setTempData = async () => {
    var url =
      "https://erddap.sccoos.org/erddap/tabledap/autoss.json" +
      "?time%2Ctemperature&station=%22stearns_wharf" +
      "%22&time%3E=2020-07-01T07%3A00%3A00Z&time%3C2020-07-03T06%3A59%3A59Z&orderByMax(%22time%22)";
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    let far = data.table.rows[0][1] * (9.0 / 5.0) + 32;
    let temp = "Water Temp: " + round(far, 1) + " ºF";
    setTemp(temp);

    url =
      "https://erddap.sccoos.org/erddap/tabledap/autoss.json" +
      "?time%2Ctemperature&station=%22stearns_wharf" +
      "%22&time%3E=2020-07-01T07%3A00%3A00Z&time%3C2020-07-03T06%3A59%3A59Z&orderByMax(%22time%22)";
    const response2 = await fetch(url, { method: "GET" });
    const data2 = await response2.json();
    //console.log(data2);
  };

  const setTideData = async () => {
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

    let today = year.toString() + m + d;
    let tomorrow = year2.toString() + m2 + d2;
    let daysAgo = year3.toString() + m3 + d3;
    console.log(daysAgo);

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
      today +
      "&end_date=" +
      tomorrow;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    let t_pred = {};
    let n_pred = 0;
    let curr_time = current.getHours() * 60 + current.getMinutes();
    data.predictions.map((prediction) => {
      let time = new Date(prediction.t + " UTC");
      let p_time =
        parseInt(time.toString().substring(16, 18), 10) * 60 +
        parseInt(time.toString().substring(19, 21));

      if (
        ((parseInt(time.toString().substring(8, 11)) === day &&
          p_time > curr_time) ||
          parseInt(time.toString().substring(8, 11)) === day2) &&
        n_pred < 2
      ) {
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
    let time1 = new Date(t_pred[0].t + " UTC");
    let time2 = new Date(t_pred[1].t + " UTC");
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

    url =
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
    const response3 = await fetch(url, { method: "GET" });
    const data3 = await response3.json();
    console.log(data3);
    let tideData = [];
    let i = 0;
    data3.predictions.map((prediction) => {
      let time = new Date(prediction.t + " UTC");
      if (
        time.getTime() < current.getTime() &&
        time.getTime() > current.getTime() - 172800000
      ) {
        let point = { x: time.getTime(), y: prediction.v };
        tideData[i] = point;
        i++;
      }
    });
    console.log(tideData);
    setTideChart(tideData);
  };

  if (date === "") {
    setDate(" ");
    update();
  }

  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
        <div className={styles.dateTitleBox}>
          <a className={styles.title} href="https://coastlab.eri.ucsb.edu/">
            UCSB COAST Lab Ocean Report
          </a>
          <div className={styles.date}>
            <FontAwesomeIcon
              className={styles.iconsWhite}
              icon={faCalendarDay}
            />
            <p>{date}</p>
          </div>
        </div>
        <div className={styles.report}>
          <Report
            wave={wave}
            wind={wind}
            temp={temp}
            tide={tide}
            hi={hi}
            lo={lo}
          />
        </div>
      </div>
      <div className={styles.navbarBox}></div>

      <div className={styles.content}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <div className={styles.graphs}>
            <Graphs
              waveData={waveChart}
              windData={windChart}
              tideData={tideChart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
