import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
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
        label: "CDIP (ft)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(120, 188, 255,1)",
        borderColor: "rgba(120, 188, 255,1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.waveData2,
      },
      {
        label: "NOAA (ft)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(166, 210, 255,1)",
        borderColor: "rgba(166, 210, 255, 1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.waveData3,
      },
    ],
  };
  const period = {
    labels: props.waveLabels,
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
      {
        label: "CDIP (s)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(0,111,222,1)",
        borderColor: "rgba(0,111,222,1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.periodData2,
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
      {
        label: "NOAA (mph)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(112,112,112,1)",
        borderColor: "rgba(112,112,112,1)",
        borderWidth: 1,
        pointRadius: 2,
        data: props.windData2,
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
              display: true,
              position: "bottom",
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12,
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
            annotation: {
              annotations: [
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[0],
                  xMax: props.sun[1],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[2],
                  xMax: props.sun[3],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[4],
                  xMax: props.sun[5],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[6],
                  xMax: 145,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: props.waveData.length - 1,
                  borderColor: "red",
                  borderWidth: 2,
                  label: {
                    backgroundColor: "rgba(0,0,0,0)",
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    fontStyle: "bold",
                    fontColor: "#000",
                    xPadding: 5,
                    yPadding: 5,
                    cornerRadius: 5,
                    position: "top",
                    xAdjust: 17,
                    yAdjust: 0,
                    enabled: true,
                    content: "Latest",
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
            annotation: {
              annotations: [
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[0],
                  xMax: props.sun[1],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[2],
                  xMax: props.sun[3],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[4],
                  xMax: props.sun[5],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[6],
                  xMax: 145,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: props.periodData.length - 1,
                  borderColor: "red",
                  borderWidth: 2,
                  label: {
                    backgroundColor: "rgba(0,0,0,0)",
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    fontStyle: "bold",
                    fontColor: "#000",
                    xPadding: 5,
                    yPadding: 5,
                    cornerRadius: 5,
                    position: "top",
                    xAdjust: 17,
                    yAdjust: 0,
                    enabled: true,
                    content: "Latest",
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
            annotation: {
              annotations: [
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[0],
                  xMax: props.sun[1],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[2],
                  xMax: props.sun[3],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[4],
                  xMax: props.sun[5],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun[6],
                  xMax: 145,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: props.windData.length - 1,
                  borderColor: "red",
                  borderWidth: 2,
                  label: {
                    backgroundColor: "rgba(0,0,0,0)",
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    fontStyle: "bold",
                    fontColor: "#000",
                    xPadding: 5,
                    yPadding: 5,
                    cornerRadius: 5,
                    position: "top",
                    xAdjust: 17,
                    yAdjust: 0,
                    enabled: true,
                    content: "Latest",
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
                      "**Data from Stern Wharf Automated Shore Station",
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
            annotation: {
              annotations: [
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun2[0],
                  xMax: props.sun2[1],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun2[2],
                  xMax: props.sun2[3],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                // {
                //   type: 'box',
                //   xScaleID: 'x-axis-0',
                //   xMin: props.sun2[4],
                //   xMax: props.sun2[5],
                //   borderColor: 'rgba(0, 0, 0, 0.1)',
                //   borderWidth: 0,
                //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
                // }
                // {
                //   type: 'box',
                //   xScaleID: 'x-axis-0',
                //   xMin: props.sun2[6],
                //   xMax: 1024,
                //   borderColor: 'rgba(0, 0, 0, 0.1)',
                //   borderWidth: 0,
                //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
                // }
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: props.tempData.length - 1,
                  borderColor: "red",
                  borderWidth: 2,
                  label: {
                    backgroundColor: "rgba(0,0,0,0)",
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    fontStyle: "bold",
                    fontColor: "#000",
                    xPadding: 5,
                    yPadding: 5,
                    cornerRadius: 5,
                    position: "top",
                    xAdjust: 17,
                    yAdjust: 0,
                    enabled: true,
                    content: "Latest",
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
            annotation: {
              annotations: [
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun3[0],
                  xMax: props.sun3[1],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun3[2],
                  xMax: props.sun3[3],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun3[4],
                  xMax: props.sun3[5],
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "box",
                  xScaleID: "x-axis-0",
                  xMin: props.sun3[6],
                  xMax: 722,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: props.tideData.length - 1,
                  borderColor: "red",
                  borderWidth: 2,
                  label: {
                    backgroundColor: "rgba(0,0,0,0)",
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    fontStyle: "bold",
                    fontColor: "#000",
                    xPadding: 5,
                    yPadding: 5,
                    cornerRadius: 5,
                    position: "top",
                    xAdjust: 17,
                    yAdjust: 0,
                    enabled: true,
                    content: "Latest",
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
