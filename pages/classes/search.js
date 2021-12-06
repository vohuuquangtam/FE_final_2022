import React from "react";
import SearchClass from "../../components/SearchModule/SearchClass";
import Client from "../../services/Client";
import Class from "../../components/LearningModule/CardClasses/Class"
import styles from "../../styles/Home.module.css";

const search = ({ data, query }) => {
  const { classes } = data;
  console.log("classes", classes);
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>Key word:</span>
            {query["key"]}
          </div>
          <SearchClass />
        </div>
      </div>
      <div style={{ width: "100%", paddingLeft: "20px", gridColumn: "1/3" }}>
        {classes &&
          classes.map((classe, id) => {
            return <Class classe={classe} key={id} />;
          })}
      </div>
    </div>
  );
};

search.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { data } = await Client(
    `classes?page=1&limit=20&order=DESC&key=${encodeURIComponent(query)}`,
    "GET"
  );
    {console.log("data", data);}
  return { data, query };
};

export default search;