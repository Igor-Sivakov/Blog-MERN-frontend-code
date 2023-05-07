import axios, { InternalAxiosRequestConfig } from 'axios'


export const instance = axios.create({
  baseURL: 'http://localhost:4444/' || 'https://sivakov-blog-mern.herokuapp.com/',
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})




