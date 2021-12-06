import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import QuestionComment from "../CardQuestions/QuestionComment";
import QuestionDetail from "../CardQuestions/QuestionDetail";
import styles from "./CardQuestionPage.module.scss";
import Client from "../../../services/Client";
import MdEditor from "../../MdEditor";

function CardQuestionCenterDetail({ question, comments }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = question;

  const onsubmit = (e, v) => {
    setContent("");
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`question/${id}/comment`, "POST", { content }).then(({ data }) => {
        router.push(`${id}`);
      });
    }
  };

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setContent(newValue);
  };

  return (
    <div className={styles.cardQuestionCenter}>
      <div className={styles.cardQuestionCenterHeader}>
        <p>
          <Link href="/questions">
            <a>
              <i className="fas fa-angle-double-left"></i>
              <span>All Question</span>
            </a>
          </Link>
        </p>
        <h3>{question.title} </h3>
      </div>
      <QuestionDetail question={question} />
      <Header as="h3" dividing>
        {comments.length} Answer{comments.length > 1 ? "s" : ""}
      </Header>
      {comments.map((comment, id) => {
        return <QuestionComment comment={comment} key={id} />;
      })}
      <div style={{margin: '20px 0'}} >
        <Form reply onSubmit={onsubmit}>
          <MdEditor
            value={content}
            onChange={handleEditorChange}
          />
          <div style={{margin: '10px 0'}}>
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CardQuestionCenterDetail;
