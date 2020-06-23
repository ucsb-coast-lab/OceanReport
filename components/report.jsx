import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

const linkDivStyle = {
  display: "inline-flex",
};

export default function Report() {
  const setup = () => {
    //let windWavePred = getWindWave();
    let tidePred = getTide();

    let date = "Monday, June 22 at 12:34 PM";
    let wave = "2.3 ft @ 7 secs from 253º";
    let wind = "Calm";
    let tide = "3.6 ft and falling";
    let hi = "2.6 ft @ 04:24 PM";
    let lo = "6.2 ft @ 10:42 PM";
    return { date, wave, wind, tide, hi, lo };
  };

  const getWindWave = async () => {
    const response = await fetch(`/api`, { method: "GET" });
    // let parameters = {'spotterId': 'SPOT-0186', 'limit': '0', 'includeWindData':'true'};
    // var spotterResponse = fetch('https://api.sofarocean.com/api/latest-data',
    //   headers={'token': '58d76bba4b8c64258a3b19bcafa6ff'},
    //   params=parameters);
    // console.log(spotterResponse);
  };

  const getTide = async () => {
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
      "https://tidesandcurrents.noaa.gov/api/datagetter?station=9411340&product=predictions&datum=mllw&units=english&time_zone=gmt&application=UCSB&format=json&interval=hilo&begin_date=" +
      today +
      "&end_date=" +
      tomorrow;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    console.log(data);

    let t_pred = {};
    let n_pred = 0;
    data.predictions.map((prediction) => {
      if (prediction.t && n_pred < 2) {
        t_pred[n_pred] = prediction;
        n_pred++;
      }
    });
    console.log(t_pred);
    return t_pred;
  };

  const [{ date, wave, wind, tide, hi, lo }, setData] = useState(setup());

  const update = () => {
    setData(setup());
  };

  return (
    <div>
      <h2>Conditions last updated: {date}</h2>
      <h2>Wave height and period: {wave}</h2>
      <h2>Wind speed and direction: {wind}</h2>
      <h2>Tide: {tide}</h2>
      <h2>Next High Tide: {hi}</h2>
      <h2>Next Low Tide: {lo}</h2>
      <a href="coastlab.sofar.com">More Wave History Here</a>
      <button onClick={update}>Refreash Report</button>
    </div>
  );
}
