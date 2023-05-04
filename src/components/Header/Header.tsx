import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { APIAuthResponseType } from '../../API'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { logout } from '../../redux/slices/authSlice'
import { getIsAuthSelector } from '../../redux/selectors/selectors'
import styles from './Header.module.scss'

export const Header: FC = () => {
  const isAuth = Boolean(useAppSelector(getIsAuthSelector))
  const auth = useAppSelector(getIsAuthSelector) as APIAuthResponseType

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
      navigate('/')
    }
  }

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>SIVAKOV BLOG</div>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (
              <div className={styles.buttons_container}>
                <div className={styles.user_auth}>
                  <img
                    className={styles.user_avatar}
                    src={auth.avatarUrl}
                    alt='img'
                  />
                  {auth.fullName}
                </div>
                <Link to='/add-post'>
                  <Button variant='contained'>Write a post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant='contained'
                  color='error'
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
