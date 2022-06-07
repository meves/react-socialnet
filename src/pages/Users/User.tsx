import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import UserImage from '../../assets/images/user_image.jpeg';
import { UserType } from '../../types/types';
import { NavLink } from 'react-router-dom';
import { Button } from '../../styles/components';

/**
 * * styled-components
 */
const UserWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-self: center;
    justify-content: flex-start;
    margin-bottom: 1.5em;
    padding: 0.5em;
    background-color: var(--bg-color-light);
    border-radius: 0.3em;
`;

const PhotoWrapper = styled.div`
    margin-right: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Photo = styled.img`
    object-fit: contain;
    max-width: 4.5em;
    padding: 0.3em;
    border-radius: 1em;
    background-color: var(--bg-color-light);
`;

const followUnfollow = css`
    font-size: 0.5em;
    padding: 0.5em 1em;
`;

const FollowButton = styled(Button)`
    ${followUnfollow}
`;

const UnfollowButton = styled(Button)`
    ${followUnfollow}
`;

const InfoWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: var(--white-text-color);
`;

const UserInfo = styled.div`
    background-color: var(--bg-color-dark);
    margin-right: 2em;
    padding: 0.5em 0 0.5em 0.75em;
    border-radius: 0.3em;
`;

const LocationInfo = styled.div`
    background-color: var(--bg-color-dark);
    padding: 0.5em 0 0.5em 0.75em;
    border-radius: 0.3em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const UserSiteLink = styled.a`
    color: var(--link-color);
    text-decoration: none;

    &:hover {
        color: var(--gray-text-color);
    }
`;

/**
 * * React Component User
 */
type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
}

export const User: FC<PropsType> = (props) => {
    const { user, followingInProgress, setFollowUser, setUnfollowUser } = props;
    return (
        <UserWrapper>
            <PhotoWrapper>
                <NavLink to={`/profile/${user.id}`}>
                    <Photo src={user.photos.large || user.photos.small || UserImage} 
                           alt="user" />
                </NavLink>
                { user.followed
                    ? <FollowButton disabled={followingInProgress.some(id => id === user.id)} 
                              onClick={() => setUnfollowUser(user.id)}>Unfollow</FollowButton>
                    : <UnfollowButton disabled={followingInProgress.some(id => id === user.id)} 
                              onClick={() => setFollowUser(user.id)}>Follow</UnfollowButton>
                }                            
            </PhotoWrapper>
            <InfoWrapper>
                <UserInfo>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </UserInfo>
                <LocationInfo>
                    <div>user.location.country</div>
                    <div>user.location.city</div>
                    <UserSiteLink href={'user.uniqueUrlName'}>User site</UserSiteLink>
                </LocationInfo>
            </InfoWrapper>
        </UserWrapper>
    )
}
