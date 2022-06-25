import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { menuItems, MenuItemType } from './data/menuItems';

import styled from 'styled-components';
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from 'shared/ui';


/** styled-components */
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

/** React Component "Menu */
type PropsType = {
  changeOpenedState: () => void
  moveMenu: (navbar: HTMLElement | null, burger: EventTarget & HTMLButtonElement) => void
}
export const AppMenu: FC<PropsType> = React.memo((props) => {
  const handleMenuClick = (event: MouseEvent<HTMLUListElement>) => {
    const navbar = event.currentTarget.parentElement;
    let burger: EventTarget & HTMLButtonElement;
    if (navbar) { 
      //@ts-ignore
      burger = navbar.children[0];
    }
    //@ts-ignore
    props.moveMenu(navbar, burger); 
    props.changeOpenedState();
  }  
  return (
    <Menu onClick={handleMenuClick}>
      { menuItems.map((item: MenuItemType) => (
        <div key={item.id}>
          <LI>
            <ListItemIcon children={<item.icon/>} />
            <ListItemText> <Item to={item.path}>{item.name}</Item> </ListItemText>        
          </LI>
          { (item.id === 1 || item.id === 5) && <Divider/> } 
        </div> 
      ))}        
    </Menu>
  )
})
