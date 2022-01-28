import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileData from './ProfileData/ProfileData';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileReduxForm from './ProfileForm/ProfileForm';

const ProfileInfo = props => {
    const [editMode, setEditMode] = useState(false);
    const profile = props.userProfile;
    if (!profile) {
        return (<Preloader/>)
    }
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
    }
    const onSubmit = formData => {
        props.saveProfileData(formData)
            .then(modeResult => setEditMode(modeResult));
    }
    return (
        <>
            <ProfileStatus status={props.status}
                           updateUserStatus={props.updateUserStatus} 
            />
            { !editMode ? 
            <ProfileData userProfile={props.userProfile}
                         updatePhoto={props.updatePhoto}
                         isOwner={props.isOwner}
                         activateEditMode={activateEditMode}             
            />  :
            <ProfileReduxForm onSubmit={onSubmit} 
                              initialValues={profile}
                              contacts={profile.contacts}
                              deactivateEditMode={deactivateEditMode}
            />}
        </>
    )
}

export default ProfileInfo;
