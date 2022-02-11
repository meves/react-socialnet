import React, { FC } from 'react';
import styles from './User.module.scss';
import UserImage from '../../assets/images/user_image.jpeg';
import Preloader from '../common/Preloader/Preloader';
import Paginator from '../Paginator/Paginator';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    users: Array<UserType>  
    pageSize: number
    totalUsersCount: number
    currentPage: number
    blockSize: number
    isFetching: boolean
    followingInProgress: Array<number>
    changeCurrentPage:  (currentPage: number) => void
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void 
}

const Users: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.usersPage}>      
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       changeCurrentPage={props.changeCurrentPage}
                       blockSize={props.blockSize}
            />
            {props.isFetching && <Preloader />}                
            {props.users.map((user: UserType): JSX.Element => (
                <div key={user.id} className={styles.userItem}>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <img className={styles.userPhoto} 
                                src={user.photos.large || user.photos.small || UserImage} 
                                alt="user" />
                        </NavLink>
                        { user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)} 
                                      onClick={() => props.setUnfollowUser(user.id)}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === user.id)} 
                                      onClick={() => props.setFollowUser(user.id)}>Follow</button>
                        }                            
                    </div>
                    <div>
                        <div>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </div>
                        <div>
                            <div>user.location.country</div>
                            <div>user.location.city</div>
                            <a href={'user.uniqueUrlName'}>site</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users;
