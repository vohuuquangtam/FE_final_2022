import _ from "lodash";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import MdEditor from "../MdEditor";
import styles from "./CardBlogPage.module.scss";

function EditBlog({ post }) {
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [subTitle, setSubTitle] = useState(post.subTitle);
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage);
  const [tags, setTags] = useState(post.tags.map((item) => item.name));
  const [itemTags, setItemTags] = useState([]);

  const requestTagAPI = () => {
    if (content)
      Client("tag-predict", "POST", { predict: content }).then(({ data }) => {
        setTags(_.uniq([...tags, ...data.results]));
      });
  };

  const delayedQuery = useCallback(debounce(requestTagAPI, 1000), [content]);

  useEffect(() => {
    setItemTags(
      tags.map((item) => {
        return {
          name: item,
        };
      })
    );
  }, [tags]);
  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [content]);

  const Update = () => {
    console.log("l43", tags);
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`post/${post.id}`, "PATCH", {
        title,
        content,
        subTitle,
        featuredImage,
        isDraft: true,
        tags: itemTags,
      }).then(({ data }) => {
        setTitle("");
        setContent("");
        setTags([""]);
        router.push("/posts");
      });
    }
  };
  const Cancel = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      router.push(`/posts/${post.id}`);
    }
  };

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setContent(newValue);
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <>
      <Form>
        <h1>Edit Your Blog</h1>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Sub Title</label>
          <input
            placeholder="Subtitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Upload Image</label>
          <Form.Input
            placeholder="Image"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
          />
          {/* <Button
              content="Choose Image"
              labelPosition="left"
              icon="image"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={this.fileChange}
            /> */}
        </Form.Field>
        <Form.Field>
          <label>Tags</label>
          <div className={styles.tagsInput}>
            <ul className={styles.tags}>
              {tags.map((tag, index) => (
                <li key={index} className={styles.tag}>
                  <span className={styles.tagTitle}>{tag}</span>
                  <span
                    className={styles.tagCloseIcon}
                    onClick={() => removeTags(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              onKeyUp={(event) =>
                event.key === "Enter" ? addTags(event) : null
              }
              placeholder="Press enter to add tags"
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <MdEditor value={content} onChange={handleEditorChange} />
        </Form.Field>
      </Form>
      <div style={{ margin: "20px 0" }}>
        <Button
          color="youtube"
          content="Cancel"
          icon="close"
          onClick={(e) => {
            Cancel(e);
          }}
        />
        <Button
          content="Update"
          labelPosition="left"
          icon="checkmark"
          onClick={(e) => {
            Update(e);
          }}
          positive
        />
      </div>
    </>
  );
}

export default EditBlog;
