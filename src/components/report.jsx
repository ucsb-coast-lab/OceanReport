import React from "react";
import styles from "../styles/style.module.css";
//These are all imports to display icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

export default function Report(props) {
  //Report is built from a table with the first columns being icons and the second being the data
  // All of the data displays are also links to where that data was gathered from, open in new tab
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.tds}>
            <FontAwesomeIcon
              className={styles.iconsBlack}
              icon={faCalendarDay}
            />
          </td>
          <td className={styles.tds}>
            <p data-testid="report-date-id" className={styles.links}>
              {props.date}
            </p>
          </td>
        </tr>
        <tr>
          <td className={styles.tds}>
            <FontAwesomeIcon className={styles.iconsBlue} icon={faWater} />
          </td>
          <td className={styles.tds}>
            <a
              data-testid="report-wave-id"
              className={styles.links}
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-1097"
            >
              {props.wave}
            </a>
          </td>
        </tr>
        <tr>
          <td className={styles.tds}>
            <FontAwesomeIcon className={styles.iconsGrey} icon={faWind} />
          </td>
          <td className={styles.tds}>
            <a
              data-testid="report-wind-id"
              className={styles.links}
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-1097"
            >
              {props.wind}
            </a>
          </td>
        </tr>
        <tr>
          <td className={styles.tds}>
            <FontAwesomeIcon
              className={styles.iconsRed}
              icon={faThermometerHalf}
            />
          </td>
          <td className={styles.tds}>
            <a
              data-testid="report-temp-id"
              className={styles.links}
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-1097"
            >
              {props.temp}
            </a>
          </td>
        </tr>
        <tr>
          <td className={styles.tds}>
            {props.rising ? (
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
          </td>
          <td className={styles.tds}>
            <a
              data-testid="report-tide-id"
              className={styles.links}
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              {props.tide}
            </a>
          </td>
        </tr>
        <tr>
          <td className={styles.tds}>
            {props.hi.substring(0, 2) === "HI" ? (
              <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon
                className={styles.iconsGreen}
                icon={faAngleDown}
              />
            )}
          </td>
          <td className={styles.tds}>
            <a
              data-testid="report-hi-id"
              className={styles.links}
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              {props.hi}
            </a>
          </td>
        </tr>
        <tr>
          <td className={styles.tds}>
            {props.lo.substring(0, 2) === "HI" ? (
              <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon
                className={styles.iconsGreen}
                icon={faAngleDown}
              />
            )}
          </td>
          <td className={styles.tds}>
            <a
              data-testid="report-lo-id"
              className={styles.links}
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              {props.lo}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
