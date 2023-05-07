import { FC } from 'react'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import styles from './SideBlock.module.scss'

type PropsType = {
  title: string
  children?: JSX.Element
}

export const SideBlock: FC<PropsType> = ({ title, children }) => {
  return (
    <>
      <Paper
        style={{
          boxShadow:
            '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
        }}
        classes={{ root: styles.root }}
      >
        <Typography variant='h6' classes={{ root: styles.title }}>
          {title}
        </Typography>

        {children}
      </Paper>
    </>
  )
}
