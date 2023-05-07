import { APIPostsResponseType } from "../../API/API.types"

export const emptyValues: APIPostsResponseType = {
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