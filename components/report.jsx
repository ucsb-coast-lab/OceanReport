import React from "react";
import styles from "../styles/style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";

export default function Report(props) {
  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <FontAwesomeIcon className={styles.iconsBlue} icon={faWater} />
        <a
          className={styles.links}
          href="https://coastlab.sofarocean.com/historical/SPOT-0186"
        >
          {props.wave}
        </a>
      </div>
      <div className={styles.row}>
        <FontAwesomeIcon className={styles.iconsRed} icon={faThermometerHalf} />
        <a className={styles.links} href="https://www.sccoos.org/data/autoss/">
          {props.temp}
        </a>
      </div>
      <div className={styles.row}>
        <FontAwesomeIcon className={styles.iconsWhite} icon={faWind} />
        <a
          className={styles.links}
          href="https://coastlab.sofarocean.com/historical/SPOT-0186"
        >
          {props.wind}
        </a>
      </div>
      <div className={styles.row}>
        {props.tide.substring(17, 18) === "r" ||
        props.tide.substring(18, 19) === "r" ? (
          <FontAwesomeIcon
            className={styles.iconsGreen}
            icon={faAngleDoubleUp}
          />
        ) : (
          <FontAwesomeIcon
            className={styles.iconsGreen}
            icon={faAngleDoubleDown}
          />
        )}
        <a
          className={styles.links}
          href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
        >
          {props.tide}
        </a>
      </div>
      <div className={styles.row}>
        {props.hi.substring(0, 2) === "HI" ? (
          <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleDown} />
        )}
        <a
          className={styles.links}
          href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
        >
          {props.hi}
        </a>
      </div>
      <div className={styles.row}>
        {props.lo.substring(0, 2) === "HI" ? (
          <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleDown} />
        )}
        <a
          className={styles.links}
          href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
        >
          {props.lo}
        </a>
      </div>
    </div>
  );
}
