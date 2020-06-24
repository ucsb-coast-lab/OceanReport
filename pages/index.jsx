import React from "react";
import Report from "../components/report.jsx";
import styles from "../styles/style.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
        <a className={styles.navbarTitle} href="https://ucsbcoastlab.org/">
          UCSB COAST Lab
        </a>
        <div className={styles.navbarLinks}>
          <a
            className={styles.buttons}
            href="https://ucsb-ocean-report.herokuapp.com/"
          >
            UCSB OCEAN REPORT
          </a>
          <a
            className={styles.buttons}
            href="https://ucsbcoastlab.org/diversity-equity-inclusion/"
          >
            DIVERSITY, EQUITY & INCLUSION
          </a>
          <a className={styles.buttons} href="https://ucsbcoastlab.org/buoy/">
            UCSB_BUOY@CAMPUS POINT
          </a>
          <a
            className={styles.buttons}
            href="https://ucsbcoastlab.org/join-the-lab/"
          >
            OPPORTUNITIES
          </a>
          <a
            className={styles.buttons}
            href="https://ucsbcoastlab.org/rv-resonance/"
          >
            R/V RESONANCE
          </a>
          <a
            className={styles.buttons}
            href="https://ucsbcoastlab.org/callinectes/"
          >
            CALLINECTES
          </a>
          <a className={styles.buttons} href="https://ucsbcoastlab.org/people/">
            PEOPLE
          </a>
        </div>
      </div>
      <div className={styles.navbarBox}></div>
      <div className={styles.leftbar}>
        <h1 className={styles.title}>UCSB Ocean Report</h1>
        <div className={styles.titleBox}></div>
      </div>
      <div className={styles.sidebar}></div>
      <Report />
    </div>
  );
}
