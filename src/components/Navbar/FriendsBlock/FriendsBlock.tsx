import React, { FC } from 'react';
import styles from './FriendsBlock.module.scss';
import FriendItem from './FriendItem/FriendItem';
import { connect } from 'react-redux';
import { receiveFriendsNames } from '../../../redux/selectors/navbar-selectors';
import { PersonType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

type PropsType = {
    friendsNames: Array<PersonType>
}

const FriendsBlock: FC<PropsType> = (props): JSX.Element => {
    const friendsNamesItems: JSX.Element[] = props.friendsNames.map((friend: PersonType): JSX.Element => 
        (<FriendItem name={friend.name} key={friend.id} />))
    return (
        <div className={styles.wrapper}>
            <h2>Friends</h2>
            <div className={styles.itemsBlock} >
                {friendsNamesItems}
            </div>
        </div>
    )
}

type MapStatePropsType = {
    friendsNames: Array<PersonType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    friendsNames: receiveFriendsNames(state)
})

export default connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(FriendsBlock);
