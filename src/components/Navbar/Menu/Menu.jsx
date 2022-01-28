import React from 'react';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';

const Menu = props => {
    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''} to="/">Home</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''} to="/profile">Profile</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''} to="/dialogs">Messages</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''} to="/news">News</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''} to="/music">Music</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''}  to="/users">Find users</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink className={navData => navData.isActive ? styles.active : ''} to="/settings">Settings</NavLink>
            </li>
        </ul>
    )
}

export default Menu;
