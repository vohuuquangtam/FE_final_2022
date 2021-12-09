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
  console.log("home",home);
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
  const homeComponents = () => {
    return home.map((item, id) => {
      switch (item.type) {
        case "post":
          return (
            <div style={{padding: '10px', width: '32%'}}>
              <Post post={item} key={id} />
            </div>
          );
      }
    });
  };

  const questionComponents = () => {
    return home.map((item, id) => {
      switch (item.type) {
        case "question":
          return <Question question={item} key={id} />;
      }
    });
  };

 
  return (
    <div style={{display: "flex"}}>
      <div
        style={{ width: "70%" }}
        className={`${styles.container} ${styles.homeGrid}`}
      >
        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "20px" }}>
          <h1 style={{textAlign: 'center'}}>Blogs</h1>
          <div style={{ display: 'flex',maxWidth: '80vw', overflowX: 'scroll' }}>
            {homeComponents()}
          </div>
        </div>
        <div style={{ width: "100%", paddingRight: "20px", paddingLeft: "20px", marginTop: "20px" }}>
          <h1 style={{textAlign: 'center'}}>Classes</h1>
          <div style={{ marginTop: "20px",  display: 'flex',maxWidth: '80vw', overflowX: 'scroll' }}>
            {classes.slice(0,10).map((classe, id) => {
              return (
                <div style={{padding: '10px', width: '25%'}}>
                  <Classe classe={classe} key={id} />
                </div>
              );
            })}
          </div>
          </div>
        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "30px" }}>
          <h1 style={{textAlign: 'center'}}>Questions</h1>
          <div style={{display: "flex"}}>
            <div style={{ padding: "10px", width: '70%' }}>
              {questionComponents()}
            </div>
          </div>
        </div>
          {/* <div style={{ width: "100%", paddingLeft: "20px", gridColumn: "1/3", marginTop: "10px" }}>
          {renderComponents()}
        </div>
        <div style={{ width: "100%", paddingRight: "20px", marginTop: "20px" }}>
          {user && <ScheduleTrainer user={user} />}
          <div style={{ marginTop: "20px" }}>
            {classes.slice(0,10).map((classe, id) => {
              return <Classe classe={classe} key={id} />;
            })}
          </div>
        </div> */}
      </div>
      <div style={{ padding: "10px", marginTop: "120px", width: '30%'  }}>
        <div style={{ width: '80%', position: 'sticky', top: '68px' }}>
          {user && <ScheduleTrainer user={user} />}
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
