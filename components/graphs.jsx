import React from "react";
import styles from "../styles/style.module.css";
//imports below are used to draw the graphs using chartjs
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";

export default function Graphs(props) {
  //each graph has its own varibale containing labels and data sets to graph
  const wave = {
    labels: props.wavePeriodLabels, //Labels
    datasets: [
      //Array of data sets
      {
        label: "Height (ft)", //Label next to data points when hovering over them
        fill: false, //fill under graph
        lineTension: 0.5, //how string or curved the lines are
        backgroundColor: "rgba(30,144,255,1)", //color of points
        borderColor: "rgba(30,144,255,1)", //color around points
        borderWidth: 1, //border size
        pointRadius: 2, //point size
        data: props.waveData, //passing in Data array
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
    labels: props.wavePeriodLabels, //Labels
    datasets: [
      //Array of Data sets
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
    labels: props.windLabels, //Labels
    datasets: [
      //Array of Data sets
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
    labels: props.tempLabels, //Labels
    datasets: [
      //Array of Data sets
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
      {
        label: "ROMS (ºF)",
        fill: false,
        lineTension: 0.8,
        backgroundColor: "rgba(255,170,170,1)",
        borderColor: "rgba(255,170,170,1)",
        borderWidth: 1,
        pointRadius: 0.2,
        data: props.tempData2,
      },
    ],
  };
  const tide = {
    labels: props.tideLabels, //Labels
    datasets: [
      //Array of Data sets
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

  //Each Graph has its own Line component with options
  //the main options chnaged were the xAxes labels and annotations
  //xAxes are auto set with a limit expect for tide, tide uses a function to only display labels that are not undefined
  //Annotations have 4 boxes and a line for all, only 3 boxes will be displayed unless the report is loaded after sunset
  //Each of the boxes are used to show day/night and the line shows the latest data
  return (
    <div>
      {wave.datasets[0].data.length ? (
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
                    xMin: props.sunPointsWaveWind[0],
                    xMax: props.sunPointsWaveWind[1],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[2],
                    xMax: props.sunPointsWaveWind[3],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[4],
                    xMax: props.sunPointsWaveWind[5],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[6],
                    xMax: props.sunPointsWaveWind[7],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[8],
                    xMax: props.sunPointsWaveWind[9],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: props.waveData.length - 1,
                    borderColor: "rgba(255,0,0,.6)",
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
      ) : (
        <h3>
          Error retrieving wave graph data. Please refresh the page or check
          back later.
        </h3>
      )}
      {period.datasets[0].data.length ? (
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
                    xMin: props.sunPointsWaveWind[0],
                    xMax: props.sunPointsWaveWind[1],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[2],
                    xMax: props.sunPointsWaveWind[3],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[4],
                    xMax: props.sunPointsWaveWind[5],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[6],
                    xMax: props.sunPointsWaveWind[7],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[8],
                    xMax: props.sunPointsWaveWind[9],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: props.periodData.length - 1,
                    borderColor: "rgba(255,0,0,.6)",
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
      ) : (
        <h3>
          Error retrieving period graph data. Please refresh the page or check
          back later.
        </h3>
      )}
      {wind.datasets[0].data.length ? (
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
                    xMin: props.sunPointsWaveWind[0],
                    xMax: props.sunPointsWaveWind[1],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[2],
                    xMax: props.sunPointsWaveWind[3],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[4],
                    xMax: props.sunPointsWaveWind[5],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[6],
                    xMax: props.sunPointsWaveWind[7],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsWaveWind[8],
                    xMax: props.sunPointsWaveWind[9],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: props.windData.length - 1,
                    borderColor: "rgba(255,0,0,.6)",
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
      ) : (
        <h3>
          Error retrieving wind graph data. Please refresh the page or check
          back later.
        </h3>
      )}
      {temp.datasets[0].data.length ? (
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
                    xMin: props.sunPointsTemp[0],
                    xMax: props.sunPointsTemp[1],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTemp[2],
                    xMax: props.sunPointsTemp[3],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTemp[4],
                    xMax: props.sunPointsTemp[5],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTemp[6],
                    xMax: props.sunPointsTemp[7],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTemp[8],
                    xMax: props.sunPointsTemp[9],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: props.tempData.length - 1,
                    borderColor: "rgba(255,0,0,.6)",
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
      ) : (
        <h3>
          Error retrieving tempature graph data. Please refresh the page or
          check back later.
        </h3>
      )}
      {tide.datasets[0].data.length ? (
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
                        /*function used to only display labels with text in them*/
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
                        "**Data from NOAA Santa Barbara Station, 9411340",
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
                    xMin: props.sunPointsTide[0],
                    xMax: props.sunPointsTide[1],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTide[2],
                    xMax: props.sunPointsTide[3],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTide[4],
                    xMax: props.sunPointsTide[5],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTide[6],
                    xMax: props.sunPointsTide[7],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "box",
                    xScaleID: "x-axis-0",
                    xMin: props.sunPointsTide[8],
                    xMax: props.sunPointsTide[9],
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderWidth: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: props.tideData.length - 1,
                    borderColor: "rgba(255,0,0,.6)",
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
      ) : (
        <h3>
          Error retrieving tide graph data. Please refresh the page or check
          back later.
        </h3>
      )}
    </div>
  );
}
