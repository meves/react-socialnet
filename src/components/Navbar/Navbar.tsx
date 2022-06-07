import React, { FC } from 'react';
import { AppMenu } from './Menu/Menu';
import { FriendsBlock } from './Friends/FriendsBlock';
import styled from 'styled-components';

const Nav = styled.nav`
    grid-area: navbar;
    background-color: var(--bg-color-light);  
`;

export const Navbar: FC = () => {
    return (
        <Nav>
            <AppMenu />
            <FriendsBlock />
        </Nav>
    )
}
