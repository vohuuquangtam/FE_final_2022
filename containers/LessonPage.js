import React, { Component, createRef, useState } from "react";
import CardLessonLeft from "../components/LearningModule/TopicPage/CardLessonLeft";
import CardLessonRight from "../components/LearningModule/TopicPage/CardLessonRight";
import styles from "../styles/Home.module.css";
import _ from "lodash";

function LessonPage(props) {

  return (
    <div className={styles.lessonPage}>
      <div style={{ width: "60%", background: '#fff', padding: '20px 10px', borderRadius: '10px'  }}>
        <CardLessonLeft {...props} />
      </div>
      <div style={{ width: "25%", marginLeft: "20px" }}>
        <CardLessonRight {...props} />
      </div>
    </div>
  );
}

export default LessonPage;
