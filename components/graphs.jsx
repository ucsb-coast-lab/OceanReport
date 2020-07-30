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
        backgroundColor: "rgba(30,144,255,1)",
        borderColor: "rgba(30,144,255,1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.waveData,
      },
      {
        label: "Height (ft) ",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(120, 188, 255,1)",
        borderColor: "rgba(120, 188, 255,1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.waveData2,
      },
    ],
  };
  const period = {
    labels: props.windLabels,
    datasets: [
      {
        label: "(s)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(0,75,150,1)",
        borderColor: "rgba(0,75,150,1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.periodData,
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
        backgroundColor: "rgba(0,0,0,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        pointRadius: 2,
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
        backgroundColor: "rgba(255,0,0,1)",
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
        lineTension: 0.4,
        backgroundColor: "rgba(32,178,170,1)",
        borderColor: "rgba(32,178,170,1)",
        borderWidth: 2,
        pointRadius: 1,
        data: props.tideData,
      },
      {
        label: "Height ",
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(133, 230, 225, 1)",
        borderColor: "rgba(133, 230, 225, 1)",
        borderWidth: 2,
        pointRadius: 1,
        data: props.tideData2,
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
              text: "3-Day Wave Height (ft)",
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
                    maxRotation: 90,
                    minRotation: 90,
                    fontSize: 10,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "*Data from UCSB Wave Buoy",
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
          data={period}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "3-Day Wave Period (s)",
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
                    maxRotation: 90,
                    minRotation: 90,
                    fontSize: 10,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "*Data from UCSB Wave Buoy",
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
              text: "3-Day Wind Speed (mph)",
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
                    maxRotation: 90,
                    minRotation: 90,
                    fontSize: 10,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "*Data from UCSB Wave Buoy",
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
              text: "3-Day Water Temp (ºF)",
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
                    maxRotation: 90,
                    minRotation: 90,
                    fontSize: 10,
                  },
                  scaleLabel: {
                    display: true,
                    labelString:
                      "**Data from the SCCOOS, Stern Wharf Automated Shore Station",
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
      <div className={styles.tide}>
        <Line
          data={tide}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "3-Day Tide Chart",
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
                    autoSkip: false,
                    callback: function (value, index, values) {
                      if (value !== "") {
                        return value;
                      }
                    },
                    maxRotation: 90,
                    minRotation: 90,
                    fontSize: 10,
                  },
                  gridLines: {
                    display: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString:
                      "***Data from NOAA Santa Barbara Station, 9411340",
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 6,
                  },
                  gridLines: {
                    zeroLineWidth: 2,
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
