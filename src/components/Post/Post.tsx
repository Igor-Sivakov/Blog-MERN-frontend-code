import { FC, memo } from 'react'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Clear'
import { PostSkeleton } from './PostSkeleton'
import { APIAuthResponseType } from '../../API'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import {
  addFindByTag,
  fetchRemovePost,
  getPostsByTag,
} from '../../redux/slices/postsSlice'
import { getIsAuthSelector } from '../../redux/selectors/selectors'
import { UserInfo } from '../'
import styles from './Post.module.scss'

type PropsType = {
  _id: string
  isClickable?: boolean
  imageUrl?: string
  title: string
  tags: string[] | undefined
  children?: JSX.Element
  viewsCount: number
  commentsCount: number
  isLoading: boolean
  createdAt: string
  author: APIAuthResponseType
  isOwner: (user: string | undefined, author: string) => boolean
}

export const Post: FC<PropsType> = memo(
  ({
    _id,
    isClickable,
    imageUrl,
    title,
    tags,
    children,
    viewsCount,
    commentsCount,
    isLoading,
    createdAt,
    author,
    isOwner,
  }) => {
    const userData = useAppSelector(getIsAuthSelector)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isEditable = isOwner(userData?._id, author._id)

    const onClickRemove = () => {
      if (window.confirm('Are you sure you want remove this post?')) {
        dispatch(
          fetchRemovePost(_id) as AsyncThunkAction<void, string, {}> & AnyAction
        )
        navigate('/')
      }
    }

    if (isLoading) {
      return <PostSkeleton />
    }

    return (
      <div
        className={clsx(styles.root, { [styles.rootClickable]: isClickable })}
      >
        {isEditable && (
          <div className={styles.editButtons}>
            <Link to={`/posts/${_id}/edit`}>
              <IconButton color='primary'>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color='secondary'>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        {imageUrl && (
          <img
            className={clsx(styles.image, {
              [styles.imageClickable]: isClickable,
            })}
            src={`http://localhost:4444/${imageUrl}`}
            onClick={() => {
              if (isClickable) return navigate(`/posts/${_id}`)
            }}
            alt={title}
          />
        )}
        <div className={styles.wrapper}>
          <UserInfo {...author} additionalText={createdAt} />
          <div className={styles.indention}>
            <h2
              className={clsx(styles.title, {
                [styles.titleClickable]: isClickable,
              })}
            >
              {isClickable ? <Link to={`/posts/${_id}`}>{title}</Link> : title}
            </h2>
            <ul className={styles.tags}>
              {tags?.map((name, index) => (
                <li key={index}>
                  <Link
                    onClick={() => {
                      dispatch(addFindByTag(name))
                      dispatch(getPostsByTag())
                    }}
                    to={`/tags/${name}`}
                  >
                    #{name}
                  </Link>
                </li>
              ))}
            </ul>
            {children && <div className={styles.content}>{children}</div>}
            <ul className={styles.postDetails}>
              <li>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                  <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
                </svg>
                <span>{viewsCount}</span>
              </li>
              <li>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path d='M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
                </svg>
                <span>{commentsCount}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
)
