import React from "react";
import styles from "./Post.module.scss";
import Link from "next/link";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { useAuth } from "../../../contexts/auth";
import DeleteBlog from "../BlogsPage/DeleteBlog";

function PostPage({ post }) {
  const { user } = useAuth();
  const { id } = post;
  return (
    <div className={styles.blogPostPage}>
      <div className={styles.blogPostWrapper}>
        <div className={styles.blogPostMedia}>
          <div className={styles.blogPostMediaPart}>
            <img src={post.featuredImage} alt="" />
          </div>
        </div>
        <div className={styles.blogPostContent}>
          <div className={styles.metaWrapper}>
            <span className={styles.datePost}>
              <span className={styles.month}>
                {moment(post.createdAt).format("MMM")}
              </span>
              <span className={styles.day}>
                {moment(post.createdAt).format("D")}
              </span>
            </span>
          </div>
          <div className={styles.faTag}>
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
          <div className={styles.blogPostMetaWrap}>
            <div className={styles.postCatsAuthor}>
              <span className={styles.blogPostMetaCategories}>Publish by</span>
              <span className={styles.authorPost}>
                <Link href={`/profile/${post.author.id}`}>
                  <a>{post.author.name}</a>
                </Link>
              </span>
              {user && user.id && post.author.id === user.id ? (
                <div style={{float: 'right'}}>
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
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <h3 className={styles.blogPostTitle}>
            <Link href={`/posts/${id}`}>
              <a>{post.title}</a>
            </Link>
          </h3>
          {/* <p>{post.subTitle}</p> */}
          <div className={styles.blogPostMetaDesc}>
            <div className={styles.readMoreWrap}>
              <Link href={`/posts/${id}`}>
                <a>
                <i className="fa fa-info-circle"></i> Read more
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
