import React, { Component } from 'react'
import CardQuestionCenterDetail from '../components/QuestionsModule/QuestionsPage/CardQuestionCenterDetail';
import CardQuestionLeft from '../components/QuestionsModule/QuestionsPage/CardQuestionLeft';
import CardQuestionRight from '../components/QuestionsModule/QuestionsPage/CardQuestionRight';
import styles from '../styles/Home.module.css'


export default class QuestionsPageDetail extends Component {
  render() {
    return (
      <div className={styles.questionsPage}>
        <div style={{ width: "15%" }}>
          <CardQuestionLeft {...this.props}  />
        </div>
        <div style={{ width: "60%" }}>
          <CardQuestionCenterDetail {...this.props} />
        </div>
        <div style={{ width: "20%" }}>
          <CardQuestionRight />
        </div>
      </div>
    );
  }
}
