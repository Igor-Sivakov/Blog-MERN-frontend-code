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