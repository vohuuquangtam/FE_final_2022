import React from "react";
import styles from "../../../../styles/Home.module.css";
import Client from "../../../../services/Client";
import TagBlogDetailPage from "../../../../containers/TagBlogDetailPage";
function tagPost({post, tagPosts, tagItem }) {
  return (
    <div className={styles.container}>
      <TagBlogDetailPage post={post} tagPosts={tagPosts} tagItem={tagItem} />
    </div>
  );
}

tagPost.getInitialProps = async ({ query: { id } }) => {
  const [tagPosts, post] = await Promise.all([
    Client("tag-post"),
    Client(`post/${id}`),
  ]);
  return {
    tagPosts: tagPosts.data.items,
    tagItem : tagPosts.data.items.filter(item => item.id === id),
    post: post.data,
  };
};

export default tagPost;
