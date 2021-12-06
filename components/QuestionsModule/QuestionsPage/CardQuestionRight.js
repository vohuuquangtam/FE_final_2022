import Link from 'next/link';
import React, { Component } from 'react';
import QuestionRelated from '../CardQuestions/QuestionRelated';
import styles from './CardQuestionPage.module.scss'

class CardQuestionRight extends Component {
  render() {
    return (
      <div className={styles.cardQuestionRight}>
        <QuestionRelated />
        {/* <p className={styles.mostUsedTag}>Most Used Tags</p>
        <div className={styles.cardQuestionTagDetailRight}>
          <li>
            <button>
              <Link href="/"> web</Link>
            </button>
          </li>
          <li>
            <button>
              <Link href="/"> technology</Link>
            </button>
          </li>
          <li>
            <button>
              <Link href="/"> ReactJs</Link>
            </button>
          </li>
        </div> */}
      </div>
    );
  }
}

export default CardQuestionRight;