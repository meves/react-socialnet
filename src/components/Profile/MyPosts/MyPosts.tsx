import React, { FC } from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import MyPostForm from './MyPostsForm';
import { IPostType } from '../../../types/types';
import { AddPostActionType } from '../../../redux/profile-reducer';

type PropsType = {
    posts: Array<IPostType>
    addPost: (newPostText: string) => AddPostActionType
}

const MyPosts: FC<PropsType> = (props):JSX.Element => {    
    const postsItems: Array<JSX.Element> = [...props.posts].reverse().map((post: IPostType): JSX.Element => (
        <Post key={post.id} message={post.message} likesCount={post.likesCount} />
    )) 
    const onAddPost = (formData: any) => {
        props.addPost(formData.newPost);
    }
    return (       
            <div className={styles.postsBlock}>
                <h2 className={styles.heading}>New post</h2>
                <MyPostForm onSubmit={onAddPost} />          
                <div className={styles.posts}>
                    {postsItems}
                </div>
            </div>         
        )
    }
    
export default MyPosts;
