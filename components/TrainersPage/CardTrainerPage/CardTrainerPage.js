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
      
      <div className={styles.topTrainerSkills}>
      <h3 className={styles.topTrainerName} style={{textAlign: 'center'}}>
          <Link href={`/profile/${user.id}`}>
            <a style={{color: '#fff'}}>{user.name}</a>
          </Link>
        </h3>
        <div style={{display: "flex", justifyContent: 'center'}}>
          <p>Email: {user.email}</p>
        </div>
        <div className={styles.topTrainerButton} style={{display: 'flex', justifyContent: 'center', marginTop: '18px'}}>
            <button className={styles.primary}>Follow</button>
        </div>
      </div>
    </div>
  );
}

export default CardTrainerPage;
