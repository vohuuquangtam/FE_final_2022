import Link from "next/link";
import React from "react";
import styles from "./Post.module.scss";

function CardTagPost({ tagPost }) {
  return (
    <p className={styles.tagPost}>
      <button className={styles.tagPostTag} >
        <Link href={`/posts/tag-post/${tagPost.id}`}>
          <a>{tagPost.name}</a>
        </Link>
      </button>
    </p>
  );
}

export default CardTagPost;
