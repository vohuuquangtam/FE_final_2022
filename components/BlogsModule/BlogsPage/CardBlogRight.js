import React from "react";
import CardTagPost from "../CardPosts/CardTagPost";
import PostRelated from "../CardPosts/PostRelated";
import styles from "./CardBlogPage.module.scss";

function CardBlogRight({ tagPosts }) {
  return (
    <div className={styles.cardBlogRight}>
      <PostRelated />
      <div>
        <h3>Tags</h3>
        <div style={{ width: "100%" }}>
          {tagPosts.slice(0, 10).map((tagPost, id) => {
            return (
                <CardTagPost tagPost={tagPost} key={id} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardBlogRight;
