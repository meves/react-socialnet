import React from 'react';
import styles from './ProfileData.module.scss';
import UserIcon from '../../../../assets/images/user_icon.png';
import SocialBlock from './Social/SocialBlock';

const ProfileData = props => {
    const profile = props.userProfile;
    
    const saveProfilePhoto = event => {
        const files = event.target.files;
        if (files.length === 1) {
            props.updatePhoto(files[0]);
        }
    }
    return (
        <div className={styles.profileData}>
            <div className={styles.profileBlock}>
                <h2>{profile.fullName}</h2>
                { props.isOwner && 
                    <div><button onClick={props.activateEditMode}>Edit Profile</button></div>
                }
                <div className={styles.imageBlock}>
                    <img src={profile.photos.large || profile.photos.small || UserIcon} alt={profile.fullName} />                                
                </div>
                { props.isOwner && 
                    <div><input type="file" onChange={saveProfilePhoto} /></div>
                }
                <div>{profile.aboutMe}</div>
                <p>{profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</p>
                <p>{profile.lookingForAJobDescription}</p>
            </div>
            <SocialBlock profile={profile}/>
        </div>
    )
}

export default ProfileData;
