import React, { FC } from 'react';

import { ChatMessageType, IPostType } from 'shared/types';

import UserAvatar from 'assets/images/avatar.jpg';

import styled from 'styled-components';
import { Box, CardContent, Typography } from 'components';


const MessageWrapper = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1em 2em;
    background-color: var(--bg-post-item);
    margin-bottom: 0.5em;
    margin-right: 0.5em;
    border-radius: 0.5em;
    box-shadow: 0.1em 0.1em var(--bg-post-item-shadow);
`;

const Image = styled.img`
    min-width: 1.5em;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

type PropsType = {
    message?: ChatMessageType
    post?: IPostType
}

export const Message: FC<PropsType> = ({message, post}) => {
    return (
        <MessageWrapper>
            <Box sx={{ width: 60, height: 60, backgroundColor: 'transparent', borderRadius: '50%',
                    '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                        cursor: 'pointer'
                    },}}
            >
                <Image src={message?.photo || UserAvatar} alt="User Avatar"/>
            </Box>
            <CardContent style={{marginLeft: '2em', paddingTop: '0'}}>
                <Typography gutterBottom variant="h6" component="div">
                    {message?.userName || post?.message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {message?.message || post?.likesCount}
                </Typography>
            </CardContent>
        </MessageWrapper>
    )
}
