import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Container } from '@mui/system'

import styles from './Footer.module.scss'
import { socialIcons } from './socialIcons.data'

export const Footer: FC = () => {
  return (
    <Container>
      <footer className={styles.root}>
        <div className={styles.left_side}>
          <h5>Sivakov Igor</h5>
          <p>Front-end Developer (ReactJS)</p>
        </div>

        <div className={styles.right_side}>
          {socialIcons.map((item) => (
            <Link to={item.link}>{item.Icon}</Link>
          ))}
        </div>
      </footer>
    </Container>
  )
}
