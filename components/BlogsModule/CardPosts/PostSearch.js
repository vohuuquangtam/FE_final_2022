import React, { useState } from "react";
import styles from "./Post.module.scss";
import Link from "next/link";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { useAuth } from "../../../contexts/auth";
import DeleteBlog from "../BlogsPage/DeleteBlog";

const PostSearch = ({ post }) => {
  const { user } = useAuth();
  const { id } = post;
  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.postAva}>
          <figure className={styles.postThumbImage}>
            <img
              src={post.author.avatarUrl}
              alt="iconAuthor"
              style={{ width: "40px", borderRadius: "50%" }}
            />
          </figure>
        </div>
        <div className={styles.postTitle}>
          <h3 className={styles.postTitleContent}>
            <Link href={`/posts/${id}`}>
              <a>{post.title}</a>
            </Link>
          </h3>
          <span className={styles.postAuthor}>
            <span>
              <Link href={`/profile/${post.author.id}`}>
                <a>{post.author.name}</a>
              </Link>
            </span>
            <p>published {moment(post.createdAt).format("ll")}</p>
          </span>
        </div>
        <div className={styles.postThumb}>
          <figure className={styles.postThumbImage}>
            <img
              src={"/static/iconBlog.png"}
              alt="iconBlog"
              style={{ width: "30px" }}
            />
          </figure>
          {user && user.id && post.author.id === user.id ? (
            <>
              <Dropdown
                pointing="top right"
                icon={null}
                trigger={<i className="fas fa-ellipsis-h"></i>}
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link href={`/posts/${id}/edit`}>
                      <a>
                        <Button fluid color="grey" animated="vertical">
                          <Button.Content visible>Edit</Button.Content>
                          <Button.Content hidden>
                            <Icon name="edit" />
                          </Button.Content>
                        </Button>
                      </a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <DeleteBlog post={post} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.postContent}>
        <p className={styles.postDescript}>{post.subTitle}</p>
        <div className={styles.postMore}>
          <button className={styles.buttonPrimary}>
            <Link href={`/posts/${id}`}>
              <a>
                <i className="fa fa-chevron-right"></i> Read more
              </a>
            </Link>
          </button>
          <div className={styles.faTag}>
            <i className="fa fa-tag"></i>
            {post.tags &&
              post.tags.map((tag, idex) => {
                return (
                  <button className={styles.faTagButton} key={idex}>
                    <Link href={`/posts/tag-post/${tag.id}`}>
                      <a>{tag.name}</a>
                    </Link>
                  </button>
                );
              })}
          </div>
        </div>
        <div className={styles.postMeta}>
          <div className="extra content">
            <div
              className="ui right labeled button"
              data-variation="tiny"
              tabIndex="0"
            >
              <div className="ui gray icon tiny button">
                <i className="thumbs outline up large icon"></i>
              </div>
              <a className="ui basic gray left pointing label">0 like</a>
            </div>
            <div
              className="ui left labeled right floated button"
              data-variation="tiny"
              tabIndex="0"
            >
              <Link href={`posts/${post.id}`}>
                <a className="ui basic red right pointing label">
                  {post.comments.length} comment{post.comments.length > 1 ? "s" : ""}
                </a>
              </Link>
              <div className="ui red icon tiny button">
                <i className="external comment large icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostSearch;
