import React, { Component } from "react";
import SearchQuestion from "../../SearchModule/SearchQuestion";
import Question from "../CardQuestions/Question";
import styles from "./CardQuestionPage.module.scss";

function CardQuestionCenter({ questions }) {
  return (
    <div className={styles.cardQuestionCenter}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h3>All Question</h3>
        <SearchQuestion />
      </div>
      {questions.map((question, id) => {
        return <Question question={question} key={id} />;
      })}
    </div>
  );
}

export default CardQuestionCenter;
