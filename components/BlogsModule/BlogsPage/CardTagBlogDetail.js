import React from "react";
import PostPage from "../CardPosts/PostPage";
import styles from "./CardBlogPage.module.scss";

function CardTagBlogDetail({ tagItem }) {
  console.log('L6666', tagItem);
  const posts = tagItem[0].posts;

  return (
    <div className={styles.cardBlogLeft}>
      <h3>Tag: {tagItem[0].name} </h3>
      {posts &&
        posts.map((post, id) => {
          return <PostPage post={post} key={id} />;
        })}
    </div>
  );
}

export default CardTagBlogDetail;
