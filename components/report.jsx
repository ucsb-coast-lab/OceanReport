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
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

export default function Report(props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <FontAwesomeIcon
              className={styles.iconsBlack}
              icon={faCalendarDay}
            />
          </td>
          <td>
            <p className={styles.links}>{props.date}</p>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon className={styles.iconsBlue} icon={faWater} />
          </td>
          <td>
            <a
              className={styles.links}
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-0186"
            >
              {props.wave}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon className={styles.iconsGrey} icon={faWind} />
          </td>
          <td>
            <a
              className={styles.links}
              target="_blank"
              href="https://coastlab.sofarocean.com/historical/SPOT-0186"
            >
              {props.wind}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon
              className={styles.iconsRed}
              icon={faThermometerHalf}
            />
          </td>
          <td>
            <a
              className={styles.links}
              target="_blank"
              href="https://www.sccoos.org/data/autoss/timeline/?main=single&station=stearns_wharf"
            >
              {props.temp}
            </a>
          </td>
        </tr>
        <tr>
          <td>
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
          <td>
            <a
              className={styles.links}
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              {props.tide}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            {props.hi.substring(0, 2) === "HI" ? (
              <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon
                className={styles.iconsGreen}
                icon={faAngleDown}
              />
            )}
          </td>
          <td>
            <a
              className={styles.links}
              target="_blank"
              href="https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340"
            >
              {props.hi}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            {props.lo.substring(0, 2) === "HI" ? (
              <FontAwesomeIcon className={styles.iconsGreen} icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon
                className={styles.iconsGreen}
                icon={faAngleDown}
              />
            )}
          </td>
          <td>
            <a
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
