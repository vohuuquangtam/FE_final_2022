import React, { Component } from 'react'
import LoginPage from '../components/ProfileModule/LoginPage/LoginPage';
import styles from '../styles/Home.module.css'

function signIn() {
    return (
      <div className={styles.loginContainer}>
        <LoginPage />
      </div>
    );
}


export default signIn;