import { FC, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { emptyValues } from '../../assets/data/empty.data'

import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

import { Paper } from '@mui/material'

import { getIsAuthSelector } from '../../redux/selectors/selectors'

import { postsAPI } from '../../API/postsAPI'

import { APIPostsResponseType } from '../../API/API.types'

import { Post, CommentsBlock, AddComment } from '../../components'

import styles from './FullPost.module.scss'

type PropsType = {
  isOwner: (user: string | undefined, author: string) => boolean
}

export const FullPost: FC<PropsType> = ({ isOwner }) => {
  const [data, setData] = useState<APIPostsResponseType>(emptyValues)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  const userData = useAppSelector(getIsAuthSelector)

  const isEditable = isOwner(userData?._id, data.user._id)

  useEffect(() => {
    postsAPI
      .getOnePost(id as string)
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        alert('Article receipt error')
      })
  }, [id])

  if (isLoading) {
    return (
      <Post
        isLoading={isLoading}
        {...emptyValues}
        author={emptyValues.user}
        imageUrl=''
        commentsCount={0}
        isOwner={isOwner}
      />
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <Paper
          style={{
            borderRadius: '6px',
            boxShadow:
              '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
          }}
        >
          <Post
            _id={data._id}
            title={data.title}
            imageUrl={data.imageUrl}
            author={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={data.comments.length}
            tags={data.tags}
            isLoading={isLoading}
            isOwner={isOwner}
            isClickable={isEditable}
          >
            <ReactMarkdown children={data.text} />
          </Post>
        </Paper>

        <CommentsBlock items={data.comments} isLoading={false}>
          <AddComment setData={setData} />
        </CommentsBlock>
      </div>
    </div>
  )
}
