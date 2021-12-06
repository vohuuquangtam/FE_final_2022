import React from "react";
import styles from "./Post.module.scss";
import moment from "moment";
import {Comment } from "semantic-ui-react";

function PostComment({ comment }) {
  return (
    <div className={styles.postCardComment}>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src={comment.author.avatarUrl} />
          <Comment.Content>
            <Comment.Author as="a">{comment.author.name}</Comment.Author>
            <Comment.Metadata>
              <div>{moment(comment.createdAt).format("LLL")}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.content}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default PostComment;
