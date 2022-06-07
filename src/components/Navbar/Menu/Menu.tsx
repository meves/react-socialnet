import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * * styled-components
 */
export const Item = styled(Link)`
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

export const AppMenu: FC = () => {
    return (
      <div>
        <Item to="/">Home</Item>
        <Item to="/profile">Profile</Item>
        <Item to="/dialogs">Messages</Item>
        <Item to="/users">Find users</Item>
        <Item to="/chat">Chat</Item>
        <Item to="/news">News</Item> 
        <Item to="/music">Music</Item>
        <Item to="/settings">Settings</Item>
      </div>
    )
}
