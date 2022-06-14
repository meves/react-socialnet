import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import UserIcon from '../../../../assets/images/user_icon.png';
import { SocialBlock } from './Social/SocialBlock';
import { UserProfileType } from '../../../../types/types';
import { useDispatch } from 'react-redux';
import { updatePhoto } from '../../../../redux/reducers/profile-reducer';
import { Button } from '../../../../styles/components';

const ProfileDataWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: var(--white-text-color);
    border-bottom: 3px solid var(--wthite-color);
    padding-bottom: 3em;
    border-top: 3px solid var(--wthite-color);
    padding-top: 3em;
`;

const ProfileBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FullName = styled.h2`
    margin-top: 0;
`;

const UserImage = styled.div`
    object-fit: contain;
`;

const Figure = styled.figure`
    padding: 1em;
    margin: 0;
`;

const UserInfo = styled.div``;

const Image = styled.img`
    max-width: 5em;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.15);
        cursor: pointer;
    }
`;

const FileInput = styled.input`
    outline: none;
    border-radius: 10%;
    padding: 0.5em;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: aliceblue;
    cursor: pointer;
`;

type PropsType = {
    userProfile: UserProfileType
    isOwner: boolean
    activateEditMode: () => void  
}

export const ProfileData: FC<PropsType> = (props) => {
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
                    <FullName>{profile?.fullName}</FullName>
                    <p>{profile?.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</p>
                    <div>{profile?.aboutMe}</div>
                    <p>{profile?.lookingForAJobDescription}</p>
                </UserInfo>
                <UserImage>
                    { props.isOwner && 
                        <Button onClick={props.activateEditMode}>Edit Profile</Button>
                    }
                    <Figure>
                        <Image src={profile?.photos.large || profile?.photos.small || UserIcon} 
                                alt={profile?.fullName} 
                                title="user profile photo"/>                           
                    </Figure>
                    { props.isOwner && 
                        <FileInput type="file" onChange={saveProfilePhoto} />
                    }
                </UserImage>
            </ProfileBlock>
            <SocialBlock profile={ profile }/>
        </ProfileDataWrapper>
    )
}
