import _ from "lodash";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import MdEditor from "../../MdEditor";
import styles from "./CardQuestionPage.module.scss";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function CreateQuestion({ questions }) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [itemTags, setItemTags] = useState([]);

  // const requestTagAPI = () => {
  //   if (content)
  //     Client("tag-predict", "POST", { predict: content }).then(({ data }) => {
  //       setTags(_.uniq([...tags, ...data.results]));
  //     });
  // };

  // const delayedQuery = useCallback(debounce(requestTagAPI, 1000), [content]);

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setContent(newValue);
  };

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
    // delayedQuery();
    // return delayedQuery.cancel;
  }, [content]);


  const Create = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client("question", "POST", { title, content, tags: itemTags }).then(
        ({ data }) => {
          setTitle("");
          setContent("");
          setTags([]);
          router.push("/questions");
        }
      ).catch((err) => {
        if(err.message[0]){
          NotificationManager.error(
            "Title should not be empty"
          )
        }
        // NotificationManager.error(
        //   console.log("L66", err.message[3]),
        //   "Unsuccessful",
        //   "Error"
        // );
      });
    }
  };

  const Cancel = () => {
    setTitle("");
    setContent("");
    setTags([]);
    router.push("/questions");
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
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className={styles.askQuestion}>+ Create Question</button>
      }
    >
      <Modal.Header>Create Question</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field required>
            <label>Title</label>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field required>
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
          <Form.Field required>
            <label>Content</label>
            <MdEditor value={content} onChange={handleEditorChange} />
          </Form.Field>
        </Form>
        <div style={{ marginTop: "20px" }}>
          <Button
            color="youtube"
            content="Cancel"
            icon="close"
            onClick={(e) => {
              Cancel(e), setOpen(false);
            }}
          />
          <Button
            content="Publish"
            labelPosition="left"
            icon="checkmark"
            onClick={(e) => {
              Create(e), setOpen(false);
            }}
            positive
          />
        </div>
      </Modal.Content>
    </Modal>
    <NotificationContainer />
    </>
  );
}

export default CreateQuestion;
