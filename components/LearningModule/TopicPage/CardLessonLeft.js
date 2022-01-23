import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  Icon,
  Image,
  Label,
  List,
  Tab,
} from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import DatePickerPage from "../../DatePicker";
import styles from "./CardTopicsPage.module.scss";

export default function CardLessonLeft({ classe, lessons }) {
  const router = useRouter();
  const { user } = useAuth();
  const [panes, setPanes] = useState([]);
  const [activeIndex, setActiveIndex] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState("");

  const Create = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`classe/${classe.id}/lesson`, "POST", {
        name,
        duration: Number(duration),
        startTime: new Date(startTime).toISOString(),
      })
        .then(({ data }) => {
          setName("");
          setDuration(0);
          setStartTime("");
          router.push(`/classes/${classe.id}`);
        })
        .catch((error) => {
          console.log("ERR", error);
        });
    }
  };

  const Reset = () => {
    setName("");
    setDuration(0);
    setStartTime("");
    router.push(`/classes/${classe.id}`);
  };

  const setAvatar = async (item) => {
    let formdata = new FormData();
    let selectedFile = item.target.files[0];
    // formdata.append("file", url);
    formdata.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    const { data } = await Client(`upload`, "POST", formdata, "multipart/form-data");

    if (data && data.url){
      Update(data.url);
    }
  };

  const Update = (url) => {
    let updateUser = classe;
    updateUser.featuredImage = url;
    Client(`classe/${classe.id}`, "PATCH", updateUser) 
      .then(({ data }) => {
        NotificationManager.success(
          "Change thumbnail success",
          "Success"
        );
        router.push(`/classes`);
      })
      .catch((error) => {
      });
  };

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex;

    const currentIndexPosition = activeIndex.indexOf(index);
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
      newIndex.push(index);
    }
    // const newIndex = activeIndex === index ? -1 : index

    setActiveIndex({ activeIndex: [newIndex] });
  };

  const renderPanes = async () => {
    console.log(activeIndex);
    return [
      {
        menuItem: "Lessons",
        render: () => (
          <Tab.Pane attached={false}>
            <Accordion fluid styled>
              {lessons.map((lesson, id) => {
                return (
                  <div key={id}>
                    <Accordion.Title
                      active={activeIndex.includes(id)}
                      index={id}
                      onClick={handleClick}
                    >
                      <Icon name="dropdown" />
                      <span
                        style={{ textTransform: "uppercase", color: "#50009d" }}
                      >
                        {lesson.name}
                      </span>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex.includes(id)}>
                      <p>
                      <span style={{ fontWeight: "bold", color: "#2e9cca" }}>
                          Duration
                        </span>
                        : {lesson.duration} minutes
                      </p>
                      <p>
                      <span style={{ fontWeight: "bold", color: "#2e9cca" }}>
                          Time start
                        </span>
                        : {moment(lesson.startTime).format("lll")}
                      </p>
                    </Accordion.Content>
                  </div>
                );
              })}
            </Accordion>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Members",
        render: () => (
          <Tab.Pane attached={false}>
            <List divided selection>
              {classe.members.map((member, id) => {
                console.log("L118", member);
                return (
                  <List.Item key={id}>
                    <Label horizontal>
                      <Image
                        src={member.user.avatarUrl}
                        avatar
                        alt="avtMember"
                      />
                    </Label>
                    <Link href={`/profile/${member.user.id}`}>
                      <a>
                        <span>{member.user.name}</span>
                      </a>
                    </Link>
                    <p> {member.user.email} </p>
                  </List.Item>
                );
              })}
            </List>
          </Tab.Pane>
        ),
      },
    ];
  };
  useEffect(() => {
    renderPanes().then((components) => setPanes(components));
  }, []);
  return (
    <div className={styles.cardTopicsLeft}>
      <h3>
        <Link href="/classes">
          <a>
            <Icon name="angle left" />
            <span>Back to Classes</span>
          </a>
        </Link>
      </h3>
      <div className={styles.cardAllLesson}>
        <h1 className={styles.courseTitle}>{classe.name}</h1>
        <div className={styles.courseMeta}>
          <span className={styles.courseAuthor}>
            <Link href={`/profile/${classe.trainer.user.id}`}>
              <a>
                <img
                  alt="Admin bar avatar"
                  src={classe.trainer.user.avatarUrl}
                  className="avatar avatar-96 photo"
                  height="96"
                  width="96"
                />
              </a>
            </Link>
            <span className={styles.authorData}>
              <span className={styles.metaTitle}>Trainer</span>
              <span className="meta_data">
                <Link href={`/profile/${classe.trainer.user.id}`}>
                  <a>{classe.trainer.user.name}</a>
                </Link>
              </span>
            </span>
          </span>
          <span className={styles.courseCategory}>
            <i className="far fa-folder"></i>
            <span className={styles.catData}>
              <span className={styles.metaTitle}>Topic</span>
              <Link href={`/topics/${classe.topic.id}/classes`}>
                <a>
                  <span className="meta_data">
                    <span className="cat-links">{classe.topic.name}</span>
                  </span>
                </a>
              </Link>
            </span>
          </span>
        </div>
        <div className={styles.courseThumbnail} style={{position: 'relative'}}>
          <img src={classe.featuredImage} alt="lessonThumbnail" />
          <div className={styles.buttonAddAvatar}>
            <label for="file-input">
              {/* <Icon style={{ margin: "0", cursor: "pointer"}} name="plus" /> */}
              Change thumbnail
            </label>

            <input id="file-input" type="file" style={{ display: "none"}}  onChange={(e) => setAvatar(e)} 
              onClick={(event)=> {
                event.target.value = null }}/>
          </div>
        </div>
        <div>
          <Tab
            className={styles.CardLessonLeftTab}
            menu={{ secondary: true }}
            panes={panes}
          />
        </div>
        {user && user.id === classe.trainer.user.id ? (
          <Form>
            <Form.Field required>
              <label>Lesson Name</label>
              <input
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Duration (minutes)</label>
                <input
                  required
                  type="number"
                  placeholder="duration class"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Time Start</label>
                <DatePickerPage
                  value={startTime}
                  onChange={(date) => setStartTime(date)}
                />
              </Form.Field>
            </Form.Group>
            <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
              <Button
                color="youtube"
                content="Reset"
                icon="close"
                onClick={(e) => {
                  Reset(e);
                }}
              />
              <Button
                content="Submit"
                labelPosition="right"
                icon="checkmark"
                onClick={(e) => {
                  Create(e);
                }}
                positive
              />
            </div>
          </Form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
