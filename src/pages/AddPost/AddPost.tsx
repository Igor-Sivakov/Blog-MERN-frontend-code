import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { postsAPI } from '../../API'
import { useAppSelector } from '../../redux/store'
import { getIsAuthSelector } from '../../redux/selectors/selectors'
import styles from './AddPost.module.scss'

export type FieldsType = {
  imageUrl?: string
  title?: string
  tags?: string
  text?: string
  comments?: {
    user: string
    text: string
  }
}

export const AddPost: FC = () => {
  const isAuth = Boolean(useAppSelector(getIsAuthSelector))
  const navigate = useNavigate()
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')

  const isEditing = Boolean(id)

  const inputFileRef = useRef(null)

  useEffect(() => {
    try {
      if (id) {
        postsAPI.getOnePost(id).then((res) => {
          setTitle(res.title)
          setTags(res.tags.join(','))
          setText(res.text)
          setImageUrl(res.imageUrl)
        })
      }
    } catch (error) {
      console.warn(error)
      alert('article receipt error')
    }
  }, [id])

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData()
      if (event.target.files?.length) {
        const file = event.target.files[0]
        formData.append('image', file)
        const data = await postsAPI.uploadImage(formData)
        setImageUrl(data.url)
      }
    } catch (error) {
      console.warn(error)
      alert('file load error')
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onChange = useCallback((value: string) => {
    setText(value)
  }, [])

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields: FieldsType = {
        imageUrl,
        title,
        tags,
        text,
      }

      let { _id }: { _id: string } = { _id: '' }

      isEditing
        ? await postsAPI.editPost(id as string, fields)
        : ({ _id } = await postsAPI.createPost(fields))

      const newPostId = isEditing ? id : _id

      navigate(`/posts/${newPostId}`)
      setIsLoading(false)
    } catch (error) {
      console.warn(error)
      setIsLoading(false)
      alert('article creation error')
    }
  }

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '600px',
      autofocus: true,
      placeholder: 'Enter the text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'editor',
      },
    }),
    []
  )

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        //@ts-ignore
        onClick={() => inputFileRef.current?.click()}
        variant='outlined'
        size='large'
      >
        Download preview
      </Button>
      <input
        ref={inputFileRef}
        type='file'
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant='contained'
            size='large'
            color='error'
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444/${imageUrl}`}
            alt='Uploaded'
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='The title of the article...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Tags'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          size='large'
          variant='contained'
        >
          {isEditing ? 'Save' : 'Post'}
        </Button>
        <Link to='/'>
          <Button variant='outlined' size='large'>
            Cancel
          </Button>
        </Link>
      </div>
    </Paper>
  )
}
