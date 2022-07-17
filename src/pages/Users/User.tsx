import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { UserType } from 'shared/types';
import UserImage from 'assets/images/user_image.jpeg';

import styled from 'styled-components';
import { Typography, Button } from 'components';

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
    background-color: var(--bg-post-item);
    box-shadow: 0.1em 0.1em var(--bg-post-item-shadow);
    border-radius: 0.3em;
`;

const PhotoWrapper = styled.div`
    margin-right: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(max-width: 400px) {
        margin-right: 0.5em;
    }
`;

const Photo = styled.img`
    object-fit: contain;
    max-width: 5em;
    padding: 0.3em;
    border-radius: 50%;
`;

const InfoWrapper = styled.div`
    display: flex;
    color: var(--medium-text-color);

    @media(max-width: 780px) {
        flex-direction: column;
    }
`;

const UserInfo = styled.div`
    background-color: var(--bg-color-dark);
    margin-right: 2em;
    padding: 0.5em 0 0.5em 0.75em;
    border-radius: 0.3em;
    width: 100%;
`;

const LocationInfo = styled.div`
    background-color: var(--bg-color-dark);
    padding: 0.5em 0 0.5em 0.75em;
    border-radius: 0.3em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

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
                    ? <Button variant="outlined" size="small"
                            sx={{
                                color: 'var(--dark-text-color)',
                                borderColor: 'var(--bg-button-border)',
                                fontSize: '0.5rem', 
                            }}
                            disabled={followingInProgress.some(id => id === user.id)} 
                            onClick={() => setUnfollowUser(user.id)}>Unfollow</Button>
                    : <Button variant="outlined" size="small" 
                            sx={{
                                color: 'var(--dark-text-color)',
                                borderColor: 'var(--bg-button-border)',
                                fontSize: '0.5rem',
                            }}
                            disabled={followingInProgress.some(id => id === user.id)} 
                            onClick={() => setFollowUser(user.id)}>Follow</Button>
                }                   
            </PhotoWrapper>
            <InfoWrapper>
                <UserInfo>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        <span>{user.name}</span>
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="div">

                        <span>{user.status}</span>
                    </Typography>
                </UserInfo>
                <LocationInfo>
                    <Typography variant="body2" color="text.secondary">
                        <span>user.location.country</span>
                        <span>user.location.city</span>
                        <UserSiteLink href={'user.uniqueUrlName'}>User site</UserSiteLink>
                    </Typography>
                </LocationInfo>
            </InfoWrapper>
        </UserWrapper>
    )
}
