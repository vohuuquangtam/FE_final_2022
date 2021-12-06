import Link from "next/link";
import React from "react";
import styles from "./Question.module.css";

function CardTagQuestion({ tagQuestion }) {
  return (
    <li>
      <button className={styles.tagQuestionTag}>
        <Link href={`/questions/tag-question/${tagQuestion.id}`}>
          <a>{tagQuestion.name}</a>
        </Link>
      </button>
    </li>
  );
}

export default CardTagQuestion;
