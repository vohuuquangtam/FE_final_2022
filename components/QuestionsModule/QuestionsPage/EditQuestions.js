import _ from "lodash";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import MdEditor from "../../MdEditor";
import styles from "./CardQuestionPage.module.scss";

function EditQuestion({ question }) {
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState(question.content);
  const [title, setTitle] = useState(question.title);
  const [tags, setTags] = useState(question.tags.map((item) => item.name));
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

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setContent(newValue);
  };

  const Update = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`question/${question.id}`, "PATCH", {
        title,
        content,
        tags: itemTags,
      }).then(({ data }) => {
        setTitle("");
        setContent("");
        setTags([""]);
        router.push("/questions");
      });
    }
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
        <h1>Edit Your Question</h1>
        <Form.Field>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
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
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <MdEditor value={content} onChange={handleEditorChange} />
        </Form.Field>
      </Form>
      <div style={{margin: '20px 0'}}>
        <Button color="youtube" content="Cancel" icon="close" />
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

export default EditQuestion;
