import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import styles from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = props => {
    return (
        <div className={styles.profile}>
            <ProfileInfo userProfile={props.userProfile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         updatePhoto={props.updatePhoto} 
                         saveProfileData={props.saveProfileData}
            />            
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
