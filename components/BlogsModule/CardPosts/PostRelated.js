import React, { useEffect, useState } from "react";
import styles from "./Post.module.scss";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";
import Client from "../../../services/Client";
import moment from "moment";

function PostRelated(props) {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const userID = user && user.id;

  const getDataFromAPI = async () => {
    const response = await Client(`recommender/for?userId=${userID}`, "GET")
      .then((res) => {
        return res.data
          .filter((item) => item.itemType === "post")
          .map((item) =>
            Client(`post/${item.itemId}`, "GET")
              .then((res) => res.data)
              .catch((err) => {})
          );
      })
      .catch((err) => err);
    const data = await Promise.all(
      response.map(async (item) => {
        return await item.then((result) => result);
      })
    );
    //return data;
    setData(data);
  };

  const getDataPost = async () => {
    const dataPost = await Client(`posts?page=1&limit=5&order=ASC`, "GET").then(
      (res) => {
        return res.data.items;
      }
    );
    setDataPost(dataPost);
    {
      console.log("l37", dataPost);
    }
  };
  useEffect(() => {
    getDataFromAPI();
    getDataPost();
  }, []);
  return (
    <>
      {data && data.length === 0 ? (
        <>
        <div className={styles.ourTeam}>
              <h3>Oldest Blogs</h3>
              {dataPost.map((datPost, idx) => (
         
         <>
           <div key={idx} className={styles.recentPostsContent}>
             <div className={styles.recentPostsImageWrapper}>
               <Link href={`/posts/${datPost.id}`}>
                 <img src={datPost.featuredImage} alt="avt" />
               </Link>
                    </div>
                    <div className={styles.recentPostsContentWrapper}>
                      <div className={styles.postTitle}>
                        <h4>
                          <Link href={`/posts/${datPost.id}`}>
                            <a> {datPost.title} </a>
                          </Link>
                        </h4>
                      </div>
                      <div className={styles.metaWrapper}>
                        <span>{moment(datPost.createdAt).format("lll")}</span>
                      </div>
                      <div className={styles.nameWrapper}>
                        <span>
                          <Link href={`/profile/${datPost.author.id}`}>
                            <a> @{datPost.author.name} </a>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                
                </>
                ))}
                </div>
        </>
      ) : (
        <>
          <h3>Recommend For You</h3>
          {data.map((dat, id) => (
            <div key={id} className={styles.recentPostsContent}>
              <div className={styles.recentPostsImageWrapper}>
                <Link href={`/posts/${dat.id}`}>
                  <img src={dat.featuredImage} alt="avt" />
                </Link>
              </div>
              <div className={styles.recentPostsContentWrapper}>
                <div className={styles.postTitle}>
                  <h4>
                    <Link href={`/posts/${dat.id}`}>
                      <a> {dat.title} </a>
                    </Link>
                  </h4>
                </div>
                <div className={styles.metaWrapper}>
                  <span>{moment(dat.createdAt).format("lll")}</span>
                </div>
                <div className={styles.nameWrapper}>
                  <span>
                    <Link href={`/profile/${dat.author.id}`}>
                      <a> {dat.author.name} </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default PostRelated;
