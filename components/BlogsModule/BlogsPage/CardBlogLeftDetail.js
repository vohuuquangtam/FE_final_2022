import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Header } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import PostComment from "../CardPosts/PostComment";
import PostDetail from "../CardPosts/PostDetail";
import MdEditor from "../../MdEditor";
import styles from "./CardBlogPage.module.scss";

function CardBlogLeftDetail({ post, comments }) {
  const { handleSubmit } = useForm();
  const { user, loading } = useAuth();
  const [content, setContent] = useState();
  const router = useRouter();
  const { id } = post;

  const onSubmit = (e, v) => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`post/${id}/comment`, "POST", { content }).then(({ data }) => {
        router.push(`${id}`);
        setContent("");
      });
    }
  };
  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setContent(newValue);
  };
  return (
    <div className={styles.cardBlogsLeftDetail}>
      <div className={styles.cardBlogLeftHeader}>
        <Link href="/posts">
          <a>
          <i className="fas fa-chevron-left"></i>
            <span> Back</span>
          </a>
        </Link>
      </div>
      <PostDetail post={post} />
      <Header as="h3" dividing>
      Answer{comments.length > 1 ? "s" : ""}({comments.length})
      </Header>
      {comments.map((comment, id) => {
        return <PostComment comment={comment} key={id} />;
      })}
      <div style={{ margin: "20px 0" }}>
        <Form reply onSubmit={onSubmit}>
          <MdEditor value={content} onChange={handleEditorChange} />
          <div style={{ margin: "10px 0" }}>
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CardBlogLeftDetail;
