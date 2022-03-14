import React, { FC } from 'react';
import styles from './User.module.scss';
import UserImage from '../../assets/images/user_image.jpeg';
import Preloader from '../common/Preloader/Preloader';
import Paginator from '../Paginator/Paginator';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import UserSearchForm from './UserSearchForm';
import { FilterType } from '../../redux/users-reducer';

type PropsType = {
    users: Array<UserType>  
    pageSize: number
    totalUsersCount: number
    currentPage: number
    blockSize: number
    isFetching: boolean
    followingInProgress: Array<number>
    changeCurrentPage:  (currentPage: number) => void
    changeFilter: (filter: FilterType) => void
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void 
}

const Users: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.usersPage}>  
            <UserSearchForm changeFilter={props.changeFilter}/>    
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       changeCurrentPage={props.changeCurrentPage}
                       blockSize={props.blockSize}
            />
            {props.isFetching && <Preloader />}  
            <div className={styles.userItems}>             
            {props.users.map((user: UserType): JSX.Element => (
                <div key={user.id} className={styles.userItem}>
                    <div className={styles.photoWrapper}>
                        <NavLink to={`/profile/${user.id}`}>
                            <img className={styles.userPhoto} 
                                src={user.photos.large || user.photos.small || UserImage} 
                                alt="user" />
                        </NavLink>
                        { user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)} 
                                      onClick={() => props.setUnfollowUser(user.id)}
                                      className="button">Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === user.id)} 
                                      onClick={() => props.setFollowUser(user.id)}
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
            ))}
            </div>
        </div>
    )
}

export default Users;
