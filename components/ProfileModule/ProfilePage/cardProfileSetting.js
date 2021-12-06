import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Tab } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";

const fileInputRef = React.createRef();

const CardProfileSetting = ({ userAcc }) => {
  console.log("l11", userAcc);
  const router = useRouter();
  const { user } = useAuth();
  const { handleSubmit } = useForm();

  const allowEdit = user && user.id === userAcc.id;
  const [email, setEmail] = useState(userAcc.email || "");
  const [name, setName] = useState(userAcc.name);
  const [username, setUsername] = useState(userAcc.username);
  const [phoneNumber, setPhoneNumber] = useState(userAcc.phoneNumber || "");
  const [avatarUrl, setAvatarUrl] = useState(userAcc.avatarUrl);
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();

  useEffect(() => {
    if (user) setEmail(user.email);
    if (user) setPhoneNumber(user.phoneNumber);
  }, [user]);

  const Update = () => {
    let updateUser = {
      email,
      username,
      name,
      phoneNumber,
      avatarUrl,
    };
    console.log("l39", updateUser);
    if (password) updateUser.password = password;
    Client(`user/${userAcc.id}`, "PATCH", updateUser) 
      .then(({ data }) => {
        console.log("l43", data);
        router.push(`/profile/${userAcc.id}`);
      })
      .catch((error) => {
        console.log("kjui", error);
      });
  };

  const handleInputChange = async (e) => {
    setName(e.target.value);
  };

  const renderPanes = async () => {
    return [
      {
        menuItem: {
          key: "changeProfile",
          icon: "user",
          content: "Change Profile",
        },
        render: () => (
          <Tab.Pane attached={false}>
            {allowEdit ? (
              <Form unstackable onSubmit={handleSubmit(Update)}>
                <Form.Group widths={2}>
                  <Form.Input label="Email" value={email} disabled />
                  <Form.Input label="Username" value={username} disabled />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Field required>
                    <label>Name</label>
                    <Form.Input
                      required
                      value={name}
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                  <Form.Input
                    label="Phone Number"
                    value={phoneNumber}
                    type="text"
                    name="phoneNumber"
                    onChange={async (e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Field>
                <label>Avatar</label>
                    <Form.Input
                      required
                      value={avatarUrl}
                      type="text"
                      name="avatar"
                      onChange={async (e) => setAvatarUrl(e.target.value)}
                    />
                </Form.Field>
                </Form.Group>
                <Button color="linkedin" type="submit">
                  Submit
                </Button>
              </Form>
            ) : (
              ""
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "changePass",
          icon: "privacy",
          content: "Change Password",
        },
        render: () => (
          <Tab.Pane attached={false}>
            <Form>
              <Form.Field required>
                <label>Old Password</label>
                <Form.Input placeholder="old pass" required />
              </Form.Field>
              <Form.Field required>
                <label>New Password</label>
                <Form.Input placeholder="new pass" required />
              </Form.Field>
              <Form.Field required>
              <label>Repeat New Password</label>
                <Form.Input placeholder="repeat new pass" required />
              </Form.Field>
              <Button color="linkedin" type="submit">
                Confirm
              </Button>
            </Form>
          </Tab.Pane>
        ),
      },
    ];
  };

  const [panes, setPanes] = useState([]);

  useEffect(() => {
    renderPanes().then((components) => setPanes(components));
  }, [allowEdit, name, email, phoneNumber, avatarUrl]);

  return <Tab menu={{ secondary: true }} panes={panes} />;
};

export default CardProfileSetting;
