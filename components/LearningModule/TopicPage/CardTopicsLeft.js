import React from "react";
import { useAuth } from "../../../contexts/auth";
import Topic from "../CardTopics/Topic";
import styles from "./CardTopicsPage.module.scss";
import CreateClass from "./CreateClass";
import CreateTopic from "./CreateTopic";

export default function CardTopicsLeft({ topics }) {
  const { user } = useAuth();
  return (
    <div className={styles.cardTopicsLeft}>
      {/* <h3>Classes Management</h3>
      <div className={styles.cardTopicsLeftJoined}>
        <CardTopicsJoined />
      </div> */}
      {user && user.roles.indexOf("TRAINER") !== -1 ? (
        <div style={{margin: '10px 0'}}>
          <CreateTopic />
          <CreateClass />
        </div>
      ) : (
        ""
      )}

      <h3 style={{margin:  '20px 0px'}}>All Topics</h3>
      <div className={styles.cardAllTopics}>
        {topics.map((topic, id) => {
          return <Topic topic={topic} key={id} />;
        })}
      </div>
    </div>
  );
}
