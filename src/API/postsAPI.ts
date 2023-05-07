import { instance } from "./instance"
import { APICommentsResponseType, APIPostsResponseType } from "./API.types"
import { FieldsType } from "../pages/AddPost/AddPost"


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