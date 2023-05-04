import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { APIAuthResponseType } from '../../API'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getIsAuthSelector } from '../../redux/selectors/selectors'
import { fetchRegister } from '../../redux/slices/authSlice'
import styles from './Registration.module.scss'

export type RegisterFormDataType = {
  email: string
  password: string
  fullName: string
  avatarUrl: string
}

export const Registration: FC = () => {
  const isAuth = Boolean(useAppSelector(getIsAuthSelector))
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: RegisterFormDataType) => {
    const data: AnyAction = await dispatch(
      fetchRegister(values) as AsyncThunkAction<
        APIAuthResponseType,
        RegisterFormDataType,
        {}
      >
    )

    if (!data.payload) {
      alert('Failed to registration')
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
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='Full name'
          placeholder='Enter your full name.'
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter your full name.' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Email'
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
          {...register('password', {
            required: 'Enter your password.',
            minLength: 6,
          })}
          fullWidth
        />
        {errors.password && (
          <p style={{ color: 'red', marginTop: '-10px' }}>
            Min length of password is 6 symbols
          </p>
        )}
        <TextField
          className={styles.field}
          label='Avatar link'
          placeholder='Enter link to your avatar'
          error={Boolean(errors.avatarUrl?.message)}
          helperText={errors.avatarUrl?.message}
          {...register('avatarUrl', { required: 'Enter link to your avatar' })}
          fullWidth
        />
        <Button
          type='submit'
          disabled={!isValid}
          size='large'
          variant='contained'
          fullWidth
        >
          Check in
        </Button>
      </form>
    </Paper>
  )
}
