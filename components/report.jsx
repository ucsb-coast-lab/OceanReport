import React, { useState, useEffect } from "react";

const linkDivStyle = {
  display: "inline-flex",
};

export default function Report() {
  const setup = () => {
    let date = "Monday, June 22 at 12:34 PM";
    let wave = "2.3 ft @ 7 secs from 253º";
    let wind = "Calm";
    let tide = "3.6 ft and falling";
    let hi = "2.6 ft @ 04:24 PM";
    let lo = "6.2 ft @ 10:42 PM";
    return { date, wave, wind, tide, hi, lo };
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
