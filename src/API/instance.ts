import axios, { InternalAxiosRequestConfig } from 'axios'


export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  }
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})




