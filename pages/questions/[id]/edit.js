import React from "react";
import styles from "../../../styles/Home.module.css";
import axios from "axios";
import QuestionsEditPage from "../../../containers/QuestionEditPage";
import Client from "../../../services/Client";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";

function editQuestion({ question, tagQuestions }) {
  const {user} = useAuth()
  const router = useRouter()
  return user && user ? (
    <div className={styles.container}>
      <QuestionsEditPage question={question} tagQuestions={tagQuestions} />
    </div>
  ) : (typeof window !== 'undefined' ? (router.back('/')) : '')
}

editQuestion.getInitialProps = async ({ query: { id } }) => {
  const [question, tagQuestions] = await Promise.all([
    Client(`question/${id}`),
    Client("tag-question"),
  ]);
  return {
    question: question.data,
    tagQuestions: tagQuestions.data.items,
  };
};

export default editQuestion;
