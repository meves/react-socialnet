import React, { FC } from 'react';
import styles from './FriendsBlock.module.scss';
import { FriendItem } from './FriendItem/FriendItem';
import { useSelector } from 'react-redux';
import { receiveFriendsNames } from '../../../redux/selectors/navbar-selectors';

export const FriendsBlock: FC = () => {
    const friendsNames = useSelector(receiveFriendsNames);
    const friendsNamesItems = friendsNames.map(friend => (
        <FriendItem name={friend.name} key={friend.id} />)
    )
    return (
        <div className={styles.wrapper}>
            <h2>Friends</h2>
            <div className={styles.itemsBlock} >
                { friendsNamesItems }
            </div>
        </div>
    )
}
