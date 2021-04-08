import React, { useState, useEffect } from "react"; //Used to set State variables
import Report from "../components/report.jsx"; //Report component
import Graphs from "../components/graphs.jsx"; //Graph component
import styles from "../styles/style.module.css"; //style sheet for layout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Used to add icons
import { faSync } from "@fortawesome/free-solid-svg-icons"; //Used to add icons
import { getRiseSet, setShadingPoints } from "../utils/sunRiseSet.js";
import getDate from "../utils/date.js";
import { getWaveReport, getWaveGraphs } from "../utils/wave.js";
import { getWindReport, getWindGraph } from "../utils/wind.js";
import { getTempReport, getTempGraph } from "../utils/temp.js";
import { getTideReport, getTideGraph } from "../utils/tide.js";

export default function HomePage() {
  //Report Variables
  const [dateReport, setDateReport] = useState(""); //Use state variables are React elements
  const [waveReport, setWaveReport] = useState(""); //that are set using their setter functions
  const [windReport, setWindReport] = useState(""); //and keep track of the state of the reports
  const [tempReport, setTempReport] = useState(""); //information that will be displayed
  const [tideReport, setTideReport] = useState("");
  const [rising, setRising] = useState(true);
  const [hiReport, setHiReport] = useState("");
  const [loReport, setLoReport] = useState(""); //This first set of varibles are for the top Report

  //Graph Varibales
  //Data
  const [waveRecord, setWaveRecord] = useState([]);
  const [waveForecastCDIP, setWaveForecastCDIP] = useState([]);
  const [waveForecastNOAA, setWaveForecastNOAA] = useState([]);
  const [windRecord, setWindRecord] = useState([]);
  const [windForecast, setWindForecast] = useState([]);
  const [periodRecord, setPeriodRecord] = useState([]);
  const [periodForecast, setPeriodForecast] = useState([]);
  const [tempRecord, setTempRecord] = useState([]);
  const [tempForecast, setTempForecast] = useState([]);
  const [tideRecord, setTideRecord] = useState([]);
  const [tideForecast, setTideForecast] = useState([]); //This set of varibles are the data for the Graphs
  //Labels
  const [wavePeriodDates, setWavePeriodDates] = useState([]);
  const [windDates, setWindDates] = useState([]);
  const [tempDates, setTempDates] = useState([]);
  const [tideDates, setTideDates] = useState([]); //This set of varibles are the Labels for the Graphs
  //Sun rise and set points for different graphs
  const [sunTimes, setSunTimes] = useState([]);
  const [sunPointsWaveWind, setSunPointsWaveWind] = useState([]);
  const [sunPointsTemp, setSunPointsTemp] = useState([]); //This set of varibles are used for setting the
  const [sunPointsTide, setSunPointsTide] = useState([]); //day/night shading on the Graphs

  //This set of useEffect functions are called when used useState varibles listed in the array at the end are updated
  //Each of these functions uses the data about sun rise and sun set in addition to graph data to set up where the
  //day/night shading begins and ends
  useEffect(
    () => {
      //If all of the data sets are not empty then run
      if (sunTimes.length !== 0 && waveRecord.length !== 0) {
        setSunPointsWaveWind(
          setShadingPoints(sunTimes, waveRecord, waveForecastCDIP)
        );
      }
    },
    [
      sunTimes,
      waveRecord,
      waveForecastCDIP,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  useEffect(
    () => {
      //If all of the data sets are not empty then run
      if (sunTimes.length !== 0 && tempRecord.length !== 0) {
        setSunPointsTemp(setShadingPoints(sunTimes, tempRecord, tempForecast));
      }
    },
    [
      sunTimes,
      tempRecord,
      tempForecast,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  useEffect(
    () => {
      //If all of the data sets are not empty then run
      if (sunTimes.length !== 0 && tideRecord.length !== 0) {
        setSunPointsTide(setShadingPoints(sunTimes, tideRecord, tideForecast));
      }
    },
    [
      sunTimes,
      tideRecord,
      tideForecast,
    ] /*Runs when any of these varibles are updated using their set functions*/
  );

  //function that calls all other functions for setting the data
  const updateReport = async () => {
    //Report
    setDateReport(await getDate());
    setWaveReport(await getWaveReport()); //set wave to the last wave height data point
    setWindReport(await getWindReport()); //set wind to the last wind speed data point
    setTempReport(await getTempReport()); //setting temp to last data point from request

    let tideData = await getTideReport();
    setTideReport(tideData.tide);
    setRising(tideData.rising);
    setHiReport(tideData.hi);
    setLoReport(tideData.lo);
  };

  const updateGraphs = async () => {
    //Sets sunrise and set times
    setSunTimes(await getRiseSet());

    //Graphs
    let waveGraphData = await getWaveGraphs();
    setWaveRecord(waveGraphData.waveRecord);
    setWaveForecastCDIP(waveGraphData.waveForecastCDIP);
    setWaveForecastNOAA(waveGraphData.waveForecastNOAA);
    setPeriodRecord(waveGraphData.periodRecord);
    setPeriodForecast(waveGraphData.periodForecast);
    setWavePeriodDates(waveGraphData.dateLabels);

    let windGraphData = await getWindGraph();
    setWindRecord(windGraphData.windRecord);
    setWindForecast(windGraphData.windForecast);
    setWindDates(windGraphData.dateLabels);

    let tideGraphData = await getTideGraph();
    setTideRecord(tideGraphData.tideRecord);
    setTideForecast(tideGraphData.tideForecast);
    setTideDates(tideGraphData.dateLabels);

    let tempGraphData = await getTempGraph();
    setTempRecord(tempGraphData.tempRecord);
    setTempForecast(tempGraphData.tempForecast);
    setTempDates(tempGraphData.dateLabels);
  };

  //This is the main function to run and it calls update once if the report data has not been set yet
  //Main purpose is to prevent the update from being called infite amount of times while data is trying to be set
  if (dateReport === "") {
    setDateReport(" ");
    updateReport();
    updateGraphs();
  }

  //This is what gets rendered on the page
  //It is a mix of html and javascript with {} used around js code
  //Mainly it loads a loading screen until all the report items are filled
  //Then it displays the report and graphs components with info disclaimers
  return (
    <div className={styles.page}>
      {dateReport === "" ||
      waveReport === "" ||
      windReport === "" ||
      tempReport === "" ||
      tideReport === "" ||
      hiReport === "" ||
      loReport === "" ? (
        <div>
          <FontAwesomeIcon className={styles.iconsLoading} icon={faSync} />
          <p>Loading Ocean Report</p>
        </div>
      ) : (
        <div>
          <p className={styles.disclaimer}>
            Click on any section of the report to see where that data was
            gathered from.
          </p>
          <Report
            date={dateReport}
            wave={waveReport}
            wind={windReport}
            temp={tempReport}
            tide={tideReport}
            rising={rising}
            hi={hiReport}
            lo={loReport}
          />
          <p className={styles.disclaimer}>
            Each graph shows a 3-Day history of the data with some graphs also
            showing the next 24 hours of predictions in a lighter shade.
          </p>
          <Graphs
            waveData={waveRecord}
            waveData2={waveForecastCDIP}
            waveData3={waveForecastNOAA}
            windData={windRecord}
            windData2={windForecast}
            periodData={periodRecord}
            periodData2={periodForecast}
            tempData={tempRecord}
            tempData2={tempForecast}
            tideData={tideRecord}
            tideData2={tideForecast}
            wavePeriodLabels={wavePeriodDates}
            windLabels={windDates}
            tempLabels={tempDates}
            tideLabels={tideDates}
            sunPointsWaveWind={sunPointsWaveWind}
            sunPointsTemp={sunPointsTemp}
            sunPointsTide={sunPointsTide}
          />
          <p className={styles.disclaimer}>
            *The UCSB SPOT Wave Buoy is located off 3/4 of a mile off of Campus
            Point and records real time wave, wind, and tempature data. To see
            more of its records click{" "}
            <a
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-0798"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            **The NOAA Santa Barbara Station, 9411340, is located at Point
            Castillo, about 10 miles East of UCSB Campus Point. To see more data
            collected by the NOAA Santa Barbara Station click{" "}
            <a
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            Predictions for wave height(lighter), wind, and tide come from
            NOAA's tubular forecast. To see more information click{" "}
            <a
              target="_blank"
              href="https://marine.weather.gov/MapClick.php?w3=sfcwind&w3u=0&w10=swlp&w11=swlm&w12=swlp2&w13=swlm2&w14=wwh&w15=wvh&AheadHour=0&Submit=Submit&FcstType=digital&textField1=34.4001&textField2=-119.8461&site=all&unit=0&dd=&bw=&marine=1"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            Predictions for wave height(darker) and wave period come from the
            CDIP socal forecast model made by UCSD. To see more information
            click{" "}
            <a
              target="_blank"
              href="http://cdip.ucsd.edu/m/forecast/?wave_model=socal&layer=waveHs"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            Predictions for water temp come from the California ROMS forecast
            model made by UCLA. To see more information click{" "}
            <a
              target="_blank"
              href="https://catalog.data.gov/dataset/california-roms-forecast-3km"
            >
              here
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
