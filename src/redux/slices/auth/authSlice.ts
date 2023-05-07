import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchAuth, fetchAuthMe, fetchRegister } from './authAsyncActions'

import { APIAuthResponseType } from '../../../API/API.types'



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