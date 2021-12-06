import React from 'react';
import TrainerPage from '../../containers/TrainerPage';
import Client from '../../services/Client';
import styles from '../../styles/Home.module.css';

function trainers({users}) {
    return (
      <div className={styles.container}>
        <TrainerPage users={users} />
      </div>
    );
}

trainers.getInitialProps = async () => {
  const {data} = await Client('trainers');
  return { users: data.items.map(e => e.user) };
}

export default trainers;
