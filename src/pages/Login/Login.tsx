import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/store'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { fetchAuth } from '../../redux/slices/auth/authAsyncActions'
import { getIsAuthSelector } from '../../redux/selectors/selectors'

import { APIAuthResponseType } from '../../API/API.types'

import styles from './Login.module.scss'

export type LoginFormDataType = {
  email: string
  password: string
}

export const Login: FC = () => {
  const isAuth = Boolean(useAppSelector(getIsAuthSelector))

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: LoginFormDataType) => {
    const data: AnyAction = await dispatch(
      fetchAuth(values) as AsyncThunkAction<
        APIAuthResponseType,
        LoginFormDataType,
        {}
      >
    )

    if (!data.payload) {
      alert('Failed to login')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='Email'
          type='email'
          placeholder='Enter your email.'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter your mail.' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Password'
          placeholder='Enter your password.'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter your password.' })}
          fullWidth
        />

        <Button
          size='large'
          disabled={!isValid}
          type='submit'
          variant='contained'
          fullWidth
        >
          Login
        </Button>
      </form>
    </Paper>
  )
}
