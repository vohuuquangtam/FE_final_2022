import React from "react";
import ScheduleTrainer from "../components/ProfileModule/Schedule/ScheduleTrainer";
import styles from "../styles/Home.module.css";

function scheduleTrainer() {
  return (
    <div className={styles.container}>
      <ScheduleTrainer />
    </div>
  );
}



export default scheduleTrainer;
