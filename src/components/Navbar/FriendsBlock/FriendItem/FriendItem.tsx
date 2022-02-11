import React, { FC } from 'react';
import styles from './FriendItem.module.scss';
import UserImage from './../../../../assets/images/user_image.jpeg';

type PropsType = {
    name: string
}

const FriendItem: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.item} >
            <img className={styles.image} src={UserImage} alt="User" />
            <p>{props.name}</p>
        </div>
    )
}

export default FriendItem;
