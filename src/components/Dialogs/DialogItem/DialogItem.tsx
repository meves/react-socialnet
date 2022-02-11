import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.scss';
import UserImage from './../../../assets/images/user_image.jpeg';

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props): JSX.Element => {
    const path: string = `/dialogs/${props.id}`;
    return (
        <div className={styles.dialog}>
            <img src={UserImage} alt="User" />
            <NavLink className={navData => navData.isActive ? styles.active : ''} to={path}>
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem;
