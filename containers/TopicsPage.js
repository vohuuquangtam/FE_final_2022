import React, { Component } from 'react';
import CardTopicsLeft from '../components/LearningModule/TopicPage/CardTopicsLeft'
import CardTopicsRight from '../components/LearningModule/TopicPage/CardTopicsRight';
import styles from '../styles/Home.module.css';

class TopicsPage extends Component {
  render() {
    return (
      <div className={styles.classesPage}>
        <div style={{ width: "60%" }}>
          <CardTopicsLeft {...this.props} />
        </div>
        <div style={{ width: "30%", marginLeft: "20px" }}>
          <CardTopicsRight />
        </div>
      </div>
    );
  }
}

export default TopicsPage;