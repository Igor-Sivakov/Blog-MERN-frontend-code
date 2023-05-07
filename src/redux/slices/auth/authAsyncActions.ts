import { createAsyncThunk } from '@reduxjs/toolkit'

import { authAPI } from '../../../API/authAPI'

import { APIAuthResponseType } from '../../../API/API.types'
import { LoginFormDataType } from '../../../pages/Login/Login'
import { RegisterFormDataType } from '../../../pages/Registration/Registration'

export const fetchAuth = createAsyncThunk<APIAuthResponseType, LoginFormDataType>('fetch/fetchAuth', async (params) => {
  return await authAPI.login(params)
})

export const fetchRegister = createAsyncThunk<APIAuthResponseType, RegisterFormDataType>('fetch/fetchRegister', async (params) => {
  return await authAPI.register(params)
})

export const fetchAuthMe = createAsyncThunk<APIAuthResponseType, void>('fetch/fetchAuthMe', async () => {
  return await authAPI.authMe()
})