import React from 'react';
import QuestionsPage from '../../containers/QuestionsPage';
import styles from '../../styles/Home.module.css'
import axios from 'axios';
import Client from '../../services/Client';

function questions({questions, tagQuestions}){
    return (
      <div className={styles.container} >
        <QuestionsPage questions={questions} tagQuestions={tagQuestions} />
      </div>
    );
}

questions.getInitialProps = async () => {
  const [questions, tagQuestions] = await Promise.all([
    Client('questions'),
    Client('tag-question'),
  ])
  return {
    questions: questions.data.items,
    tagQuestions: tagQuestions.data.items,
  }
}


export default questions;