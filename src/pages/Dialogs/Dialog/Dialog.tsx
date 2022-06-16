import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import UserImage from '../../../assets/images/user_image.jpeg';
import styled from 'styled-components';

const Dialog = styled(NavLink)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.5em;
    padding: 0.3em 1em;
    background-color: var(--bg-post-item);
    box-shadow: 0.1em 0.1em var(--bg-post-item-shadow);
    border-radius: 0.1em;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s;

    &:hover {
        cursor: pointer;
        background-color: var(--bluegray-medium);
        color: var(--dark-text-color);
    }  
`;

const Image = styled.img`
    max-width: 2em;
    border-radius: 50%;
`;

const Name = styled.p`
    margin-left: 1em;
`;

type PropsType = {
    id: number
    name: string
}

export const DialogItem: FC<PropsType> = React.memo((props) => {
    const path: string = `/dialogs/${props.id}`;
    return (
        <Dialog className={navData => navData.isActive ? '' : ''} to={path}>
            <Image src={UserImage} alt="User" />
            <Name>{props.name}</Name>
        </Dialog>
    )
})
