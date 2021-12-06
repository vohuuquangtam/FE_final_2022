import React, { Component } from 'react'
import CardProfileLeft from '../components/ProfileModule/ProfilePage/cardProfileLeft'
import CardProfileRight from '../components/ProfileModule/ProfilePage/cardProfileRight'
import styles from '../styles/Home.module.css'

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <div className={styles.profilePage}>
        <div style={{ width: "25%" }}>
          <CardProfileLeft {...this.props} />
        </div>
        <div style={{ width: "70%", marginLeft: "20px" }}>
          <CardProfileRight {...this.props} />
        </div>
      </div>
      </div>
    )
  }
}
