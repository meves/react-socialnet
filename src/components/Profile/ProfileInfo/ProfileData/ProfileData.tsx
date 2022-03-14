import React, { ChangeEvent, FC } from 'react';
import styles from './ProfileData.module.scss';
import UserIcon from '../../../../assets/images/user_icon.png';
import SocialBlock from './Social/SocialBlock';
import { UserProfileType } from '../../../../types/types';

type PropsType = {
    userProfile: UserProfileType
    isOwner: boolean
    updatePhoto: (profilePhoto: File) => void
    activateEditMode: () => void  
}

const ProfileData: FC<PropsType> = (props): JSX.Element => {
    const profile: UserProfileType = props.userProfile;
    
    const saveProfilePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        if (files?.length === 1) {
            props.updatePhoto(files[0]);
        }
    }
    return (
        <div className={styles.profileData}>
            <div className={styles.profileBlock}>
                <div className={styles.titleInfo}>
                    <h2>{profile?.fullName}</h2>
                    <p>{profile?.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</p>
                    <div>{profile?.aboutMe}</div>
                    <p>{profile?.lookingForAJobDescription}</p>
                </div>
                <div className={styles.userImage}>
                    { props.isOwner && 
                        <button className="button" onClick={props.activateEditMode}>Edit Profile</button>
                    }
                    <div className={styles.imageBlock}>
                        <img src={profile?.photos.large || profile?.photos.small || UserIcon} alt={profile?.fullName} 
                             title="user profile photo"/>                                
                    </div>
                    { props.isOwner && 
                        <input className={styles.fileInput} type="file" onChange={saveProfilePhoto} />
                    }
                </div>
            </div>
            <SocialBlock profile={profile}/>
        </div>
    )
}

export default ProfileData;
