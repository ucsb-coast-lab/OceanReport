import React, { useState, useEffect } from "react";
import styles from "../styles/style.module.css";
import ChartistGraph from "react-chartist";

export default function Graphs() {
  var WaveData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [[3.5, 2.2, 2.7, 1.3, 0.6]],
  };

  var WindData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [[4, 3, 2, 1, 0]],
  };

  var TempData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [[4, 3, 2, 1, 0]],
  };

  var TideData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [[4, 3, 2, 1, 0]],
  };

  var options = {
    width: "200px",
    height: "100px",
  };

  let type = "Line";

  return (
    <div>
      <h1>2-Day Wave Height Chart</h1>
      <ChartistGraph data={WaveData} options={options} type={type} />
      <h1>2-Day Wind Chart</h1>
      <ChartistGraph data={WindData} options={options} type={type} />
      <h1>2-Day Water Temp Chart</h1>
      <ChartistGraph data={TempData} options={options} type={type} />
      <h1>2-Day Tide Chart</h1>
      <ChartistGraph data={TideData} options={options} type={type} />
    </div>
  );
}
