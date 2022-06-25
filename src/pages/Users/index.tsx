import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from 'components/common/Preloader';
import { User } from './User';
import UserSearchForm from './UserSearchForm';
import { FilterType, followUser, getUsersChanged, unfollowUser } from 'redux/reducers/users-reducer';
import { receiveFilter, recieveCurrentPage, recieveFollowingInProgress,
recieveIsFetching, recievePageSize, recieveTotalUsersCount, recieveUsers } from 'redux/selectors/users-selectors';
import { parseSearchString } from 'utils/processSearchString/processSearchString';
import { withAuthNavigate } from 'hoc/withAuthNavigate';
    
import styled from 'styled-components';
import { Pagination } from 'shared/ui';

const UsersWrapper = styled.section`
    background-color: var(--bg-page);
`;

const Users = styled.div`
    margin-top: 3.5em;
`;

const UsersPage: FC = (props) => {
    const users = useSelector(recieveUsers);
    const totalUsersCount = useSelector(recieveTotalUsersCount);
    const pageSize = useSelector(recievePageSize);
    const currentPage = useSelector(recieveCurrentPage);
    const isFetching = useSelector(recieveIsFetching);
    const followingInProgress = useSelector(recieveFollowingInProgress);
    const filter = useSelector(receiveFilter);

    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const {term, friend, page} = parseSearchString(location.search);        
        dispatch(getUsersChanged(page, pageSize, {term, friend}));    
    }, 
    // eslint-disable-next-line
    []); 
    const navigate = useNavigate();    
    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);
    }, [filter, currentPage, navigate]);
    
    const changeCurrentPage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getUsersChanged(page, pageSize, filter));
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
    const pagesCount: number = Math.ceil(totalUsersCount / pageSize);
    return (
        <UsersWrapper>
            <UserSearchForm 
                        changeFilter={changeFilter}/>
            <Pagination count={pagesCount} page={currentPage} showFirstButton showLastButton onChange={changeCurrentPage}
                        boundaryCount={1} color="secondary" siblingCount={5}
            />
            {isFetching && <Loading />}  
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
        </UsersWrapper>
    )
}

export default withAuthNavigate(UsersPage);

