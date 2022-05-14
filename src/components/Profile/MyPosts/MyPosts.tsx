import React, { FC } from 'react';
import styled from 'styled-components';
import { Post } from './Post/Post';
import MyPostForm, { FormDataType } from './MyPostsForm';
import { actions } from '../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { recievePosts } from '../../../redux/selectors/profile-selectors';
import { MoreButton } from '../../../styles/components';

const PostsWrapper = styled.div`
    padding: 1em;
`;

const Title = styled.h2`
    color: var(--wthite-color);
`;

const MoreButtonWrapper = styled.div`
    text-align: center;
`;

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
        <PostsWrapper>
            <Title>New post</Title>
            <MyPostForm onSubmit={onAddPost} />          
            <div>{ postsItems }</div>
            <MoreButtonWrapper>
                <MoreButton>More ...</MoreButton>
            </MoreButtonWrapper>
        </PostsWrapper>         
    )
}
    