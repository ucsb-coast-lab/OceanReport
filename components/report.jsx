import React, { useState, useEffect } from "react";

const linkDivStyle = {
  display: "inline-flex",
};

export default function Report() {
  const [{ date, wave, wind, tide, hi, lo }, setData] = useState({
    date: "",
    wave: "",
    wind: "",
    tide: "",
    hi: "",
    lo: "",
  });

  const update = () => {
    setData({
      date: "today",
      wave: "3ft",
      wind: "4knots",
      tide: "2ft and rising",
      hi: "5.7ft",
      lo: "1.2ft",
    });
  };

  return (
    <div>
      <h2>Conditions last updated: {date}</h2>
      <h2>Wave height and period: {wave}</h2>
      <h2>Wind speed and direction: {wind}</h2>
      <h2>Tide: {tide}</h2>
      <h2>Latest High Tide: {hi}</h2>
      <h2>Latest Low Tide: {lo}</h2>
      <a href="coastlab.sofar.com">More Wave History Here</a>
      <button onClick={update}>Refreash Report</button>
    </div>
  );
}
