import Markdown from "markdown-to-jsx";
import moment from "moment";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Question.module.css";

function QuestionDetail({ question }) {
  return (
    <div className={styles.questionCardDetail}>
      <div className={styles.questionCardLeftDetail}>
        <button className={styles.questionCardDetailButton}>
          <span>0</span>
          <i className="far fa-thumbs-up"> </i>
        </button>
      </div>
      <div className={styles.questionCardRight}>
        <div className={styles.questionButtonDetail}>
          {question.tags.map((tag, index) => {
            return (
              <button key={index} className={styles.buttonLink}>
                <Link href={`/questions/tag-question/${tag.id}`}>
                  <a>{tag.name}</a>
                </Link>
              </button>
            );
          })}
        </div>
        <ReactMarkdown>{question.content}</ReactMarkdown>
        <div className={styles.questionAvaDetail}>
          <div className={styles.questionAva}>
            <Link href={`/profile/${question.author.id}`}>
              <a>
                <figure className={styles.questionThumbImage}>
                  <img
                    src={question.author.avatarUrl}
                    alt="iconQuestion"
                    style={{ width: "40px", borderRadius: "50%" }}
                  />
                </figure>
              </a>
            </Link>
          </div>
          <span className={styles.questionAuthorDetail}>
            <span>
              <Link href={`/profile/${question.author.id}`}>
                <a>{question.author.name}</a>
              </Link>{" "}
            </span>
            <p>asked {moment(question.createdAt).format("LLL")}</p>
          </span>
          {/* <div className={styles.questionButtonShareDetail}>
            <i className="far fa-share"></i>
            <span>Share</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
