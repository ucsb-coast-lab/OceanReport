import React from "react";
import Report from "../components/report.jsx";
import styles from "../styles/style.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
        <h1 className={styles.title}>UCSB Ocean Report</h1>
        <div className={styles.homeButton}>
          <a className={styles.buttons} href="https://ucsbcoastlab.org/">
            Home
          </a>
        </div>
      </div>
      <Report />
    </div>
  );
}
