import moment from "moment";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Post.module.scss";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.postCard}>
 
      <div className={styles.postDetailBody}>
        <div className={styles.postDetailTime}>
          <p className={styles.postDetailTime1}>
            {moment(post.createdAt).format("MMM")}
          </p>
          <p className={styles.postDetailTime2}>
            {moment(post.createdAt).format("D")}
          </p>
          <p className={styles.postDetailTime3}>
            {moment(post.createdAt).format("YYYY")}
          </p>
        </div>
        <div className={styles.postDetailContent}>
          <h3>{post.title}</h3>
          <div className={styles.postDetailContentAuthor}>
            <p>
              <span style={{ fontWeight: "bold" }}>Posted By: </span>
              <Link href={`/profile/${post.author.id}`}>
                <a>{post.author.name}</a>
              </Link>
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Comment: </span>
              {post.comments.length}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Tags: </span>
              {post.tags.map((tag, id) => {
                return (
                  // <Link href={`/posts/tag-post/${tag.id}`} key={id}>
                  //   <a> {tag.name}</a>
                  // </Link>
                  <button className={styles.faTagButton} key={id}>
                    <Link href={`/posts/tag-post/${tag.id}`}>
                      <a>{tag.name}</a>
                    </Link>
                  </button>
                );
              })}
            </p>
          </div>
          <div style={{ fontStyle: "italic", fontSize: "14px" }}>
            <ReactMarkdown>{post.subTitle}</ReactMarkdown>
          </div>
          <div className={styles.postImage}>
            <img
              src={post.featuredImage}
              alt="imageBlog"
              style={{ width: "100%" }}
            />
          </div>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
