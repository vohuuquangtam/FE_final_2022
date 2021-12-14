import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Button, Form, Modal } from "semantic-ui-react";
import { useAuth } from "../../contexts/auth";
import Client from "../../services/Client";
import SearchTrainer from "../SearchModule/SearchTrainer";
import CardTrainerPage from "./CardTrainerPage/CardTrainerPage";
import styles from "./CardTrainers.module.css";
import Head from "next/head";
import Slider from "react-slick";
import Link from "next/link";

function CardTrainersLeft({ users }) {
  const breakPoints = [{ width: 200, itemsToShow: 3 }];
  const [open, setOpen] = React.useState(false);

  const [trainerProfile, setTrainerProfile] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const Confirm = () => {
    if (!user)
      router.push(`/sign-in?forward=${encodeURIComponent(router.asPath)}`);
    else {
      Client("trainer/register", "POST", { trainerProfile })
        .then(({ data }) => {
          setTrainerProfile("");
          router.push("/trainers");
          NotificationManager.success(
            "Please login again to use the trainer's functions",
            "Success"
          );
          setOpen(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  var imgList = [
    "/static/back-trainer-1.jpg",
    "/static/back-trainer-3.jpg",
    "/static/back-trainer-4.jpg",
  ]

  const caroselComponents = () => {
    return imgList.map((item, id) => {
          return (
            <img src={item} width="100%" key={id}/>
          );
    });
  };
  var settingsCarosels = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
    accessibility: false
  };

  return (
    <React.Fragment>
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
    </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className={styles.cardTrainersLefHeader}>All Trainers</h1>
        <SearchTrainer />
        {user && user.roles.indexOf("TRAINER") !== -1 ? (
          ""
        ) : (
          <div className={styles.cardTrainerPageRight}>
            <Modal
              size="tiny"
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <button className={styles.cardTrainerPageButton} color="teal">
                  Become a Trainer
                </button>
              }
            >
              <Modal.Header>Register Trainer</Modal.Header>
              <Modal.Content>
                <Form onSubmit={handleSubmit(Confirm)}>
                  <Form.Field required>
                    <label>Link Your CV</label>
                    <input
                      required
                      value={trainerProfile}
                      onChange={(e) => setTrainerProfile(e.target.value)}
                      ref={register}
                    />
                  </Form.Field>
                  <Button
                    type="submit"
                    content="Confirm"
                    labelPosition="left"
                    icon="checkmark"
                    positive
                  />
                </Form>
              </Modal.Content>
            </Modal>
          </div>
        )}
      </div>

      <div className={styles.caroselImg}>
      <div style={{ width: '100%' }}>
          <Slider {...settingsCarosels}>
              {caroselComponents()}
          </Slider>
        </div>
        <div style={{position: "absolute", top: "36%", left: "10%"}}>
          <h1 style={{textAlign: 'left', color: '#fff', fontSize: "40px"}}>
            <span>Find a Trainer</span> <br/> & Choose a Class Today.
          </h1>
          <button className={styles.cardTrainerPageButtonChoose} color="teal">
            <Link href="/classes">
              <a>Choose A Class</a>
            </Link>
          </button>      
        </div>
      </div>
      <div className={styles.cardTrainersLeftDetail}>
        {users.map((user, id) => {
          return <CardTrainerPage user={user} key={id} />;
        })}
      </div>
      <NotificationContainer />
      </React.Fragment>
  );
}

export default CardTrainersLeft;
