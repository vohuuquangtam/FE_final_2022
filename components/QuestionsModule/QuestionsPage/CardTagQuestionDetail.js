import React, { Component } from "react";
import CardTagQuestion from "../CardQuestions/CardTagQuestion";
import Question from "../CardQuestions/Question";
import styles from "./CardQuestionPage.module.scss";

function CardTagQuestionDetail({ tagItem }) {
  const questions = tagItem[0].questions;

  return (
    <div className={styles.cardQuestionCenter}>
      <h3>Tag: {tagItem[0].name} </h3>
      {questions && questions.map((question, id) => {
          return <Question question={question} key={id} />;
        })}
    </div>
  );
}

export default CardTagQuestionDetail;
