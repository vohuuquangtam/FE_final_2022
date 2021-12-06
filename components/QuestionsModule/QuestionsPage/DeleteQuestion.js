import React, { useState, useEffect } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import styles from "./CardQuestionPage.module.scss";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";

function DeleteQuestion({ question }) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const Delete = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`question/${question.id}`, "DELETE", {}).then(({ data }) => {
        router.push("/questions");
      });
    }
  };

  return (
    <>
      <Button color="red" animated="vertical" onClick={show}>
        <Button.Content visible>Delete</Button.Content>
        <Button.Content hidden>
          <Icon name="delete" />
        </Button.Content>
      </Button>
      <Confirm
        open={open}
        onCancel={handleCancel}
        onConfirm={(e) => {
          Delete(e);
          handleCancel();
        }}
      />
    </>
  );
}

export default DeleteQuestion;
