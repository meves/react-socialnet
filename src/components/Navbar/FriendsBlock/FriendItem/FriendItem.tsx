import React, { FC } from 'react';
import styles from './FriendItem.module.scss';
import UserImage from './../../../../assets/images/user_image.jpeg';

type PropsType = {
    name: string
}

export const FriendItem: FC<PropsType> = (props) => {
    return (
        <div className={styles.item} >
            <img className={styles.image} src={UserImage} alt="User" />
            <p>{props.name}</p>
        </div>
    )
}
