import React from "react";
import BlogsEditPage from "../../../containers/BlogsEditPage";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";
import Client from "../../../services/Client";
import styles from "../../../styles/Home.module.css";

function editBlog({ post, tagPosts }) {
  const { user } = useAuth();
  const router = useRouter()
  return user && user ? (
    <div className={styles.container}>
      <BlogsEditPage post={post} tagPosts={tagPosts} />
    </div>
  ) : (typeof window !== 'undefined' ? (router.back('/')) : '')  
}

editBlog.getInitialProps = async ({ query: { id } }) => {
  const [post, tagPosts] = await Promise.all([
    Client(`post/${id}`),
    Client("tag-post"),
  ]);
  return {
    post: post.data,
    tagPosts: tagPosts.data.items,
  };
};

export default editBlog;
