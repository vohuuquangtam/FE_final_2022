import React, { useEffect } from "react";
import Classe from "../components/LearningModule/CardClasses/Class";
import Post from "../components/BlogsModule/CardPosts/Post";
import Question from "../components/QuestionsModule/CardQuestions/Question";
import ScheduleTrainer from "../components/ProfileModule/Schedule/ScheduleTrainer";
import { useAuth } from "../contexts/auth";
import Client from "../services/Client";
import styles from "../styles/Home.module.css";
import Slider from "react-slick";
import Head from "next/head";
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
  const homeComponents = () => {
    return home.map((item, id) => {
      switch (item.type) {
        case "post":
          return (
            <div style={{padding: '0 10px', width: '50%'}} key={id}>
            <Post post={item} />
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

 
  var settingsCarosels = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
  };

  var settingsCarosels2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
  };
  return (
    <React.Fragment>
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
    </Head>
    <div style={{display: "flex"}}>
      <div
        style={{ width: "70%" }}
        className={`${styles.container} ${styles.homeGrid}`}
      >
        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "20px" }}>
          <h1 style={{textAlign: 'center'}}>Blogs</h1>
          <div style={{ width: '100%' }}>
            <Slider {...settingsCarosels2}>
                {homeComponents()}
            </Slider>
          </div>
          </div>
          <div style={{ width: "100%", paddingRight: "20px", paddingLeft: "20px", marginTop: "20px" }}>
            <h1 style={{textAlign: 'center'}}>Classes</h1>
            <div style={{ marginTop: "20px",width: '100%' }}>
              <Slider {...settingsCarosels}>
                {classes.slice(0,10).map((classe, id) => {
                  return (
                    <div style={{padding: '0 10px'}} key={id}>
                        <Classe classe={classe} />
                      </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "30px" }}>
            <h1 style={{textAlign: 'center'}}>Questions</h1>
            <div style={{display: "flex", justifyContent: "center"}}>
              <div style={{ padding: "10px", width: '67%' }}>
                {questionComponents()}
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px", marginTop: "120px", width: '30%'  }}>
        <div style={{ width: '60%', position: 'sticky', top: '68px' }}>
            {user && <ScheduleTrainer user={user} />}
          </div>
      </div>
    </div>
    </React.Fragment>
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
