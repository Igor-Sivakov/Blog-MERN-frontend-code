import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import { Container } from '@mui/material'
import { APIAuthResponseType, APIPostsResponseType } from './API'
import { useAppDispatch } from './redux/store'
import { fetchAuthMe } from './redux/slices/authSlice'
import { fetchPostsByDate } from './redux/slices/postsSlice'
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  PostsByTag,
} from './pages'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'

const App = () => {
  const dispatch = useAppDispatch()

  const isOwner = (user: string | undefined, author: string) => {
    if (user && author) {
      return user === author
    }
    return false
  }

  useEffect(() => {
    dispatch(
      fetchAuthMe() as AsyncThunkAction<APIAuthResponseType, void, {}> &
        AnyAction
    )
    dispatch(
      fetchPostsByDate() as AsyncThunkAction<APIPostsResponseType[], void, {}> &
        AnyAction
    )
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home isOwner={isOwner} />} />
          <Route path='/posts/:id' element={<FullPost isOwner={isOwner} />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/tags/:name' element={<PostsByTag />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
