import React, { FC, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileData from './ProfileData/ProfileData';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileReduxForm from './ProfileForm/ProfileForm';
import { UserProfileType } from '../../../types/types';

type PropsType = {
    userProfile: UserProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void 
    updatePhoto: (profilePhoto: any) => void
    saveProfileData:  (profileData: UserProfileType) => Promise<boolean> 
}

const ProfileInfo: FC<PropsType> = (props): JSX.Element => {
    const [editMode, setEditMode] = useState(false);
    const profile: UserProfileType | null = props.userProfile;
    if (!profile) {
        return (<Preloader/>)
    }
    const activateEditMode = () => {
        setEditMode(true);
    }// eslint-disable-next-line
    const deactivateEditMode = () => {
        setEditMode(false);
    }
    const onSubmit = (formData: any) => {
        props.saveProfileData(formData)
            .then((modeResult: boolean) => setEditMode(modeResult));
    }
    return (
        <>
            <ProfileStatus status={props.status}
                           updateUserStatus={props.updateUserStatus} 
            />
            { !editMode ? 
            <ProfileData userProfile={profile}
                         updatePhoto={props.updatePhoto}
                         isOwner={props.isOwner}
                         activateEditMode={activateEditMode}             
            />  :
            <ProfileReduxForm onSubmit={onSubmit} 
                              initialValues={profile}
                              //contacts={profile.contacts}
                              //deactivateEditMode={deactivateEditMode}
            />}
        </>
    )
}

export default ProfileInfo;
