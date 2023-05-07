import { FC } from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Skeleton from '@mui/material/Skeleton'
import ListItemText from '@mui/material/ListItemText'

import { useAppDispatch } from '../redux/store'
import { addFindByTag, getPostsByTag } from '../redux/slices/posts/postsSlice'

import { SideBlock } from './'

type PropsType = {
  items: string[]
  isLoading: boolean
}

export const TagsBlock: FC<PropsType> = ({ items, isLoading }) => {
  const dispatch = useAppDispatch()
  return (
    <SideBlock title='Tags'>
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, index) => (
          <Link
            key={index}
            to={`/tags/${name}`}
            onClick={() => {
              dispatch(addFindByTag(name))
              dispatch(getPostsByTag())
            }}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ marginLeft: '5px' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ width: '25px', marginRight: '-5px' }}
                    viewBox='0 0 448 512'
                  >
                    <path
                      fill='#1d2939'
                      d='M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'
                    />
                  </svg>
                </ListItemIcon>

                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText
                    style={{ marginLeft: '-10px' }}
                    primary={name}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  )
}
