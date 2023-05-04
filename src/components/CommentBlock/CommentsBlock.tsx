import React, { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'
import { APICommentsResponseType } from '../../API'
import { SideBlock } from '..'
import styles from './CommentBlock.module.scss'

type PropsType = {
  items: APICommentsResponseType[]
  isLoading: boolean
  children?: JSX.Element
}

export const CommentsBlock: FC<PropsType> = ({
  items,
  isLoading,
  children,
}) => {
  return (
    <SideBlock title='Comments'>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj) => {
          const data =
            obj.createdAt.substring(0, 10) +
            ' at ' +
            obj.createdAt.substring(11, 16)

          return (
            <React.Fragment key={obj._id}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant='circular' width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div className={styles.skeleton}>
                    <Skeleton variant='text' height={25} width={120} />
                    <Skeleton variant='text' height={18} width={230} />
                  </div>
                ) : (
                  <div className={styles.listItemText}>
                    <h4>
                      {obj.user.fullName}
                      <span>{data}</span>
                    </h4>
                    <p>{obj.text}</p>
                  </div>
                )}
              </ListItem>
              <Divider
                variant='inset'
                component='li'
                style={{ marginRight: '10px' }}
              />
            </React.Fragment>
          )
        })}
        {children}
      </List>
    </SideBlock>
  )
}
