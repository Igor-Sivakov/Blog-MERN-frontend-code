import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { authReducer } from './slices/authSlice'
import { postsReducer } from "./slices/postsSlice"

type AppDispatch = typeof store.dispatch

export type AppStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer
})



export default store