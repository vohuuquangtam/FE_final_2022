import React from 'react';
import ProfileSettingPage from '../../../containers/ProfileSettingPage';
import Client from '../../../services/Client';
import styles from '../../../styles/Home.module.css'

function settings({userAcc, trainers}) {
  return (
    <div className={styles.settingContainer}>
      <ProfileSettingPage userAcc={userAcc} trainers={trainers} />
    </div>
  );
}

settings.getInitialProps = async ({ query: {id} }) => {
  const [userAcc, trainers] = await Promise.all([
    Client(`user/${id}`),
    Client('trainers')
  ]);
  return {
    userAcc: userAcc.data,
    trainers: trainers.data.items
  };
};

export default settings;