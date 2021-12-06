import React, { Component } from 'react';
import CardClassesLeftOfTopic from '../components/LearningModule/TopicPage/CardClassesLeftOfTopic';
import CardTopicsRight from '../components/LearningModule/TopicPage/CardTopicsRight';
import styles from '../styles/Home.module.css';

class ClassesOfTopicPage extends Component {
  render() {
    return (
      <div className={styles.classesPage}>
        <div style={{ width: "60%" }}>
          <CardClassesLeftOfTopic {...this.props} />
        </div>
        <div style={{ width: "30%", marginLeft: "20px" }}>
          <CardTopicsRight />
        </div>
      </div>
    );
  }
}

export default ClassesOfTopicPage;