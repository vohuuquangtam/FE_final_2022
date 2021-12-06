import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import styles from "./CardTopicsPage.module.scss";

function CardLessonRight({ classe, lessons }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const Joined = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`classe/${classe.id}/register`, "GET").then(({ data }) => {
        router.push(`${classe.id}`);
      });
    }
  };

  const Leaved = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client(`classe/${classe.id}/deregister`, "GET").then(({ data }) => {
        router.push(`${classe.id}`);
      });
    }
  };

  return (
    <div className={styles.wglCourseEssentials}>
      <h3 className={styles.title}>
        Price:
        <span className={styles.coursePrice}>
          <span className={styles.price}>Free</span>
        </span>
      </h3>
      <ul>
        <li className={styles.students} title="21 students enrolled">
          <i className="fa fa-user"></i>
          <span className="value">
            {classe.members.length} Students Enrolled
          </span>
        </li>
        <li className="duration">
          <i className="fa fa-clock"></i>
          <span className="label">Duration:</span>
          <span className="value">{classe.duration} hours</span>
        </li>
        <li className="Sessions">
          <i className="fa fa-file"></i>
          <span className="label">Sessions:</span>
          <span className="value">{classe.lessons.length}</span>
        </li>
        <li className="certificate">
          <i className="fa fa-certificate"></i>
          <span className="value">Certificate of Completion</span>
        </li>
      </ul>
      <div className={styles.lpCourseButtons}>
        {user &&
        classe.members.map((item) => item.user.id).indexOf(user.id) !== -1 ? (
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            trigger={
              <button
                className={styles.buttonPurchaseCourse}
                title="Buy this course"
              >
                LEAVE THE CLASS
              </button>
            }
          >
            <Modal.Content>
              <p>Are you sure you want to leave the class?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" inverted onClick={() => setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="blue"
                inverted
                onClick={(e) => {
                  Leaved(e), setOpen(false);
                }}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        ) : (
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            trigger={
              <button
                className={styles.buttonPurchaseCourse}
                title="Buy this course"
              >
                JOIN NOW
              </button>
            }
          >
            <Modal.Content>
              <p>Are you sure you want to join the class?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" inverted onClick={() => setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="blue"
                inverted
                onClick={(e) => {
                  Joined(e), setOpen(false);
                }}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default CardLessonRight;
