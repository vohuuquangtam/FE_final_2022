import React, { Component } from 'react'
import CardBlogRight from '../components/BlogsPage/CardBlogRight';
import EditBlog from '../components/BlogsPage/EditBlog';
import styles from '../styles/Home.module.css'


class BlogsPage extends Component {
  render() {
    return (
      <div className={styles.blogsPage}>
        <div style={{ width: "70%" }}>
          <EditBlog {...this.props} />
        </div>
        <div style={{ width: "20%", marginLeft: "20px" }}>
          <CardBlogRight />
        </div>
      </div>
    );
  }
}

export default BlogsPage;