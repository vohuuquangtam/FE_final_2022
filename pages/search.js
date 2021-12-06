import React from "react";
import PostSearch from "../components/BlogsModule/CardPosts/PostSearch";
import Question from "../components/QuestionsModule/CardQuestions/Question";
import Client from "../services/Client";
import styles from "../styles/Home.module.css";

const search = ({ data, query }) => {
  const { posts, questions, users } = data;
  console.log("L10", users);
  return (
    <div
      style={{ width: "100%" }}
      className={`${styles.container} ${styles.homeGrid}`}
    >
      <div
        style={{
          width: "100%",
          paddingTop: "20px",
          paddingLeft: "20px",
          fontSize: "1.2rem",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Key word:</span> {query["key"]}{" "}
      </div>
      <div style={{ width: "100%", paddingLeft: "20px", gridColumn: "1/3" }}>
        {posts &&
          posts.map((post, id) => {
            return <PostSearch post={post} key={id} />;
          })}
        {questions &&
          questions.map((question, id) => {
            return <Question question={question} key={id} />;
          })}
      </div>
    </div>
  );
};

search.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { data } = await Client(
    `search?key=${encodeURIComponent(query["key"])}&scope=${encodeURIComponent(
      `["POST", "QUESTION", "USER"]`
    )}`,
    "GET"
  );
  return { data, query };
};

export default search;
