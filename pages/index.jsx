import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Report from "../components/report.jsx";
import Graphs from "../components/graphs.jsx";
import styles from "../styles/style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const [date, setDate] = useState("");
  const [wave, setWave] = useState("");
  const [wind, setWind] = useState("");
  const [temp, setTemp] = useState("");
  const [tide, setTide] = useState("");
  const [rising, setRising] = useState(true);
  const [hi, setHi] = useState("");
  const [lo, setLo] = useState("");

  const [waveChart, setWaveChart] = useState([]);
  const [waveChart2, setWaveChart2] = useState([]);
  const [waveChart3, setWaveChart3] = useState([]);
  const [windChart, setWindChart] = useState([]);
  const [windChart2, setWindChart2] = useState([]);
  const [periodChart, setPeriodChart] = useState([]);
  const [periodChart2, setPeriodChart2] = useState([]);
  const [tempChart, setTempChart] = useState([]);
  const [tideChart, setTideChart] = useState([]);
  const [tideChart2, setTideChart2] = useState([]);

  const [waveDates, setWaveDates] = useState([]);
  const [windDates, setWindDates] = useState([]);
  const [tempDates, setTempDates] = useState([]);
  const [tideDates, setTideDates] = useState([]);

  useEffect(() => {
    if (date === "") getReport();
  });
  const getReport = async () => {
    const response = await fetch(`/api`, { method: "GET" });
    const data = await response.json();
    setDate(data.date);
    setWave(data.wave);
    setWind(data.wind);
    setTemp(data.temp);
    setTide(data.tide);
    setRising(data.rising);
    setHi(data.hi);
    setLo(data.lo);
  };

  return (
    <div className={styles.page}>
      {date === "" ||
      wave === "" ||
      wind === "" ||
      temp === "" ||
      tide === "" ||
      hi === "" ||
      lo === "" ? (
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
            date={date}
            wave={wave}
            wind={wind}
            temp={temp}
            tide={tide}
            rising={rising}
            hi={hi}
            lo={lo}
          />
          <p className={styles.disclaimer}>
            Each graph shows a 2-Day history of the data with some graphs also
            showing the next 24 hours of predictions in a lighter shade.
          </p>
          <Graphs
            waveData={waveChart}
            waveData2={waveChart2}
            waveData3={waveChart3}
            windData={windChart}
            windData2={windChart2}
            periodData={periodChart}
            periodData2={periodChart2}
            tempData={tempChart}
            tideData={tideChart}
            tideData2={tideChart2}
            waveLabels={waveDates}
            windLabels={windDates}
            tempLabels={tempDates}
            tideLabels={tideDates}
          />
          <p className={styles.disclaimer}>
            *The UCSB SPOT Wave Buoy is located off 3/4 of a mile off of Campus
            Point and records real time wave and wind data. To see more of its
            records click{" "}
            <a
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-0186"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            **The Sterns Wharf Automated Shore Station is run by SCCOOS and is
            located about 10 miles East of UCSB Campus Point. To see more data
            collected by the Stersn Wharf Automated Shore Station click{" "}
            <a
              target="_blank"
              href="https://www.sccoos.org/data/autoss/timeline/?main=single&station=stearns_wharf"
            >
              here
            </a>
          </p>
          <p className={styles.disclaimer}>
            ***The NOAA Santa Barbara Station, 9411340, is located at Point
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
        </div>
      )}
    </div>
  );
}
