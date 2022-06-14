import React, { FC } from 'react';
import UserImage from '../../../assets/images/user_image.jpeg';
import styled from 'styled-components';

const Figure = styled.figure`
    flex: 1;
    margin: 1em 0.5em;
`;

const Image = styled.img`
    max-width: 2em;
    border-radius: 50%;
`;

const Name = styled.figcaption`
    font-size: 0.6rem;
`;

type PropsType = {
    name: string
}

export const FriendItem: FC<PropsType> = React.memo((props) => {
    return (
        <Figure>
            <Image src={UserImage} alt={props.name} />
            <Name>{props.name}</Name>
        </Figure>
    )
})
