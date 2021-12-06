import React from "react";
import styles from "./Question.module.css";
import moment from "moment";
import { Button, Comment, Form, Header } from "semantic-ui-react";

function QuestionComment({ comment }) {
  return (
    <div className={styles.questionCardComment}>
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

export default QuestionComment;
