import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from 'components/common/Forms/PostForm';
import { FormDataType } from 'components/common/Forms/PostForm';
import { Message } from 'components/common/Message';
import { actions } from 'redux/reducers/profile-reducer';
import { recievePosts } from 'redux/selectors/profile-selectors';
import { IPostType } from 'types/types';

import styled from 'styled-components';
import { Typography } from 'shared/ui';

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
