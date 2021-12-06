import Link from "next/link";
import React from "react";
import PostRelated from "../CardPosts/PostRelated";
import styles from "./CardBlogPage.module.scss";

export default function CardBlogRightDetail({ post }) {
  return (
    <div className={styles.cardBlogRightDetail}>
      <div className={styles.ourTeam}>
        <div className={styles.picture}>
          <img className="img-fluid" src={post.author.avatarUrl} />
        </div>
        <div className={styles.teamContent}>
          <h3 className={styles.name}>{post.author.name}</h3>
        </div>
        <div className={styles.topTrainerButton}>
          <button className={styles.primary}>
            <Link href={`/profile/${post.author.id}`}>
              <a>View Profile</a>
            </Link>
          </button>
        </div>
      </div>
      <PostRelated />
    </div>
  );
}
