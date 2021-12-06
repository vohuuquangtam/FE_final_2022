import Link from "next/link";
import React from "react";
import styles from "./CardTrainerPage.module.css";

function CardTrainerPage({ user }) {
  return (
    <div className={styles.topTrainerCardContainer}>
      <img
        className={styles.round}
        src={user.avatarUrl}
        alt="user"
        width="90px"
      />
      <h3 className={styles.topTrainerName}>
        <Link href={`/profile/${user.id}`}>
          <a>{user.name}</a>
        </Link>
      </h3>
      <div className={styles.topTrainerButton}>
        <button className={styles.primary}>Follow</button>
      </div>
      <div className={styles.topTrainerSkills}>
        <h4>Email</h4>
        <ul>
          <li>{user.email}</li>
        </ul>
      </div>
    </div>
  );
}

export default CardTrainerPage;
