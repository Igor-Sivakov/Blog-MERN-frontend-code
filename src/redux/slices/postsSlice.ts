import { createSlice, createAsyncThunk, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { postsAPI, APIPostsResponseType, APICommentsResponseType } from '../../API'

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

export const initValues: APIPostsResponseType = {
  _id: '',
  title: '',
  user: {
    avatarUrl: '',
    fullName: '',
    email: '',
    _id: '',
  },
  createdAt: '',
  viewsCount: 0,
  tags: [],
  comments: [],
  text: '',
  updatedAt: '',
  imageUrl: '',
}

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
        state.tags.status = 'loading'
      })
      .addCase(fetchComments.fulfilled, (state, actions: PayloadAction<APICommentsResponseType[]>) => {
        state.comments.items = actions.payload
        state.tags.status = 'loaded'
      })
      .addCase(fetchComments.rejected, (state) => {
        state.tags.items = []
        state.tags.status = 'error'
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
