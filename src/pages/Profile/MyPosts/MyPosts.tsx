import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from 'components/PostForm';
import { FormDataType } from 'components/PostForm';
import { Message } from 'components/Message';
import { actions } from 'redux/reducers/profile-reducer';
import { recievePosts } from 'redux/selectors/profile-selectors';
import { IPostType } from 'shared/types';

import styled from 'styled-components';
import { Typography } from 'components';

const PostsWrapper = styled.div`
    padding: 1em;
`;

const PostItems = styled.div`
    margin-top: 2em;
`;

export const MyPostsPage: FC = () => {   
    const posts = useSelector(recievePosts);
    const dispatch = useDispatch();
    const { addPost } = actions;
    
    const postsItems = [...posts].reverse().map((post: IPostType) => (
        <Message key={post.id} post={post} />
    )) 
    const onAddPost = (formData: FormDataType) => {
        dispatch(addPost(formData.post));
    }
    return (       
        <PostsWrapper>
            <Typography variant="h5">New post</Typography>
            <PostForm onSubmit={onAddPost}/>          
            <PostItems>{ postsItems }</PostItems>
        </PostsWrapper>         
    )
}
