import React from 'react'
import styles from '../../styles/Home.module.css'
import ClassesPage from '../../containers/ClassesPage'
import Client from '../../services/Client'
function classes({classes}) {
  return (
    <div className={styles.container}>
      <ClassesPage classes={classes} />
    </div>
  )
}

classes.getInitialProps = async () => {
  const {data} = await Client("classes")
  return {classes: data.items} 
}

export default classes;
