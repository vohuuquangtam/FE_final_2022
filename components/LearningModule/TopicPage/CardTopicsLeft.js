import React from "react";
import { useAuth } from "../../../contexts/auth";
import Topic from "../CardTopics/Topic";
import styles from "./CardTopicsPage.module.scss";
import CardNewestTopic from "./CardNewestTopic";
import CreateClass from "./CreateClass";
import CreateTopic from "./CreateTopic";
import Head from "next/head";
import Slider from "react-slick";

export default function CardTopicsLeft({ topics }) {
  const { user } = useAuth();
  var settingsCarosels = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
    accessibility: false
  };

  const caroselComponents = () => {
    return topics.slice(0, 5).map((topic, id) => {
          return (
            <CardNewestTopic topic={topic} key={id}/>
          );
    });
  };
  return (
    <React.Fragment>
    <Head>
     <link
       rel="stylesheet"
       type="text/css"
       charSet="UTF-8"
       href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
     />
     <link
       rel="stylesheet"
       type="text/css"
       href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
     />
   </Head>
   <div className={styles.cardTopicsLeft}>
     {/* <h3>Classes Management</h3>
     <div className={styles.cardTopicsLeftJoined}>
       <CardTopicsJoined />
     </div> */}
     <h2 style={{margin:  '20px 0px', textAlign: 'center'}}>All Topics</h2>
     {user && user.roles.indexOf("TRAINER") !== -1 ? (
       <div style={{margin: '10px 0'}}>
         <CreateTopic />
         <CreateClass />
       </div>
     ) : (
       ""
     )}
    
    <div className={styles.cardTopic}>
          <div>
            <h3>Newest Topics</h3>
          </div>
           {/* <div>
            <Slider {...settingsCarosels}>
                {caroselComponents()}
            </Slider>
           </div> */}
        </div>
        <div className={styles.cardAllTopics}>
          {topics.map((topic, id) => {
            return <Topic topic={topic} key={id} />;
          })}
        </div>
      </div>
      </React.Fragment>
  );
}
