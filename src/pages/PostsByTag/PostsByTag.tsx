import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import {
  getFindByTagSelector,
  getPostsByTagSelector,
} from '../../redux/selectors/selectors'
import styles from './PostsByTag.module.scss'

export const PostsByTag: FC = () => {
  const posts = useAppSelector(getPostsByTagSelector)
  const findByTag = useAppSelector(getFindByTagSelector)

  const postItems = posts.map((post) => (
    <Link className={styles.post_link} key={post._id} to={`/posts/${post._id}`}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.info}>
            <div className={styles.main_tag}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                <path d='M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' />
              </svg>
              {findByTag}
            </div>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.description}>
              {post.text.substring(0, 150) + '...'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  ))
  return (
    <main className={styles.root}>
      <h1>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
          <path d='M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z' />
        </svg>
        {findByTag}
      </h1>
      <div className={styles.columns}>{postItems}</div>
    </main>
  )
}
