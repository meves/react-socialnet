import React, { FC } from 'react';
import { UserProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './Profile.module.scss';


type PropsType = {
    userProfile: UserProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    updatePhoto: (profilePhoto: any) => void
    saveProfileData:  (profileData: UserProfileType) => Promise<boolean> 
}

const Profile: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.profile}>
            <ProfileInfo userProfile={props.userProfile}
                status={props.status}
                updateUserStatus={props.updateUserStatus} 
                isOwner={props.isOwner}
                updatePhoto={props.updatePhoto}
                saveProfileData={props.saveProfileData}
            />
            <MyPostsContainer/> 
        </div>
    )
}

export default Profile;
