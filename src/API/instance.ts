import axios, { InternalAxiosRequestConfig } from 'axios'


export const instance = axios.create({
  baseURL: 'http://localhost:4444/',
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})




