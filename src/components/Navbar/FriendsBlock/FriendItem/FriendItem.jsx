import React from 'react';
import styles from './FriendItem.module.scss';
import UserImage from './../../../../assets/images/user_image.jpeg';

const FriendItem = props => {
    return (
        <div className={styles.item} >
            <img className={styles.image} src={UserImage} alt="User" />
            <p>{props.name}</p>
        </div>
    )
}

export default FriendItem;
