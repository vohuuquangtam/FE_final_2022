import React from "react";
import Post from "../../components/BlogsModule/CardPosts/Post";
import SearchBlog from "../../components/SearchModule/SearchBlog";
import Client from "../../services/Client";
import styles from "../../styles/Home.module.css";

const search = ({ data, query }) => {
  const { posts } = data;
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
          gridColumn: "1/3",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>Key word:</span>
            {query["key"]}
          </div>
          <SearchBlog />
        </div>
      </div>
      <div style={{ width: "100%", paddingLeft: "20px", gridColumn: "1/3" }}>
        {posts &&
          posts.map((post, id) => {
            return <Post post={post} key={id} />;
          })}
      </div>
    </div>
  );
};

search.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { data } = await Client(
    `search?key=${encodeURIComponent(query["key"])}&scope=${encodeURIComponent(
      `["POST"]`
    )}`,
    "GET"
  );
  return { data, query };
};

export default search;
