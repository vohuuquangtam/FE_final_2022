import React from "react";
import Classe from "../components/LearningModule/CardClasses/Class";
import Post from "../components/BlogsModule/CardPosts/Post";
import Question from "../components/QuestionsModule/CardQuestions/Question";
import ScheduleTrainer from "../components/ProfileModule/Schedule/ScheduleTrainer";
import { useAuth } from "../contexts/auth";
import Client from "../services/Client";
import styles from "../styles/Home.module.css";

function Home({ home, classes }) {
  const { user } = useAuth();
  const renderComponents = () => {
    return home.map((item, id) => {
      switch (item.type) {
        case "post":
          return <Post post={item} key={id} />;
        case "question":
          return <Question question={item} key={id} />;
      }
    });
  };

  return (
    <div
      style={{ width: "100%" }}
      className={`${styles.container} ${styles.homeGrid}`}
    >
      <div style={{ width: "100%", paddingLeft: "20px", gridColumn: "1/3" }}>
        {renderComponents()}
      </div>
      <div style={{ width: "100%", paddingRight: "20px", marginTop: "20px" }}>
        {user && <ScheduleTrainer user={user} />}
        <div style={{ marginTop: "20px" }}>
          {classes.slice(0,10).map((classe, id) => {
            return <Classe classe={classe} key={id} />;
          })}
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const [home, classes] = await Promise.all([
    Client("home"),
    Client(`classes`),
  ]);
  return {
    home: home.data.items,
    classes: classes.data.items,
  };
};

export default Home;
