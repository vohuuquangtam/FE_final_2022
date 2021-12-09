import React from "react";
import styles from "./Question.module.css";
import moment from "moment";
import Link from "next/link";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import DeleteQuestion from "../QuestionsPage/DeleteQuestion";

function Question({ question }) {
  const { user } = useAuth();

  const { id } = question;
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <div className={styles.questionAva}>
          <Link href={`/profile/${question.author.id}`}>
            <a>
              <figure className={styles.questionThumbImage}>
                <img
                  src={question.author.avatarUrl}
                  alt="iconQuestion"
                  style={{ width: "65px", borderRadius: "50%", border: 'solid' }}
                />
              </figure>
            </a>
          </Link>
        </div>
        <div className={styles.questionTitle}>
          <h3 className={styles.questionTitleContent}>
            <Link href={`/questions/${id}`}>
              <a>{question.title}</a>
            </Link>
          </h3>
          <span className={styles.questionAuthor}>
            <span>
              <Link href={`/profile/${question.author.id}`}>
                <a>{question.author.name}</a>
              </Link>
            </span>
            <p>asked {moment(question.createdAt).format("LLL")}</p>
          </span>
        </div>
        <div className={styles.questionThumb}>
          <figure className={styles.questionThumbImage}>
            <img
              src="/static/iconQuestion.png"
              alt="iconQuestion"
              style={{ width: "30px" }}
            />
          </figure>
          {user && user.id && question.author.id === user.id ? (
            <>
              <Dropdown
                pointing="top right"
                icon={null}
                trigger={<i className="fas fa-ellipsis-h"></i>}
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link href={`/questions/${id}/edit`}>
                      <a>
                        <Button fluid color="grey" animated="vertical">
                          <Button.Content visible>Edit</Button.Content>
                          <Button.Content hidden>
                            <Icon name="edit" />
                          </Button.Content>
                        </Button>
                      </a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <DeleteQuestion question={question} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.questionButton}>
        <div className={styles.dum}></div>

        {question.tags &&
          question.tags.map((tag, index) => {
            return (
              <button key={index} className={styles.buttonLink}>
                <Link href={`/questions/tag-question/${tag.id}`}>
                  <a>{tag.name}</a>
                </Link>
              </button>
            );
          })}
      </div>

      <div className="classContent">
        <p className={styles.questionDescript}>{question.content}</p>
        <div className={styles.questionMore}>
          <button className={styles.buttonPrimary}>
            <Link href={`/questions/${id}`}>
              <a>
              <i className="fa fa-info-circle"></i> Read more
              </a>
            </Link>
          </button>
        </div>

        {question.comments && (
          <div className={styles.questionMeta}>
            <button
              className={`${styles.questionMetaCommon} ${styles.questionMetaLike}`}
            >
              <i className="far fa-thumbs-up"> </i>
              <span>0 like</span>
            </button>
            <button
              className={`${styles.questionMetaCommon} ${styles.questionMetaComment}`}
            >
              <Link href={`questions/${question.id}`}>
                <a>
                  <i className="far fa-comment"></i>
                  <span>
                    {question.comments.length} comment
                    {question.comments.length > 1 ? "s" : ""}
                  </span>
                </a>
              </Link>
            </button>

            {/* <button
              className={`${styles.questionMetaCommon} ${styles.questionMetaShare}`}
            >
              <i className="far fa-share"></i>
              <span>0 shares</span>
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
