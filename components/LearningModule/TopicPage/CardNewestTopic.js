import Link from "next/link";
import React from "react";
import { Button } from "semantic-ui-react";
import styles from "./CardTopicsPage.module.scss";

function CardNewestTopic({ topic }) {
    return (
        <div className={styles.newestTopicCard}>
          <div className={styles.topicMeta}>
            <div className={styles.topicPhoto}>
              <img
                src={topic.featuredImage}
                alt="topicPhoto"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className={styles.topicDescription}>
            <h3>{topic.name}</h3>
            <h4>{topic.author.user.name}</h4>
            <p>{topic.description}</p>
            <Link href={`/topics/${topic.id}/classes`}>
                <a>See all</a>
            </Link>
          </div>
        </div>
      );
}

export default CardNewestTopic;