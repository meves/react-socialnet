import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from 'components/common/Preloader';
import { ProfileData } from './ProfileData';
import { ProfileStatus } from './ProfileStatus';
import ProfileReduxForm from './ProfileForm';
import { saveProfileData } from 'redux/reducers/profile-reducer';
import { UserProfileType } from 'types/types';
import { recieveUserProfile } from 'redux/selectors/profile-selectors';

type PropsType = {
    isOwner: boolean     
}

export const ProfileInfo: FC<PropsType> = (props) => {
    const profile = useSelector(recieveUserProfile);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    if (!profile) {
        return (<Loading/>)
    } 

    const activateEditMode = () => {
        setEditMode(true);
    }
    // eslint-disable-next-line
    const deactivateEditMode = () => {
        setEditMode(false);
    }
    const onSubmit = async (formData: UserProfileType) => {
        try {
            const result: any = await dispatch(saveProfileData(formData));
            setEditMode(result);  
        } catch (error) {
            setEditMode(false);        
        }        
    }
    return (
        <>
            <ProfileStatus />
            { !editMode ? 
            <ProfileData userProfile={profile}
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
