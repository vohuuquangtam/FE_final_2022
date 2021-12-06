import React from "react";
import SearchTrainer from "../../components/SearchModule/SearchTrainer";
import CardTrainerPage from "../../components/TrainersPage/CardTrainerPage/CardTrainerPage";
import Client from "../../services/Client";
import styles from "../../styles/Home.module.css";

const search = ({ data, query }) => {
  const { users } = data;
  return (
    <div
      style={{ width: "100%" }}
      className={`${styles.container} ${styles.homeGrid}`}
    >
      <div
        style={{
          width: "100%",
          paddingTop: "20px",
          paddingLeft: "20px",
          fontSize: "1.2rem",
          gridColumn: "1/3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>Key word:</span>{" "}
              {query["key"]}
            </div>
            <SearchTrainer />
        </div>
      </div>
      <div style={{ width: "100%", paddingLeft: "20px", gridColumn: "1/3" }}>
        <div className={styles.SearchUser}>
          {users &&
            users
              .filter((item) => item.roles.indexOf("TRAINER") !== -1)
              .map((user, id) => {
                return <CardTrainerPage user={user} key={id} />;
              })}
        </div>
      </div>
    </div>
  );
};

search.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { data } = await Client(
    `search?key=${encodeURIComponent(query["key"])}&scope=${encodeURIComponent(
      `["USER"]`
    )}`,
    "GET"
  );
  return { data, query };
};

export default search;
