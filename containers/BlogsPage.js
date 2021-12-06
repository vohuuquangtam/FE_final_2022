import React, { Component } from 'react'
import CardBlogLeft from '../components/BlogsModule/BlogsPage/CardBlogLeft';
import CardBlogRight from '../components/BlogsModule/BlogsPage/CardBlogRight';
import styles from '../styles/Home.module.css'


class BlogsPage extends Component {
  render() {
    return (
      <div className={styles.blogsPage}>
        <div style={{ width: "65%" }}>
          <CardBlogLeft {...this.props} />
        </div>
        <div style={{ width: "30%", marginLeft: "20px" }}>
          <CardBlogRight {...this.props} />
        </div>
      </div>
    );
  }
}

export default BlogsPage;