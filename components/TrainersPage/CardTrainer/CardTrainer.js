import Link from "next/link";
import React from "react";
import styles from "./CardTrainer.module.css";
function CardTrainer({ user }) {
  return (
    <div className={styles.topTrainerCardContainer}>
      <img
        className={styles.round}
        src={user.avatarUrl}
        alt="user"
        width="90px"
      />
      <h3>
        <Link href={`/profile/${user.id}`}>
          <a>{user.name}</a>
        </Link>
      </h3>
      <div className={styles.topTrainerButton}>
        <button className={styles.primary}>Follow</button>
      </div>
      <div className={styles.topTrainerSkills}>
        <h4>Information</h4>
        <ul>
          <li>{user.email}</li>
        </ul>
      </div>
    </div>
  );
}

export default CardTrainer;
