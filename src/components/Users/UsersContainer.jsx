import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getUsersOnCurrentPage, followUser, unfollowUser } from '../../redux/users-reducer';
import Users from './Users';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { recieveUsers, recievePageSize, recieveTotalUsersCount, recieveCurrentPage, 
         recieveIsFetching, recieveFollowingInProgress, recieveCurrentId } from '../../redux/selectors/users-selectors';

class UsersAPIContainer extends Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    changeCurrentPage = (currentPage) => {
        this.props.getUsersOnCurrentPage(currentPage, this.props.pageSize);
    }
    setFollowUser = (userId) => {
        this.props.followUser(userId);
    }
    setUnfollowUser = (userId) => {
        this.props.unfollowUser(userId);
    }
    render() {
        return (
            <>
                <Users changeCurrentPage={this.changeCurrentPage}
                       users={this.props.users}  
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       setFollowUser={this.setFollowUser}
                       setUnfollowUser={this.setUnfollowUser} 
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
                       currentId={this.props.currentId} />
            </>
        )
    }
}

const mapStateToProps = state => ({
    users: recieveUsers(state),
    pageSize: recievePageSize(state),
    totalUsersCount: recieveTotalUsersCount(state),
    currentPage: recieveCurrentPage(state),
    isFetching: recieveIsFetching(state),
    followingInProgress: recieveFollowingInProgress(state),
    currentId: recieveCurrentId(state)
})

export default compose(
    withAuthNavigate,
    connect(mapStateToProps, 
        { getUsers, getUsersOnCurrentPage, followUser, unfollowUser })
)(UsersAPIContainer);
