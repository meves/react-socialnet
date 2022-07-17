import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { PhotosType } from 'shared/types';

import styled from 'styled-components';

const Figure = styled.figure`
    width: 30%;
    transform: scale(0.9);
    transition: transform 0.5s;
    padding: 0;
    margin: 0 2em 0 0;
    border-radius: 50%;
    float: left;
    &:hover {
        transform: scale(0.95);
        transition: transform 0.5s;
        cursor: pointer;
    }
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const Figcaption = styled.figcaption`
    font-size: 0.5rem;
    text-align: center;
`;

type PropsType = {
    photos: PhotosType | undefined
    icon: any
    userName: string
    userId: number
}

export const FigureImage: FC<PropsType> = ({photos, icon, userName, userId}) => {
    const path = `/profile/${userId}`;
    return (
        <Figure>
            <NavLink to={path}>
                <Image src={ photos?.large || photos?.small || icon } 
                        alt={userName}
                        title={userName}/>
            </NavLink>
            <Figcaption>{userName}</Figcaption>                    
        </Figure>
    )
}
