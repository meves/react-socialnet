import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, updateUserStatus, getUserStatus, updatePhoto, saveProfileData } from '../../redux/profile-reducer';
import { withRouter } from '../../hoc/withRouter';
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { recieveUserId } from '../../redux/selectors/auth-selectors';
import { recieveUserProfile, recieveStatus } from '../../redux/selectors/profile-selectors';
import { UserProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { Params } from 'react-router-dom';

type PropsType = {
    params: Readonly<Params<string>> // !
    userProfile: UserProfileType | null // ->
    status: string // ->
    userId: number // !
    getProfile: (userId: number) => void // !
    updateUserStatus: (status: string) => void // ->
    getUserStatus: (userId: number) => void // !
    updatePhoto: (profilePhoto: File) => void // ->
    saveProfileData:  (profileData: UserProfileType) => Promise<boolean> // ->
}

class ProfileContainer extends Component<PropsType> {
    userId: number = Number(this.props.params.userId) || this.props.userId || 19836;
    componentDidMount() {
        this.props.getProfile(this.userId);
        this.props.getUserStatus(this.userId);
    }
    
    render() {        
        return (
            <Profile userProfile={this.props.userProfile} // ->
                status={this.props.status} // ->
                updateUserStatus={this.props.updateUserStatus} // ->
                updatePhoto={this.props.updatePhoto} // ->
                saveProfileData={this.props.saveProfileData} // ->
                isOwner={!this.props.params.userId}
            />
        )
    }
}

type MapStatePropsType = {
    userProfile: UserProfileType | null
    status: string
    userId: number | null
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    userProfile: recieveUserProfile(state),
    status: recieveStatus(state),
    userId: recieveUserId(state)
})

type MapDispatchPropsType = {
    getProfile: (userId: number) => void
    updateUserStatus: (status: string) => void
    getUserStatus: (userId: number) => void
    updatePhoto: (profilePhoto: File) => void
    saveProfileData:  (profileData: UserProfileType) => void
}

export default compose<React.ComponentType>( 
    //withAuthNavigate,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
        { getProfile, updateUserStatus, getUserStatus, updatePhoto, saveProfileData }),
    withRouter )(ProfileContainer);
