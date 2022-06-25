import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MyPostsPage } from './MyPosts';
import { ProfileInfo } from './ProfileInfo';
import { recieveUserId } from 'redux/selectors/auth-selectors';
import { getProfile, getUserStatus } from 'redux/reducers/profile-reducer';
import { withAuthNavigate } from 'hoc/withAuthNavigate';

import styled from 'styled-components';

const Wrapper = styled.section`
    width: 100%;
    background-color: var(--bg-page);
`;

const ProfilePage: FC = () => {
    const userId = useSelector(recieveUserId);
    const params = useParams();

    const id: number = Number(params.userId) || Number(userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile(id));
        dispatch(getUserStatus(id));
    }, [id, dispatch]);

    return (
        <Wrapper>
            <ProfileInfo isOwner={!params.userId} />
            <MyPostsPage /> 
        </Wrapper>
    )
}

export default withAuthNavigate(ProfilePage);
