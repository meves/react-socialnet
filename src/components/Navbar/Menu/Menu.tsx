import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatIcon from '@mui/icons-material/Chat';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SettingsIcon from '@mui/icons-material/Settings';

/**
 * * styled-components
 */
const Menu = styled(MenuList)`
  padding: 1em 0 0 0;
`;

const ListItem = styled(MenuItem)`
  padding: 0; 
`;

export const Item = styled(Link)`
    display: block;
    width: 100%;
    padding: 0.5em 0.5em 0.5em 0.5em;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--dark-text-color);
    text-decoration: none;    
    text-transform: uppercase;
`;

/**
 * * React Component "Menu"
 */

export const AppMenu: FC = () => {
    return (
      <Menu>
        <ListItem>
          <ListItemIcon> <GroupIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/">Home</Item> </ListItemText>        
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemIcon> <PersonIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/profile">Profile</Item> </ListItemText>        
        </ListItem>
        <ListItem>
          <ListItemIcon> <PersonSearchIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/users">Find users</Item> </ListItemText>        
        </ListItem>
        <ListItem>
          <ListItemIcon> <ForumIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/dialogs">Messages</Item> </ListItemText>        
        </ListItem>
        <ListItem>
          <ListItemIcon> <ChatIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/chat">Chat</Item> </ListItemText>        
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemIcon> <NewspaperIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/news">News</Item> </ListItemText>        
        </ListItem>
        <ListItem>
          <ListItemIcon> <LibraryMusicIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/music">Music</Item> </ListItemText>        
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemIcon> <SettingsIcon fontSize="small"/> </ListItemIcon>
          <ListItemText> <Item to="/settings">Settings</Item> </ListItemText>        
        </ListItem>
      </Menu>
    )
}
