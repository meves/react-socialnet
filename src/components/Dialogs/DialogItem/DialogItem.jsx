import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.scss';
import UserImage from './../../../assets/images/user_image.jpeg';

const DialogItem = props => {
    const path = `/dialogs/${props.id}`;
    return (
        <div className={styles.dialog}>
            <img src={UserImage} alt="User" />
            <NavLink className={navData => navData.isActive ? styles.active : ''} to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
