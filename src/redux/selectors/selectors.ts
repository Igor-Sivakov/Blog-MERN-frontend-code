import { AppStateType } from "../store"


/* Posts selector */

export const getPostsDataSelector = (state: AppStateType) => state.posts

export const getPostsItemsSelector = (state: AppStateType) => state.posts.posts.items

export const getFindByTagSelector = (state: AppStateType) => state.posts.findByTag

export const getPostsByTagSelector = (state: AppStateType) => state.posts.postsByTag

export const getCommentsSelector = (state: AppStateType) => state.posts.comments.items

/* Auth selectors */

export const getIsAuthSelector = (state: AppStateType) => state.auth.data