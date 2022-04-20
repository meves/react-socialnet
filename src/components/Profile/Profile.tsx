import React, { FC, useEffect } from 'react';
import { MyPostsPage } from './MyPosts/MyPosts';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import styles from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { recieveUserId } from '../../redux/selectors/auth-selectors';
import { getProfile, getUserStatus } from '../../redux/profile-reducer';

const ProfilePage: FC = () => {
    const userId = useSelector(recieveUserId);
    const params = useParams();

    const id: number = Number(params.userId) || Number(userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile(id));
        dispatch(getUserStatus(id));
    }, [userId]);

    return (
        <div className={styles.profile}>
            <ProfileInfo isOwner={!params.userId}
            />
            <MyPostsPage /> 
        </div>
    )
}

export default ProfilePage;
