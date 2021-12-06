import axios from 'axios';
import React from 'react'
import TopicsPage from '../../containers/TopicsPage';
import Client from '../../services/Client';
import styles from '../../styles/Home.module.css'

function topics({topics}) {
  return (
    <div className={styles.container}>
      <TopicsPage topics={topics} />
    </div>
  )
}

topics.getInitialProps = async () => {
  const [topics] = await Promise.all([
    Client("topics"),
  ]);
  return {
    topics: topics.data.items,
  };
};

export default topics;
