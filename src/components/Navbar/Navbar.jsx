import React from 'react';
import styles from './Navbar.module.scss';
import Menu from './Menu/Menu';
import FriendsBlockContainer from './FriendsBlock/FriendsBlock';

const Navbar = props => {
    return (
        <nav className={styles.nav}>
            <Menu />
            <FriendsBlockContainer />
        </nav>
    )
}

export default Navbar;
