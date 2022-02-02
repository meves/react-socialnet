import React from 'react';
import styles from './FriendsBlock.module.scss';
import FriendItem from './FriendItem/FriendItem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { receiveFriendsNames } from '../../../redux/selectors/navbar-selectors';

const FriendsBlock = props => {
    const friendsNamesItems = props.friendsNames.map(friend => <FriendItem name={friend.name} key={friend.id} />)
    return (
        <div className={styles.wrapper}>
            <h2>Friends</h2>
            <div className={styles.itemsBlock} >
                {friendsNamesItems}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    friendsNames: receiveFriendsNames(state)
})

export default compose( connect(mapStateToProps) )(FriendsBlock);
