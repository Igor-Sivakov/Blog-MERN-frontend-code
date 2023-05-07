import { createAsyncThunk } from "@reduxjs/toolkit"

import { postsAPI } from "../../../API/postsAPI"

import { APICommentsResponseType, APIPostsResponseType } from "../../../API/API.types"


export const fetchPostsByDate = createAsyncThunk<APIPostsResponseType[], void>('/posts/fetchPostsByDate', async (_, { rejectWithValue }) => {
  try {
    return await postsAPI.getPostsByDate()
  } catch (error) {
    console.log(error)
    return rejectWithValue('some error')
  }
})

export const fetchPostsByViews = createAsyncThunk<APIPostsResponseType[], void>('/posts/fetchPostsByViews', async (_, { rejectWithValue }) => {
  try {
    return await postsAPI.getPostsByViews()
  } catch (error) {
    console.log(error)
    return rejectWithValue('some error')
  }
})

export const fetchRemovePost = createAsyncThunk<void, string>('/posts/fetchRemovePost', async (_id, { rejectWithValue }) => {
  try {
    await postsAPI.removePost(_id)
  } catch (error) {
    console.log(error)
    return rejectWithValue('some error')
  }
})

export const fetchTags = createAsyncThunk<string[], void>('/posts/fetchTags', async (_, { rejectWithValue }) => {
  try {
    return await postsAPI.getTags()
  } catch (error) {
    console.log(error)
    return rejectWithValue('some error')
  }

})

export const fetchComments = createAsyncThunk<APICommentsResponseType[], void>('/posts/fetchComments', async (_, { rejectWithValue }) => {
  try {
    return await postsAPI.getComments()
  } catch (error) {
    console.log(error)
    return rejectWithValue('some error')
  }
})