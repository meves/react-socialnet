import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/**
 * * styled-components
 */
const List = styled.ul`
    list-style-type: none;
    margin-top: 3em;
    margin-bottom: 0;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Item = styled(NavLink)`
    display: block;
    width: 100%;
    margin-left: 0;  
    padding-left: 2em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
    color: #000;
    text-decoration: none;    
    
    &:hover {
        background-color: var(--bg-color-medium);
        cursor: pointer;
    }
          
    &:active {
      color: #fff;
    }  
`;

/**
 * * React Component "Menu"
 */
export const Menu: FC = () => {
    return (
        <List>
            <Item to="/">Home</Item>
            <Item to="/profile">Profile</Item>
            <Item to="/dialogs">Messages</Item>
            <Item to="/news">News</Item>
            <Item to="/music">Music</Item>
            <Item to="/users">Find users</Item>
            <Item to="/settings">Settings</Item>
        </List>
    )
}
