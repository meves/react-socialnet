import React, { FC, useEffect } from 'react';
import styles from './User.module.scss';
import { Preloader } from '../common/Preloader/Preloader';
import Paginator from '../Paginator/Paginator';
import { useNavigate } from 'react-router-dom';
import UserSearchForm from './UserSearchForm';
import { FilterType, followUser, getUsers, getUsersOnCurrentPage, unfollowUser } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { receiveBlockSize, receiveFilter, recieveCurrentPage, recieveFollowingInProgress, recieveIsFetching, recievePageSize, recieveTotalUsersCount, recieveUsers } from '../../redux/selectors/users-selectors';
import { User } from './User';

const UsersPage: FC = (props) => {
    const users = useSelector(recieveUsers);
    const totalUsersCount = useSelector(recieveTotalUsersCount);
    const blockSize = useSelector(receiveBlockSize);
    const isFetching = useSelector(recieveIsFetching);
    const followingInProgress = useSelector(recieveFollowingInProgress);
    const pageSize = useSelector(recievePageSize);
    const currentPage = useSelector(recieveCurrentPage);
    const filter = useSelector(receiveFilter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize));
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);
    }, [filter.term, filter.friend, currentPage]);
    
    const changeCurrentPage = (currentPage: number) => {
        dispatch(getUsersOnCurrentPage(currentPage, pageSize, filter));
    }
    const changeFilter = (filter: FilterType) => {
        dispatch(getUsersOnCurrentPage(currentPage, pageSize, filter));        
    }
    const setFollowUser = (userId: number) => {
        dispatch(followUser(userId));
    }
    const setUnfollowUser = (userId: number) => {
        dispatch(unfollowUser(userId));
    }
    return (
        <div className={styles.usersPage}>  
            <UserSearchForm 
                        changeFilter={changeFilter}/>    
            <Paginator 
                       pageSize={pageSize}
                       currentPage={currentPage}
                       totalUsersCount={totalUsersCount}
                       changeCurrentPage={changeCurrentPage}
                       blockSize={blockSize}
            />

            {isFetching && <Preloader />}  
            
            <div className={styles.userItems}>             
                {users.map(user => ( 
                    <User key={user.id}
                          user={user}
                          followingInProgress={followingInProgress}
                          setFollowUser={setFollowUser}
                          setUnfollowUser={setUnfollowUser}
                    />
                 ))}
            </div>
        </div>
    )
}

export default UsersPage;
