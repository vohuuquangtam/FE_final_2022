import axios from 'axios';
import React from 'react';
import TagQuestionsPage from '../../../containers/TagQuestionPage';
import Client from '../../../services/Client';
import styles from '../../../styles/Home.module.css'

function tagQuestions({tagQuestions}) {
  return (
    <div className={styles.container}>
      <TagQuestionsPage tagQuestions={tagQuestions} />
    </div>
  );
}

tagQuestions.getInitialProps = async () => {
  const {data} = await Client('tag-question')
  return { tagQuestions: data.items };
}

export default tagQuestions;