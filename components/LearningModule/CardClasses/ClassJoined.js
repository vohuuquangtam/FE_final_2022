import Link from "next/link";
import React from "react";
import { Icon } from "semantic-ui-react";
import styles from "./Class.module.scss";
function ClassJoined({ classe }) {
  return (
    <div className={styles.classCard}>
      <div className={styles.courseContentWrapper}>
        <div className={styles.courseThumbnail}>
          <img src={classe.featuredImage} alt="Class" />
        </div>
        <span className={styles.catLinks}>
          <Link href={`/topics/${classe.topic.id}/classes`}>
            <a>{classe.topic.name}</a>
          </Link>
        </span>
        <div className={styles.courseContent}>
          <div className={styles.courseInfo}>
            <Link href={`/profile/${classe.trainer.id}`}>
              <a>
                <img
                  alt="Admin bar avatar"
                  src={classe.trainer.user.avatarUrl}
                />
              </a>
            </Link>

            <div className={styles.courseInstructor}>
              <Link href={`/profile/${classe.trainer.user.id}`}>
                <a>{classe.trainer.user.name}</a>
              </Link>
            </div>
            <Link href={`/classes/${classe.id}`}>
              <a>
                <h3 className={styles.courseTitle}>{classe.name}</h3>
              </a>
            </Link>
          </div>
          <div className={styles.courseDivider}></div>
          <div className={styles.courseMeta}>
            {/* <span className={styles.courseStudents} title="students enrolled">
              <Icon name="user" /> {classe.members.length}
            </span> */}
            <div className={styles.lpCourseButtons}>
              <button>Free</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassJoined;
