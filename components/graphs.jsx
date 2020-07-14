import React from "react";
import { Line } from "react-chartjs-2";
import styles from "../styles/style.module.css";

export default function Graphs(props) {
  const wave = {
    labels: props.waveLabels,
    datasets: [
      {
        label: "Height (ft)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(30,144,255,1)",
        borderWidth: 1,
        pointRadius: 3,
        data: props.waveData,
      },
    ],
  };
  const wind = {
    labels: props.windLabels,
    datasets: [
      {
        label: "Speed (mph)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: props.windData,
      },
    ],
  };
  const temp = {
    labels: props.tempLabels,
    datasets: [
      {
        label: "Temp (ºF)",
        fill: false,
        lineTension: 0.8,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(255,0,0,1)",
        borderWidth: 1,
        pointRadius: 0.2,
        data: props.tempData,
      },
    ],
  };
  const tide = {
    labels: props.tideLabels,
    datasets: [
      {
        label: "Height",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(32,178,170,1)",
        borderWidth: 3,
        data: props.tideData,
      },
    ],
  };

  return (
    <div>
      <div className={styles.graph}>
        <Line
          data={wave}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "2-Day Wave Height (ft)",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 8,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 4,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className={styles.graph}>
        <Line
          data={temp}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "2-Day Water Temp (ºF)",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 8,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 4,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className={styles.graph}>
        <Line
          data={wind}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "2-Day Wind Speed (mph)",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 8,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 4,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className={styles.graph}>
        <Line
          data={tide}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "2-Day Tide Chart",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 6,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}
