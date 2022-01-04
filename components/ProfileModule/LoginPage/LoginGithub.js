import React, {useState } from 'react';
import {useRouter} from 'next/router'
import { Button} from "semantic-ui-react";
import styles from "./LoginPage.module.css";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { Component } from 'react';

const API_URL = "http://localhost:4000";

const firebaseConfig = {
  apiKey: "AIzaSyCMry94rbb_fD9tUpxlab7Bpuf_uqBWxWY",
  authDomain: "doramatching.firebaseapp.com",
  databaseURL: "https://doramatching.firebaseio.com",
  projectId: "doramatching",
  storageBucket: "doramatching.appspot.com",
  messagingSenderId: "1074902429461",
  appId: "1:1074902429461:loginWithGithub"
}
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

let provider = new firebase.auth.GithubAuthProvider().addScope("user,repo");

function LoginGithub() {
  const router = useRouter();
  const [name, setName] = useState('')
  const loginWithGithub = async () => {
    try {
      const { credential, user } = await firebase
        .auth()
        .signInWithPopup(provider);
      const { accessToken } = credential;
      console.log("RESULT", { user, accessToken });

      const { data } = await axios.post(`${API_URL}/github`, {
        user,
        accessToken,
      });

      console.log("RESPONSE FROM API", data);
      router.push('/');
    } catch ({ code, message, email, credential }) {
      console.error({ code, message, email, credential });
    }
  }
      return (
        <Button color={"red"} onClick={loginWithGithub}>
          <div className={styles.loginButtonSecond}>
          <i className="fab fa-google"></i>
            <p style={{ marginLeft: "10px" }}>Login with Google</p>
          </div>
        </Button>
      );  
}

export default LoginGithub