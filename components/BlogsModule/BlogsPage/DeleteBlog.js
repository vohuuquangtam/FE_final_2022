import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";

function DeleteBlog({ post }) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const Delete = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`post/${post.id}`, "DELETE", {}).then(({ data }) => {
        router.push("/posts");
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

export default DeleteBlog;
