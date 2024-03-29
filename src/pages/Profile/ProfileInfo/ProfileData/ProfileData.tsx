import React, { ChangeEvent, FC } from 'react';

import { FigureImage } from 'components/FigureImage';
import { SocialBlock } from './Socials/Socials';
import { useDispatch } from 'react-redux';
import { updatePhoto } from 'redux/reducers/profile-reducer';
import { UserProfileType } from 'shared/types';
import UserIcon from 'assets/images/user_image.jpeg';

import styled from 'styled-components';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Typography,
EditIcon, UploadFileIcon } from 'components';

const ProfileDataWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 2em;
    padding-bottom: 2em;
`;

const ProfileBlock = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const UserInfo = styled.div`
    flex: 1;
    color: var(--dark-text-color);
`;

const UserPhotoBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
`;

const FileInput = styled.input`
    opacity: 0;
`;

type PropsType = {
    userProfile: UserProfileType
    isOwner: boolean
    activateEditMode: () => void  
}
 /** React component ProfileData */
export const ProfileData: FC<PropsType> = (props) => {
    const actions = [
        { icon: <EditIcon/>, name: 'Edit' },
        { icon: <UploadFileIcon/>, name: 'Upload' }
    ]
    const profile: UserProfileType = props.userProfile;
    const dispatch = useDispatch();
    const saveProfilePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        if (files?.length === 1) {
            dispatch(updatePhoto(files[0]));
        }
    }
    return (
        <ProfileDataWrapper>
            <ProfileBlock>
                <UserInfo>
                    <Typography variant="h5">{profile?.fullName}</Typography>
                    <Typography variant="body1">{profile?.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</Typography>
                    <Typography variant="body1">{profile?.aboutMe}</Typography>
                    <Typography variant="body1">{profile?.lookingForAJobDescription}</Typography>
                </UserInfo>
                <UserPhotoBlock>
                    <FigureImage photos={profile.photos} icon={UserIcon} userName={profile.fullName}
                                userId={profile.userId}/>                        
                    { props.isOwner && 
                            <SpeedDial
                                ariaLabel="SpeedDial controlled open example"
                                sx={{ position: 'absolute', bottom: 0, right: 0}}
                                icon={<SpeedDialIcon />}
                            >
                                { actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        tooltipTitle={action.name}
                                        icon={ action.name === 'Edit' ?
                                            <div onClick={props.activateEditMode}><EditIcon/></div> :  
                                            <FileInput type="file" onChange={saveProfilePhoto}/> 
                                        }
                                    /> 
                                ))}
                            </SpeedDial>
                    }                    
                </UserPhotoBlock>
            </ProfileBlock>
            <SocialBlock profile={ profile }/>
        </ProfileDataWrapper>
    )
}
