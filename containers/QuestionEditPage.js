import React, { Component } from 'react'
import CardQuestionLeft from '../components/QuestionsModule/QuestionsPage/CardQuestionLeft';
import CardQuestionRight from '../components/QuestionsModule/QuestionsPage/CardQuestionRight';
import EditQuestion from '../components/QuestionsModule/QuestionsPage/EditQuestions';
import styles from '../styles/Home.module.css'


export default class QuestionsEditPage extends Component {
  render() {
    return (
      <div className={styles.questionsPage}>
        <div style={{ width: "15%" }}>
          <CardQuestionLeft {...this.props}  />
        </div>
        <div style={{ width: "60%" }}>
          <EditQuestion {...this.props} />
        </div>
        <div style={{ width: "20%" }}>
          <CardQuestionRight />
        </div>
      </div>
    );
  }
}
