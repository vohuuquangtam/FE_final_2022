import React, { Component } from 'react'
import CardBlogRightDetail from '../components/BlogsModule/BlogsPage/CardBlogRightDetail';
import CardTagBlogDetail from '../components/BlogsModule/BlogsPage/CardTagBlogDetail';
import styles from '../styles/Home.module.css'


class TagBlogDetailPage extends Component {
  render() {
    return (
      <div className={styles.blogsPage}>
        <div style={{ width: "70%" }}>
          <CardTagBlogDetail {...this.props} />
        </div>
        <div style={{ width: "20%", marginLeft: "20px" }}>
          <CardBlogRightDetail {...this.props} />
        </div>
      </div>
    );
  }
}

export default TagBlogDetailPage;