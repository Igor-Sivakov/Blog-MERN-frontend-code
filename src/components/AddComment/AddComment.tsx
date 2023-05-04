import { FC } from 'react'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { APIAuthResponseType, APIPostsResponseType, postsAPI } from '../../API'
import { useAppSelector } from '../../redux/store'
import { getIsAuthSelector } from '../../redux/selectors/selectors'
import styles from './AddComment.module.scss'

type PropsType = {
  setData: (values: APIPostsResponseType) => void
}

export const AddComment: FC<PropsType> = ({ setData }) => {
  const isAuth: boolean = Boolean(useAppSelector(getIsAuthSelector))
  const auth: boolean = !window.localStorage.getItem('token') && !isAuth
  const { _id, avatarUrl } = useAppSelector(
    getIsAuthSelector
  ) as APIAuthResponseType

  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      text: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: { text: string }) => {
    if (!values.text.length) return
    const comment = {
      comments: {
        user: _id,
        text: values.text,
      },
    }
    await postsAPI.addComment(id as string, comment)
    await postsAPI.getOnePost(id as string).then((res) => setData(res))
    reset()
  }

  return (
    <div className={styles.root}>
      <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Add comment'
            variant='outlined'
            maxRows={10}
            multiline
            fullWidth
            error={Boolean(errors.text?.message)}
            helperText={errors.text?.message}
            {...register('text', { minLength: 10 })}
          />
          {errors.text && (
            <p
              style={{
                color: 'silver',
                marginTop: '5px',
                marginBottom: '-5px',
              }}
            >
              Comments can be posted only by registered users, min length of
              comment is 10 symbols.
            </p>
          )}
          <Button
            variant='contained'
            disabled={!isValid || auth}
            type='submit'
            size='medium'
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}