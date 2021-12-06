import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, List, Tab } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import Classe from "../../LearningModule/CardClasses/Class";
import ClassJoined from "../../LearningModule/CardClasses/ClassJoined";
import ScheduleTrainer from "../Schedule/ScheduleTrainer";
import ScheduleTrainee from "../Schedule/ScheduleTrainee";
import styles from "./CardProfile.module.scss";

const CardProfileRight = ({ userAcc, classes }) => {
  const { user } = useAuth();
  const allowEdit = user && user.id === userAcc.id;
  const allowShowClassManagement = (classe) => {
    return userAcc && userAcc.id === classe.trainer.user.id;
  };

  const renderPanes = async () => {
    const { data: currentUser } = await Client(`user/${userAcc.id}`, "GET", {});
    const { data: currentUserItem } = await Client(
      `trainee?userId=${userAcc.id} `,
      "GET"
    );

    return [
      {
        menuItem: { key: "blogs", icon: "blogger", content: "Blogs" },
        render: () => (
          <Tab.Pane attached={false}>
            <List divided verticalAlign="middle">
              {currentUser.posts.length > 0 ? (
                currentUser.posts.map((post, index) => {
                  return (
                    <List.Item
                      key={index}
                      style={{
                        marginBottom: "10px",
                        fontSize: "1.2rem",
                        fontFamily: "sans-serif, Roboto",
                      }}
                    >
                      {allowEdit ? (
                        <List.Content floated="right">
                          <Button>
                            <Link href={`/posts/${post.id}/edit`}>
                              <a>Edit</a>
                            </Link>
                          </Button>
                          <Button color="red">Delete</Button>
                        </List.Content>
                      ) : (
                        ""
                      )}

                      <List.Header>
                        <Link href={`/posts/${post.id}`}>
                          <a>{post.title}</a>
                        </Link>
                        <List.Description className={styles.ListDescription}>
                          {post.subTitle}
                        </List.Description>
                      </List.Header>
                    </List.Item>
                  );
                })
              ) : (
                <img
                  src="/static/nocontentyet.jpg"
                  alt="nocontent"
                  width="100%"
                />
              )}
            </List>
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "question",
          icon: "question circle",
          content: "Questions",
        },
        render: () => (
          <Tab.Pane attached={false}>
            <List divided verticalAlign="middle">
              {currentUser.questions.length > 0 ? (
                currentUser.questions.map((question, index) => {
                  return (
                    <List.Item
                      key={index}
                      style={{
                        marginBottom: "10px",
                        fontSize: "1.2rem",
                        fontFamily: "sans-serif, Roboto",
                      }}
                    >
                      {allowEdit ? (
                        <List.Content floated="right">
                          <Button>
                            <Link href={`/questions/${question.id}/edit`}>
                              <a>Edit</a>
                            </Link>
                          </Button>
                          <Button color="red">Delete</Button>
                        </List.Content>
                      ) : (
                        ""
                      )}

                      <List.Header>
                        <Link href={`/questions/${question.id}`}>
                          <a>{question.title}</a>
                        </Link>
                      </List.Header>
                    </List.Item>
                  );
                })
              ) : (
                <img
                  src="/static/nocontentyet.jpg"
                  alt="nocontent"
                  width="100%"
                />
              )}
            </List>
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: "classes", icon: "student", content: "Classes" },
        render: () => (
          <Tab.Pane attached={false}>
            <div className={styles.profileClasses}>
              <div className={styles.profileClassesLeft}>
                <h4 style={{ marginBottom: "20px" }}>Classes Management</h4>
                {classes.map((classe, id) => {
                  if (allowShowClassManagement(classe)) {
                    return <Classe classe={classe} key={id} />;
                  }
                })}
              </div>

              <div className={styles.profileClassesRight}>
                {allowEdit ? (
                  <div>
                    <h4 style={{ marginBottom: "20px" }}>Classes Joined</h4>
                    {currentUserItem.classes &&
                      currentUserItem.classes.map((classe, id) => {
                        if (classe) {
                          return <ClassJoined classe={classe} key={id} />;
                        } else return <div></div>;
                      })}
                  </div>
                ) : (
                  <div>
                    <h4 style={{ marginBottom: "20px" }}>Classes Joined</h4>
                    <img src="/static/nocontentyet.jpg" alt="nocontent" />
                  </div>
                )}
              </div>
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "schedule-trainer",
          icon: "calendar outline",
          content: "Schedule Trainer",
        },
        render: () => (
          <Tab.Pane attached={false}>
            <ScheduleTrainer user={userAcc} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "schedule-trainee",
          icon: allowEdit ? "calendar outline" : "",
          content: allowEdit ? "Schedule Trainee" : "",
        },
        render: () =>
          allowEdit ? (
            <Tab.Pane attached={false}>
              <ScheduleTrainee user={userAcc} />
            </Tab.Pane>
          ) : (
            <img src="/static/nocontentyet.jpg" alt="nocontent" width="100%" />
          ),
      },
    ];
  };

  const [panes, setPanes] = useState([]);

  useEffect(() => {
    renderPanes().then((components) => setPanes(components));
  }, [allowEdit]);

  return <Tab menu={{ secondary: true }} panes={panes} />;
};

export default CardProfileRight;
