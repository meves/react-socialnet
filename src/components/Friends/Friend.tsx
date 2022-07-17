import React, { FC } from 'react';

import UserImage from 'assets/images/user_image.jpeg';
import styled from 'styled-components';
import { FriendType } from 'shared/types';
import { Item } from 'components/Item';


const Figure = styled.figure`
    flex: 1;    
    margin: 0;
`;

const FriendItem = styled(Item)`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;`;

const Image = styled.img`
    max-width: 2em;
    border-radius: 50%;
    margin-bottom: 0.5em;
`;

const Name = styled.figcaption`
    font-size: 0.6rem;
    text-align: center;
`;

type PropsType = {
    friend: FriendType
}

export const Friend: FC<PropsType> = React.memo(({ friend }) => {
    const path = `profile/${friend.id}`
    return (
        <Figure>
            <FriendItem to={path}>
                <Image src={friend.photos.small || friend.photos.large || UserImage} alt={friend.name} />
                <Name>{ friend.name }</Name>
            </FriendItem>
        </Figure>
    )
})
