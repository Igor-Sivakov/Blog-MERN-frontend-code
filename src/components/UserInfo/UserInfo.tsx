import { FC } from 'react'
import styles from './UserInfo.module.scss'

type PropsType = {
  avatarUrl: string
  fullName: string
  additionalText: string
}

export const UserInfo: FC<PropsType> = ({
  avatarUrl,
  fullName,
  additionalText,
}) => {
  const data =
    additionalText.substring(0, 10) + ' at ' + additionalText.substring(11, 16)
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || '/noavatar.png'}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{data}</span>
      </div>
    </div>
  )
}
