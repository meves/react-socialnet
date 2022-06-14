import React, { FC } from 'react';
import styled from 'styled-components';
import UserIcon from './../../../../assets/images/user_icon.png';

const PostWrapper = styled.div`
    display: flex;
    padding: 1em;
    background-color: var(--wthite-color);
    margin-bottom: 1em;
    border-radius: 1em;
`;

const Figure = styled.figure`
    margin: 0 5em 0 0;
`;

const Image = styled.img`
    max-width: 5em;
    border-radius: 50%;
    object-fit: contain;
`;

type PropsType = {
    message: string
    likesCount: number
}

export const Post: FC<PropsType> = (props) => {
    return (
        <PostWrapper>
            <Figure>
                <Image src={UserIcon} alt="User-icon" />
            </Figure>
            <div>
                <div>{props.message}</div>
                <p>Like {props.likesCount}</p>
            </div>
        </PostWrapper>
    )
}
