import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, updateUserStatus, getUserStatus, updatePhoto, saveProfileData } from '../../redux/profile-reducer';
import { withRouter } from '../../hoc/withRouter';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { recieveUserId, recieveUserProfile, recieveStatus } from '../../redux/selectors';

class ProfileContainer extends Component {
    userId = this.props.params.userId || this.props.userId;
    componentDidMount() {
        this.props.getProfile(this.userId);
        this.props.getUserStatus(this.userId);
    }
    render() {        
        return (
            <Profile userProfile={this.props.userProfile} 
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     isOwner={!this.props.params.userId}
                     updatePhoto={this.props.updatePhoto}
                     saveProfileData={this.props.saveProfileData} />
        )
    }
}

const mapStateToProps = state => ({
    userProfile: recieveUserProfile(state),
    status: recieveStatus(state),
    userId: recieveUserId(state)
})

export default compose(
    withAuthNavigate,
    connect(mapStateToProps, { getProfile, updateUserStatus, getUserStatus, updatePhoto, saveProfileData }),
    withRouter
)(ProfileContainer);
