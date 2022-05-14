import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Preloader } from '../common/Preloader/Preloader';
import Paginator from '../Paginator/Paginator';
import { useLocation, useNavigate } from 'react-router-dom';
import UserSearchForm from './UserSearchForm';
import { FilterType, followUser, getUsersChanged, unfollowUser } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { receiveBlockSize, receiveFilter, recieveCurrentPage, recieveFollowingInProgress,
         recieveIsFetching, recievePageSize, recieveTotalUsersCount, recieveUsers } from '../../redux/selectors/users-selectors';
import { User } from './User';
import { parseSearchString } from '../../utils/processSearchString/processSearchString';

const Users = styled.div`
    margin-top: 3.5em;
`;

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
    const location = useLocation();
    useEffect(() => {
        const {term, friend, page} = parseSearchString(location.search);
        console.log(`term: ${term} friend: ${friend} page: ${page}`);
        
        dispatch(getUsersChanged(page, pageSize, {term, friend}));    
    }, 
    // eslint-disable-next-line
    []); 

    const navigate = useNavigate();
    
    useEffect(() => {
        //queryString.stringify();
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);
    }, [filter, currentPage, navigate]);
    
    const changeCurrentPage = (currentPage: number) => {
        dispatch(getUsersChanged(currentPage, pageSize, filter));
    }
    const changeFilter = (filter: FilterType) => {
        dispatch(getUsersChanged(currentPage, pageSize, filter));        
    }
    const setFollowUser = (userId: number) => {
        dispatch(followUser(userId));
    }
    const setUnfollowUser = (userId: number) => {
        dispatch(unfollowUser(userId));
    }
    return (
        <div>
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
             <Users>             
                {users.map(user => ( 
                    <User key={user.id}
                          user={user}
                          followingInProgress={followingInProgress}
                          setFollowUser={setFollowUser}
                          setUnfollowUser={setUnfollowUser}
                    />
                 ))}
            </Users>
        </div>
    )
}

export default UsersPage;
