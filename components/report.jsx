import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

const linkDivStyle = {
  display: "inline-flex",
};

export default function Report() {
  //const [{ date, wave, wind, tide, hi, lo }, setData] = useState(setup());
  const [date, setDate] = useState("");
  const [wave, setWave] = useState("");
  const [wind, setWind] = useState("");
  const [tide, setTide] = useState("");
  const [hi, setHi] = useState("");
  const [lo, setLo] = useState("");

  const update = () => {
    setWindWave();
    setTideData();
  };

  const setWindWave = async () => {
    var url =
      "https://api.sofarocean.com/api/latest-data?spotterId=SPOT-0186&limit=0&includeWindData=true";
    const response = await fetch(url, {
      method: "GET",
      headers: { token: "58d76bba4b8c64258a3b19bcafa6ff" },
    });
    const data = await response.json();

    let currDate = "The Latest Bouy Data Recorded on ";
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
      time12.toString().substring(15, 21);
    setDate(currDate);

    let wave =
      parseFloat(
        (data.data.waves[1].significantWaveHeight / 0.3048).toFixed(1)
      ) +
      " ft @ " +
      parseInt(data.data.waves[1].peakPeriod) +
      " secs from " +
      parseInt(data.data.waves[1].peakDirection.toFixed(0)) +
      "º";
    setWave(wave);

    let wind;
    if (data.data.wind[1].speed < 2) {
      wind = "Calm";
    } else {
      let dir = "north";
      let theta = data.data.wind[1].direction;
      if (theat >= 45 && theta < 135) {
        dir = "east";
      } else if (theta >= 135 && theta < 225) {
        dir = "south";
      } else if (theta >= 225 && theat < 315) {
        dir = "west";
      }
      wind =
        "From the " + dir + " at " + parseInt(data.data.wind[1].speed) + " kts";
    }
    setWind(wind);
  };

  const setTideData = async () => {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth() + 1;
    let m = "00" + month;
    m = m.substr(m.length - 2);
    let day = current.getDate();
    let d = "00" + day;
    d = d.substr(d.length - 2);
    let d2 = "00" + (day + 1);
    d2 = d2.substr(d2.length - 2);

    let today = year.toString() + m + d;
    let tomorrow = year.toString() + m + (day + 1).toString();

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
      let p_time =
        parseInt(prediction.t.substring(11, 13), 10) * 60 +
        parseInt(prediction.t.substring(14, 16));
      if (
        (p_time > curr_time || prediction.t.substr(8, 2) > day) &&
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
    first =
      first +
      t_pred[0].v.substring(0, t_pred[0].v.indexOf(".") + 2) +
      " ft @ " +
      t_pred[0].t.substring(11, 16);
    second =
      second +
      t_pred[1].v.substring(0, t_pred[1].v.indexOf(".") + 2) +
      " ft @ " +
      t_pred[1].t.substring(11, 16);
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
    //console.log(data2.data[0]);

    let currTide =
      "Tide: " +
      data2.data[0].v.substring(0, data2.data[0].v.indexOf(".") + 2) +
      " ft and ";
    if (data2.data[0].v < t_pred[0].v) {
      currTide += "rising";
    } else {
      currTide += "falling";
    }
    setTide(currTide);
  };

  if (date === "") {
    update();
  }

  return (
    <div>
      <h3>{date}</h3>
      <h2>{wave}</h2>
      <h2>{wind}</h2>
      <a href="coastlab.sofar.com">More Wave and Wind History Here</a>
      <h2>{tide}</h2>
      <h2>{hi}</h2>
      <h2>{lo}</h2>
      <a href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340">
        Tide Data Gathered From Here
      </a>
      <br></br>
      <button onClick={update}>Refreash Report</button>
    </div>
  );
}
