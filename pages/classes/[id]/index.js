import React from 'react';
import LessonPage from '../../../containers/LessonPage';
import Client from '../../../services/Client';
import styles from '../../../styles/Home.module.css';


function lessons({classe, lessons}) {
  return (
    <div className={styles.container}>
      <LessonPage classe={classe} lessons={lessons} />
    </div>
  )
}

lessons.getInitialProps = async ({query: {id}}) => {
  const [classe, lessons] = await Promise.all([
    Client(`classe/${id}`),
    Client(`classe/${id}/lessons`)
  ])
  return {
    classe: classe.data,
    lessons: lessons.data.items
  }
}

export default lessons;