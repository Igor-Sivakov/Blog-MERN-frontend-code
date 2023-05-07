import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'

import { fetchComments, fetchPostsByDate, fetchPostsByViews, fetchRemovePost, fetchTags } from './postsAsyncActions'

import { APICommentsResponseType, APIPostsResponseType } from '../../../API/API.types'


type initialPostsStateType = {
  posts: {
    items: APIPostsResponseType[],
    status: string,
  },
  tags: {
    items: string[],
    status: string,
  },
  comments: {
    items: APICommentsResponseType[],
    status: string,
  }
  findByTag: string
  postsByTag: APIPostsResponseType[]
}

const initialState: initialPostsStateType = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
  findByTag: '',
  postsByTag: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addFindByTag(state, action: PayloadAction<string>) {
      state.findByTag = action.payload
    },
    getPostsByTag(state) {
      state.postsByTag = state.posts.items.filter((obj) => obj.tags.some((tag) => tag === state.findByTag))
    }
  },
  extraReducers: (builder) => {
    builder
      //get tags
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = 'loading'
      })
      .addCase(fetchTags.fulfilled, (state, actions: PayloadAction<string[]>) => {
        state.tags.items = actions.payload
        state.tags.status = 'loaded'
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = []
        state.tags.status = 'error'
      })
      // get comments
      .addCase(fetchComments.pending, (state) => {
        state.comments.status = 'loading'
      })
      .addCase(fetchComments.fulfilled, (state, actions: PayloadAction<APICommentsResponseType[]>) => {
        state.comments.items = actions.payload
        state.comments.status = 'loaded'
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments.items = []
        state.comments.status = 'error'
      })
      // remove post
      .addCase(fetchRemovePost.pending, (state, action: PayloadAction<undefined, string, { arg: string }>) => {
        state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
      })
      .addCase(fetchRemovePost.rejected, (state) => {
        state.posts.status = 'error'
      })
      //get posts
      .addMatcher(isAnyOf(fetchPostsByDate.pending, fetchPostsByViews.pending), (state) => {
        state.posts.status = 'loading'
      })
      .addMatcher(isAnyOf(fetchPostsByDate.fulfilled, fetchPostsByViews.fulfilled), (state, action: PayloadAction<APIPostsResponseType[]>) => {
        state.posts.items = action.payload
        state.posts.status = 'loaded'
      })
      .addMatcher(isAnyOf(fetchPostsByDate.rejected, fetchPostsByViews.rejected), (state) => {
        state.posts.items = []
        state.posts.status = 'error'
      })
  },
})

export const postsReducer = postsSlice.reducer

export const { addFindByTag, getPostsByTag } = postsSlice.actions
