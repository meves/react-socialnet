import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getUsersOnCurrentPage, followUser, unfollowUser, FilterType } from '../../redux/users-reducer';
import Users from './Users';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { recieveUsers, recievePageSize, recieveTotalUsersCount, recieveCurrentPage, 
         recieveIsFetching, recieveFollowingInProgress, receiveBlockSize, receiveFilter } from '../../redux/selectors/users-selectors';
import { AppStateType } from '../../redux/redux-store';
import { UserType } from '../../types/types';

type PropsType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
    blockSize: number
    filter: FilterType
    getUsers: (currentPage: number, pageSize: number) => void
    getUsersOnCurrentPage: (currentPage: number, pageSize: number, filter: FilterType) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

class UsersAPIContainer extends Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    changeCurrentPage = (currentPage: number) => {
        this.props.getUsersOnCurrentPage(currentPage, this.props.pageSize, this.props.filter);
    }
    changeFilter = (filter: FilterType) => {
        const { currentPage, pageSize} = this.props;
        this.props.getUsersOnCurrentPage(currentPage, pageSize, filter);        
    }
    setFollowUser = (userId: number) => {
        this.props.followUser(userId);
    }
    setUnfollowUser = (userId: number) => {
        this.props.unfollowUser(userId);
    }
    render() {
        return (
            <>
                <Users 
                    changeCurrentPage={this.changeCurrentPage}
                    changeFilter={this.changeFilter}
                    users={this.props.users}  
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    blockSize={this.props.blockSize}
                    setFollowUser={this.setFollowUser}
                    setUnfollowUser={this.setUnfollowUser} 
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    blockSize: number
    filter: FilterType
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: recieveUsers(state),
    pageSize: recievePageSize(state),
    totalUsersCount: recieveTotalUsersCount(state),
    currentPage: recieveCurrentPage(state),
    isFetching: recieveIsFetching(state),
    followingInProgress: recieveFollowingInProgress(state),
    blockSize: receiveBlockSize(state),
    filter: receiveFilter(state)
})

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    getUsersOnCurrentPage: (currentPage: number, pageSize: number, filter: FilterType) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

export default compose<React.ComponentType>(
    withAuthNavigate,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, 
        { getUsers, getUsersOnCurrentPage, followUser, unfollowUser })
)(UsersAPIContainer);
