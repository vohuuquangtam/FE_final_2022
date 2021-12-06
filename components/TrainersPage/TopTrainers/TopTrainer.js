import React from "react";
import styles from "./TopTrainer.module.css";
import Carousel from "react-elastic-carousel";
import CardTrainer from "../CardTrainer/CardTrainer";

function TopTrainer({users}) {
    const breakPoints = [
      { width: 200, itemsToShow: 1 },
      { width: 240, itemsToShow: 2 },
      { width: 400, itemsToShow: 3 },
    ];
    return (
      <div className={styles.topTrainerCard}>
        <Carousel
          className={styles.topTrainerHeader}
          breakPoints={breakPoints}
          showArrows={false}
          enableAutoPlay={true}
          pagination={true}
        >
          {users.map((user, id) => {
            return <CardTrainer user={user} key={id} />
          })}
        </Carousel>
      </div>
    );
}

export default TopTrainer;
