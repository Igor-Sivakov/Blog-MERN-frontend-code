import axios, { InternalAxiosRequestConfig } from 'axios'
import { FieldsType } from './pages/AddPost/AddPost'
import { LoginFormDataType } from './pages/Login/Login'
import { RegisterFormDataType } from './pages/Registration/Registration'

const instance = axios.create({
  baseURL: 'http://localhost:4444/',
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})



export type APIPostsResponseType = {
  createdAt: string
  text: string
  title: string
  tags: string[]
  updatedAt: string
  user: APIAuthResponseType
  comments: APICommentsResponseType[]
  _id: string
  viewsCount: number
  imageUrl: string
}

export type APIAuthResponseType = {
  _id: string
  fullName: string
  email: string
  avatarUrl: string
}

export type APICommentsResponseType = {
  createdAt: string
  user: string
  text: string
  _id: string
}

type CommentType = {
  comments: { user: string, text: string }
}

export const postsAPI = {
  async getPostsByDate() {
    return await instance.get<APIPostsResponseType[]>('posts/date').then(res => res.data)
  },
  async getPostsByViews() {
    return await instance.get<APIPostsResponseType[]>('posts/views').then(res => res.data)
  },
  async getTags() {
    return await instance.get<string[]>('tags').then(res => res.data)
  },
  async getComments() {
    return await instance.get<APICommentsResponseType[]>('posts/comments').then(res => res.data)
  },
  async getOnePost(id: string) {
    return await instance.get<APIPostsResponseType>(`posts/${id}`).then(res => res.data)
  },
  async uploadImage(formData: FormData) {
    return await instance.post<{ url: string }>('upload', formData).then(res => res.data)
  },
  async createPost(fields: FieldsType) {
    return await instance.post<APIPostsResponseType>('posts', fields).then(res => res.data)
  },
  async removePost(_id: string) {
    return await instance.delete<{ success: boolean }>(`posts/${_id}`).then(res => res.data)
  },
  async editPost(_id: string, fields: FieldsType) {
    return await instance.patch<{ success: boolean }>(`posts/${_id}`, fields)
  },
  async addComment(_id: string, comment: CommentType) {
    return await instance.patch<{ success: boolean }>(`posts/comments/${_id}`, comment)
  }
}

export const authAPI = {
  async login(params: LoginFormDataType) {
    return await instance.post<APIAuthResponseType>('auth/login', params).then(res => res.data)
  },
  async register(params: RegisterFormDataType) {
    return await instance.post<APIAuthResponseType>('auth/register', params).then(res => res.data)
  },
  async authMe() {
    return await instance.get<APIAuthResponseType>('auth/me').then(res => res.data)
  },
}


