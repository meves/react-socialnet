import React, { FC, useState } from 'react';
import { Loading } from '../../../components/common/Preloader/Loading';
import { ProfileData } from './ProfileData/ProfileData';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';
import ProfileReduxForm from './ProfileForm/ProfileForm';
import { UserProfileType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { recieveUserProfile } from '../../../redux/selectors/profile-selectors';
import { saveProfileData } from '../../../redux/reducers/profile-reducer';

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
