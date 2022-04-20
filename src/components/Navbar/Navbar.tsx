import React, { FC } from 'react';
import styles from './Navbar.module.scss';
import { Menu } from './Menu/Menu';
import { FriendsBlock } from './FriendsBlock/FriendsBlock';

export const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Menu />
            <FriendsBlock />
        </nav>
    )
}
