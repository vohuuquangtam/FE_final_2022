import React from 'react'
import ClassesOfTopicPage from '../../../containers/ClassesofTopicPage';
import Client from '../../../services/Client';

import styles from '../../../styles/Home.module.css'

function classes({classes}) {
  return (
    <div className={styles.container}>
      <ClassesOfTopicPage classes={classes} />
    </div>
  )
}

classes.getInitialProps = async ({ query: { id } }) => {
  const {data} = await Client(`topic/${id}/classes`)
  return {classes: data.items} 
}

export default classes;
