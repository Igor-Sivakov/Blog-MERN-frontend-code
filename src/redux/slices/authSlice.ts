import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { APIAuthResponseType, authAPI } from '../../API'
import { LoginFormDataType } from '../../pages/Login/Login'
import { RegisterFormDataType } from '../../pages/Registration/Registration'


export const fetchAuth = createAsyncThunk<APIAuthResponseType, LoginFormDataType>('fetch/fetchAuth', async (params) => {
  return await authAPI.login(params)
})

export const fetchRegister = createAsyncThunk<APIAuthResponseType, RegisterFormDataType>('fetch/fetchRegister', async (params) => {
  return await authAPI.register(params)
})

export const fetchAuthMe = createAsyncThunk<APIAuthResponseType, void>('fetch/fetchAuthMe', async () => {
  return await authAPI.authMe()
})

type InitialAuthStateType = {
  data: APIAuthResponseType | null
  status: string
}

const initialState: InitialAuthStateType = {
  data: null,
  status: 'loading',
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<APIAuthResponseType>) => {
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<APIAuthResponseType>) => {
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<APIAuthResponseType>) => {
        state.status = 'loaded'
        state.data = action.payload
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
  }
})


export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions