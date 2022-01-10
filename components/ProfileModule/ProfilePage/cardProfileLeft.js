import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Popup, Icon } from "semantic-ui-react";
import { useAuth } from "../../../contexts/auth";
import styles from "./CardProfile.module.scss";
import Client from "../../../services/Client";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function CardProfileLeft({ userAcc, trainers }) {

  console.log("usss", userAcc);
  const [email, setEmail] = useState(userAcc.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userAcc.phoneNumber || "");
    // const [avatar, setAvatar] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  const setAvatar = async (item) => {
    let formdata = new FormData();
    let selectedFile = item.target.files[0];
    // formdata.append("file", url);
    formdata.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    const { data } = await Client(`upload`, "POST", formdata, "multipart/form-data");

    if (data && data.url){
      Update(data.url);
    }
  };

  const Update = (url) => {
    let updateUser = {
      avatarUrl: url,
    };
    Client(`user/${userAcc.id}`, "PATCH", updateUser) 
      .then(({ data }) => {
        NotificationManager.success(
          "Change avatar success",
          "Success"
        );
        router.push(`/profile/${userAcc.id}`);
      })
      .catch((error) => {
      });
  };

  return (
    <div>
      <div className={styles.cardProfileLeftWrapper}>
        {user && user.id && user.id === userAcc.id ? (
          <div className={styles.topIcons}>
            <Link href={`/profile/${userAcc.id}/settings`}>
              <a>
                <Popup
                 trigger={<i className="fas fa-cogs" style={{color: "#fff"}}></i>}
                  content="Setting profile"
                  basic
                />
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className={styles.profile}>
          <img
            src={userAcc.avatarUrl}
            alt="avatar"
            className={styles.thumbnail}
          />
            <div className={styles.buttonAddAvatar}>
            <label for="file-input">
              <Icon style={{ margin: "0", cursor: "pointer"}} name="plus" />
            </label>

            <input id="file-input" type="file" style={{ display: "none"}}  onChange={(e) => setAvatar(e)} 
              onClick={(event)=> {
                event.target.value = null }}/>
          </div>
          {/* <button className={styles.buttonAddAvatar}><Icon style={{margin: "0"}} name="plus" /></button> */}
          <h3 className={styles.name}>
            <Link href={`/profile/${userAcc.id}`}>
              <a>{userAcc.name}</a>
            </Link>
          </h3>
          <p className={styles.title}> {email} </p>
          <p className={styles.description}>{phoneNumber}</p>
        </div>
        <div className={styles.socialIcons}>
          <div className={styles.icon}>
          <h3>{userAcc.posts.length}</h3>
            <p>Blogs</p>
          </div>
          <div className={styles.icon}>
          <h3>0</h3>
            <p>Classes</p>
          </div>
          <div className={styles.icon}>
          <h3>{userAcc.questions.length}</h3>
            <p>Questions</p>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default CardProfileLeft;
