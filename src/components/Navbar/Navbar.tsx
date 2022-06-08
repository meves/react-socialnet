import React, { FC } from 'react';
import { AppMenu } from './Menu/Menu';
import { FriendsBlock } from './Friends/FriendsBlock';
import styled from 'styled-components';

const Navbar = styled.nav`
    width: 320px;
    max-width: 100%;
    background-color: var(--bg-navbar);  
`;

export const AppNavbar: FC = () => {
    return (
        <Navbar>
            <AppMenu />
            <FriendsBlock />
        </Navbar>
    )
}
