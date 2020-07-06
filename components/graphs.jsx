import React from "react";
import styles from "../styles/style.module.css";
import ChartistGraph from "react-chartist";
import { Line } from "react-chartjs-2";

export default function Graphs(props) {
  const state = {
    labels: [
      "2-Days Ago",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "1-Day Ago",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Now",
    ],
    datasets: [
      {
        label: "Waves",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(0,0,255,1)",
        borderWidth: 1,
        pointRadius: 3,
        data: props.waveData,
      },
      {
        label: "Wind",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(0,255,0,1)",
        borderWidth: 1,
        data: props.windData,
      },
      {
        label: "Temp",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(255,0,0,1)",
        borderWidth: 1,
        data: props.windData,
      },
    ],
  };
  const state2 = {
    labels: ["2-Days Ago", "", "", "1-Day Ago", "", "", "Now"],
    datasets: [
      {
        label: "Tide",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(100,100,255,1)",
        borderWidth: 1,
        data: props.tideData,
      },
    ],
  };

  // var WaveData = {
  //   labels: ["2-Days Ago", "1-Day Ago", "Now"],
  //   series: [props.waveData],
  // };

  // var WindData = {
  //   series: [props.windData],
  // };

  // var TempData = {
  //   labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  //   series: [[4, 3, 2, 1, 0]],
  // };

  // var TideData = {
  //   labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  //   series: [[4, 3, 2, 1, 0]],
  // };

  // var options = {
  //   width: "50vw",
  //   height: "30vh",
  //   low: 0,
  //   high: 10,
  //   showPoint: false,
  //   fullWidth: true
  //   // axisX: {
  //   //   labelInterpolationFnc: function(value) {

  //   //     return 'hi' + value;
  //   //   }
  //   // }
  // };

  // let type = "Line";

  // <h1>2-Day Wave Height Chart</h1>
  // <ChartistGraph className={styles.graph} data={WaveData} options={options} type={type} />
  // <h1>2-Day Wind Chart</h1>
  // <ChartistGraph data={WindData} options={options} type={type} />
  // <h1>2-Day Water Temp Chart</h1>
  // <ChartistGraph data={TempData} options={options} type={type} />
  // <h1>2-Day Tide Chart</h1>
  // <ChartistGraph data={TideData} options={options} type={type} />

  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "2-Day Ocean Chart",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
          xAxes: {
            type: "time",
            ticks: {
              autoSkip: true,
              maxTicksLimit: 3,
            },
          },
        }}
      />
      <Line
        data={state2}
        options={{
          title: {
            display: true,
            text: "2-Day Tide Chart",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
          xAxes: {
            type: "time",
            ticks: {
              autoSkip: true,
              maxTicksLimit: 3,
            },
          },
        }}
      />
    </div>
  );
}
