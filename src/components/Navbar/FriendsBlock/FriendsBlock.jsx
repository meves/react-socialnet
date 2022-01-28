import React from 'react';
import styles from './FriendsBlock.module.scss';
import FriendItem from './FriendItem/FriendItem';
import { connect } from 'react-redux';

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
    friendsNames: state.navbar.friendsNames
})

export default connect(mapStateToProps)(FriendsBlock);
