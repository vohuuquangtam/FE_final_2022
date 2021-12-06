import React from 'react'
import BlogsPage from '../../containers/BlogsPage'
import styles from "../../styles/Home.module.css";
import axios from 'axios';
import Client from '../../services/Client';

function blogs({posts, tagPosts}) {
    return (
      <div className={styles.container}>
        <BlogsPage posts={posts} tagPosts={tagPosts} />
      </div>
    )
}

blogs.getInitialProps = async () => {
  const [posts, tagPosts] = await Promise.all([
    Client('posts'),
    Client('tag-post'),
  ])
  return {
    posts: posts.data.items,
    tagPosts: tagPosts.data.items,
  }
}

export default blogs;