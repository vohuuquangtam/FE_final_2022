import React, { Component } from 'react'
import CardProfileLeft from '../components/ProfileModule/ProfilePage/cardProfileLeft'
import CardProfileSetting from '../components/ProfileModule/ProfilePage/cardProfileSetting'
import styles from '../styles/Home.module.css'

export default class ProfileSettingPage extends Component {
  render() {
    return (
      <div>
        <div className={styles.profilePage}>
        <div style={{ width: "25%" }}>
          <CardProfileLeft {...this.props} />
        </div>
        <div style={{ width: "70%", marginLeft: "20px" }}>
          <CardProfileSetting {...this.props} />
        </div>
      </div>
      </div>
    )
  }
}
