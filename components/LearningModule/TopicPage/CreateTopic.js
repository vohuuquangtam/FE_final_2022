import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
import Client from "../../../services/Client";
import styles from "./CardTopicsPage.module.scss";

function CreateTopic(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const Create = () => {
    Client("topic", "POST", {
      name,
      description,
      featuredImage,
    }).then(({ data }) => {
      setName("");
      setDescription("");
      setFeaturedImage("");
      router.push("/topics");
    });
  };
  return (
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className={styles.cardCreateTopicsLeftButton}>
          Create Topic
        </button>
      }
    >
      <Modal.Header>Create Topic</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="description class"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input
              placeholder="feature image"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="youtube"
          content="Cancel"
          icon="close"
          onClick={() => setOpen(false)}
        />
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={(e) => {
            Create(e), setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CreateTopic;
