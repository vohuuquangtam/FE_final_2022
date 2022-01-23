import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import ThirdPartyClient from "../../../services/ThirdPartyClient";
import DatePickerPage from "../../DatePicker";
import styles from "./CardTopicsPage.module.scss";

function CreateClass(props) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [featuredvideo, setFeaturedVideo] = useState(null);

  const [options, setOptions] = useState([]);
  const [topic, setTopic] = useState("");

  const GetTopic = async () => {
    let { data } = await Client("topics", "GET");
    data = data.items;
    return data.map((e) => {
      return {
        key: e.id,
        text: e.name,
        value: e.id
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setOptions(await GetTopic());
    };
    fetchData();
  }, []);

  const setVideo = async (item) => {
    let formdata = new FormData();
    let selectedFile = item.target.files[0];
    // formdata.append("file", url);
    formdata.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    const { data } = await ThirdPartyClient(`files/upload`, "POST", formdata, "multipart/form-data");

    if (data && data.fileDownloadUri){
      setFeaturedVideo(data.fileDownloadUri);
    }
  };

  const Create = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client("classe", "POST", {
        name,
        topic: {
          id: topic
        },
        description,
        featuredImage,
        featuredvideo,
        duration: Number(duration),
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      }).then(({ data }) => {
        setName("");
        setDescription("");
        setFeaturedImage("");
        setDuration(0);
        setStartTime("");
        setEndTime("");
        router.push("/topics");
      }).catch((error) => {
        console.log('ERR', error);
      });
    }
  };

  return (
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className={styles.cardTopicsLeftButton}>Create Class</button>
      }
    >
      <Modal.Header>Create Class</Modal.Header>
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
          <Form.Group widths="equal">
            <Form.Field>
              <label>Topic</label>
              <Dropdown
                placeholder="Choose Topic"
                fluid
                search
                selection
                options={options}
                onChange={(e, {value}) => {setTopic(value)}}
              />
            </Form.Field>
            <Form.Field>
              <label>Duration (hours)</label>
              <input
                placeholder="number of sessions"
                value={duration}
                type="number"
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
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
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
                <label>Video</label>
                <input id="file-input"
                  type="file"
                  placeholder="upload video"
                  onChange={(e) => setVideo(e)}
                />
              </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Time Start</label>
              <DatePickerPage
                value={startTime}
                onChange={(date) => setStartTime(date)}
              />
            </Form.Field>
            <Form.Field>
              <label>Time End</label>
              <DatePickerPage
                value={endTime}
                onChange={(date) => setEndTime(date)}
              />
            </Form.Field>
          </Form.Group>
          <div style={{ marginTop: "20px" }}>
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
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default CreateClass;
