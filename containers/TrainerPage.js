import React, { Component } from 'react'
import CardTrainersLeft from '../components/TrainersPage/CardTrainersLeft';
import CardTrainersRight from '../components/TrainersPage/CardTrainersRight';
import styles from '../styles/Home.module.css'

export default class TrainerPage extends Component {
  render() {
    return (
      <div>
        <div className={styles.trainerPage}>
          <div style={{ width: "70%" }}>
            <CardTrainersLeft {...this.props} />
          </div>
          <div style={{ width: "20%", marginLeft: "20px" }}>
            <CardTrainersRight {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
