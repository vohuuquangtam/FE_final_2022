import React from 'react';
import SearchBlog from '../../SearchModule/SearchBlog';
import PostPage from '../CardPosts/PostPage';
import styles from "./CardBlogPage.module.scss";
import CreateBlog from './CreateBlog';

function CardBlogLeft({posts}) {
    return (
      <div className={styles.cardBlogsLeft}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px', width: '100%', position: 'absolute', top: '0', paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', backgroundColor: 'rgb(126 121 121 / 25%)', zIndex: '1'}}>
          <h2 style={{ color: '#8860d0'}}>All Blogs</h2>
          <SearchBlog />
          <CreateBlog />
        </div>
        <div style={{ position: "relative", overflow: "hidden", background: "transparent", marginBottom: "10px"}}>
          <img className={styles.imageClass} src="/static/back-blog.jpg" width="100%"/>
        </div>
        <div className={styles.cardBlogLeftMap}>
            {posts.map((post, id) => {
              return <PostPage post={post} key={id} />;
            })}
        </div>
      </div>
    );
}

export default CardBlogLeft;
