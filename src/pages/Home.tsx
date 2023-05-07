import { FC, memo, useEffect, useState } from 'react'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import { Grid, Paper, Tab, Tabs } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../redux/store'

import {
  fetchComments,
  fetchPostsByDate,
  fetchPostsByViews,
  fetchTags,
} from '../redux/slices/posts/postsAsyncActions'
import { initValues } from '../redux/slices/posts/postsSlice'
import {
  getCommentsSelector,
  getPostsDataSelector,
} from '../redux/selectors/selectors'

import { APICommentsResponseType, APIPostsResponseType } from '../API/API.types'

import { TagsBlock, Post, CommentsBlock } from '../components'

type PropsType = {
  isOwner: (user: string | undefined, author: string) => boolean
}

export const Home: FC<PropsType> = memo(({ isOwner }) => {
  const { posts, tags } = useAppSelector(getPostsDataSelector)
  const comments = useAppSelector(getCommentsSelector)

  const dispatch = useAppDispatch()

  const [isActive, setIsActive] = useState<number>(0)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(
      fetchPostsByDate() as AsyncThunkAction<APIPostsResponseType[], void, {}> &
        AnyAction
    )
    dispatch(fetchTags() as AsyncThunkAction<string[], void, {}> & AnyAction)
    dispatch(
      fetchComments() as AsyncThunkAction<APICommentsResponseType[], void, {}> &
        AnyAction
    )
  }, [])

  const getPostsByDate = async () => {
    dispatch(
      fetchPostsByDate() as AsyncThunkAction<APIPostsResponseType[], void, {}> &
        AnyAction
    )
    setIsActive(0)
  }

  const getPostsByViews = async () => {
    dispatch(
      fetchPostsByViews() as AsyncThunkAction<
        APIPostsResponseType[],
        void,
        {}
      > &
        AnyAction
    )
    setIsActive(1)
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={isActive}
        aria-label='basic tabs example'
      >
        <Tab
          onClick={getPostsByDate}
          style={{ fontWeight: 600, fontSize: '16px' }}
          label='New'
        />
        <Tab
          onClick={getPostsByViews}
          style={{ fontWeight: 600, fontSize: '16px' }}
          label='Popular'
        />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map(
            (obj: APIPostsResponseType, index: number) => {
              return isPostsLoading ? (
                <Post
                  key={index}
                  isLoading={isPostsLoading}
                  {...initValues}
                  author={initValues.user}
                  imageUrl=''
                  commentsCount={0}
                  isOwner={isOwner}
                />
              ) : (
                <Paper
                  key={obj._id}
                  style={{
                    borderRadius: '6px',
                    boxShadow:
                      '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                  }}
                >
                  <Post
                    _id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl}
                    author={obj.user}
                    createdAt={obj.createdAt}
                    tags={obj.tags}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.comments.length}
                    isLoading={false}
                    isClickable={true}
                    isOwner={isOwner}
                  />
                </Paper>
              )
            }
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments} isLoading={false} />
        </Grid>
      </Grid>
    </>
  )
})
