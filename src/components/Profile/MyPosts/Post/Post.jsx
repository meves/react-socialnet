import React from 'react';
import styles from './Post.module.scss';
import UserIcon from './../../../../assets/images/user_icon.png';

const Post = props => {
    return (
        <div className={styles.item}>
            <img src={UserIcon} alt="User-icon" />
            <span>{props.message}</span>
            <p>Like {props.likesCount}</p>
        </div>
    )
}

export default Post;
