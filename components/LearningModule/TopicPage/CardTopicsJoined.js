import React from "react";
import styles from "./CardTopicsPage.module.scss";


export default function CardTopicsJoined() {
  return (
    <div className={styles.cardTopicsJoined}>
      <div className={styles.cardTopicsJoinedAva}>
        <img
          src={"/static/worker.png"}
          alt="iconClassAva"
          style={{ width: "80px" }}
        />
      </div>
      <div className={styles.cardTopicsJoinedTopic}>
        <h4>Machine Learning A-Z: Hands-On Python & R In Data Science</h4>
        <p>Duy K.N</p>
        <span className={styles.date}>
          <i className="far fa-calendar-alt"></i>
          <span>Created 7/27/2014</span>
        </span>
      </div>
      <div className={styles.cardTopicsJoinedInclu}>
        <div className={styles.cardTopicsJoinedDetail}>
          <i className="far fa-tv"></i>
          <p>
            <span>Total hours:</span> 3 / 40
          </p>
        </div>
        <div className={styles.cardTopicsJoinedDetail}>
          <i className="far fa-user-graduate"></i>
          <p>
            <span>Trainee joined:</span> 40
          </p>
        </div>
        <div className={styles.cardTopicsJoinedDetail}>
          <i className="far fa-clock"></i>
          <p>
            <span>Time start:</span> 20:00
          </p>
        </div>
      </div>
    </div>
  );
}
