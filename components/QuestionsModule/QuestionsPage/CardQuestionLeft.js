import React, { useState } from "react";
import Link from "next/link";
import styles from "./CardQuestionPage.module.scss";
import CardTagQuestion from "../CardQuestions/CardTagQuestion";
import CreateQuestion from "./CreateQuestion";


function CardQuestionLeft({ tagQuestions }) {
  return (
    <div className={styles.cardQuestionLeft}>
      <CreateQuestion />
      <div className={styles.cardQuestionTag}>
        <i className="fa fa-tag"></i>
        <span>Tag</span>
      </div>
      <div className={styles.cardQuestionTagDetail}>
        {tagQuestions.slice(0,10).map((tagQuestion, id) => {
          return <CardTagQuestion tagQuestion={tagQuestion} key={id} />;
        })}
      </div>
      <p>
        <Link href="/questions/tag-question"> See more tags </Link>
      </p>
    </div>
  );
}
export default CardQuestionLeft;
