import React, { FC } from 'react';
import styles from './User.module.scss';
import UserImage from '../../assets/images/user_image.jpeg';
import { UserType } from '../../types/types';
import { NavLink } from 'react-router-dom';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
}

export const User: FC<PropsType> = (props) => {
    const { user, followingInProgress, setFollowUser, setUnfollowUser } = props;
    return (
        <div className={styles.userItem}>
            <div className={styles.photoWrapper}>
                <NavLink to={`/profile/${user.id}`}>
                    <img className={styles.userPhoto} 
                        src={user.photos.large || user.photos.small || UserImage} 
                        alt="user" />
                </NavLink>
                { user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} 
                            onClick={() => setUnfollowUser(user.id)}
                            className="button">Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} 
                            onClick={() => setFollowUser(user.id)}
                            className="button">Follow</button>
                }                            
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.userInfo}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={styles.userLocation}>
                    <div>user.location.country</div>
                    <div>user.location.city</div>
                    <a href={'user.uniqueUrlName'}>User site</a>
                </div>
            </div>
        </div>
    )
}
