import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Friend } from './Friend';
import { receiveFriends } from 'redux/selectors/navbar-selectors';

import styled from 'styled-components';
import { FriendType } from 'shared/types';
import { getFriends } from 'redux/reducers/navbar-reducer';


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

export const Friends: FC = React.memo(() => {
    const friends: FriendType[] = useSelector(receiveFriends);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFriends(3, 1, true));
    }, [dispatch])
    const friendsItems = friends.map(friend => (
        <Friend key={friend.id} friend={friend}/>
    ))
    return (
        <Wrapper>
            <Title>Friends</Title>
            <Figures>
                { friendsItems }
            </Figures>
        </Wrapper>
    )
})
