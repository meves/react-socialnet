import React, { FC } from 'react';
import { FriendItem } from './FriendItem';
import { useSelector } from 'react-redux';
import { receiveFriendsNames } from '../../../redux/selectors/navbar-selectors';
import styled from 'styled-components';

const Wrapper = styled.section`
    padding: 0 1em;
    margin-top: 5em;
    margin-bottom: 3em;
`;

const Figures = styled.div`
    display: flex;
    justify-content: space-around;    
`;

export const FriendsBlock: FC = () => {
    const friendsNames = useSelector(receiveFriendsNames);
    const friendsNamesItems = friendsNames.map(friend => (
        <FriendItem name={friend.name} key={friend.id} />)
    )
    return (
        <Wrapper>
            <h2>Friends</h2>
            <Figures>
                { friendsNamesItems }
            </Figures>
        </Wrapper>
    )
}
