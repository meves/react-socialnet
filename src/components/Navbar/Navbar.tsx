import React, { FC } from 'react';
import styles from './Navbar.module.scss';
import Menu from './Menu/Menu';
import FriendsBlockContainer from './FriendsBlock/FriendsBlock';

const Navbar: FC = (props): JSX.Element => {
    return (
        <nav className={styles.nav}>
            <Menu />
            <FriendsBlockContainer />
        </nav>
    )
}

export default Navbar;
