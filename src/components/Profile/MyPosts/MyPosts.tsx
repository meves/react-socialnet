import React, { FC } from 'react';
import styles from './MyPosts.module.scss';
import { Post } from './Post/Post';
import MyPostForm, { FormDataType } from './MyPostsForm';
import { actions } from '../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { recievePosts } from '../../../redux/selectors/profile-selectors';

export const MyPostsPage: FC = () => {   
    const posts = useSelector(recievePosts);
    const dispatch = useDispatch();
    const { addPost } = actions;
    
    const postsItems = [...posts].reverse().map(post => (
        <Post key={post.id} message={post.message} likesCount={post.likesCount} />
    )) 
    const onAddPost = (formData: FormDataType) => {
        dispatch(addPost(formData.newPost));
    }
    return (       
        <div className={styles.postsBlock}>
            <h2 className={styles.heading}>New post</h2>
            <MyPostForm onSubmit={onAddPost} />          
            <div className={styles.posts}>
                { postsItems }
            </div>
            <div className={styles.more}>
                <button className={styles.moreButton}>More ...</button>
            </div>
        </div>         
    )
}
    