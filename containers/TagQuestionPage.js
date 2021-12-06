import React, { Component } from "react";
import CardQuestionLeft from "../components/QuestionsModule/QuestionsPage/CardQuestionLeft";
import styles from "../styles/Home.module.css";

class TagQuestionsPage extends Component {
  render() {
    return <CardQuestionLeft {...this.props} />;
  }
}

export default TagQuestionsPage;
