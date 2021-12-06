import React from "react";
import ScheduleTrainee from "../components/ProfileModule/Schedule/ScheduleTrainee";
import styles from "../styles/Home.module.css";

function scheduleTrainee() {
  return (
    <div className={styles.container}>
      <ScheduleTrainee />
    </div>
  );
}



export default scheduleTrainee;
