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

const Title = styled.h2`
    text-align: center;
`;

const Figures = styled.div`
    display: flex;
    justify-content: space-around;  
    
    @media(max-width: 415px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const FriendsBlock: FC = React.memo(() => {
    const friendsNames = useSelector(receiveFriendsNames);
    const friendsNamesItems = friendsNames.map(friend => (
        <FriendItem name={friend.name} key={friend.id} />)
    )
    return (
        <Wrapper>
            <Title>Friends</Title>
            <Figures>
                { friendsNamesItems }
            </Figures>
        </Wrapper>
    )
})
