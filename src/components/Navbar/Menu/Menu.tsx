import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { menuItems, MenuItemType } from './menuItems';
import styled from 'styled-components';
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';

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

const LI = styled(ListItem)`
  display: flex;

  @media(max-width: 415px) {
    flex-direction: column;
  }
`;

/**
 * * React Component "Menu"
 */

export const AppMenu: FC = React.memo(() => {
    return (
      <Menu>
        { menuItems.map((item: MenuItemType) => (
          <>
            <LI key={item.id}>
              <ListItemIcon children={<item.icon/>} />
              <ListItemText> <Item to={item.path}>{item.name}</Item> </ListItemText>        
            </LI>
            { (item.id === 1 || item.id === 5) && <Divider/> } 
          </>
        ))}        
      </Menu>
    )
})
