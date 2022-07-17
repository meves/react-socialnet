import React, { FC, MouseEvent, useState } from 'react';

import { menuItems, MenuItemType } from './data/MenuItems';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from 'components';
import { Item } from 'components/Item';


/** styled-components */
const Menu = styled(MenuList)`
  padding: 1em 0 0 0;
`;

const ListItem = styled(MenuItem)`
  padding: 0; 
`;

const ListItemWrapper = styled(ListItem)`
  display: flex;

  @media(max-width: 415px) {
    flex-direction: column;
  }
  &.active,
  &.active:hover {
    background-color: var(--bg-menuitem-hover);
  }
`;

/** React Component "Menu */
type PropsType = {
  changeOpenedState: () => void
  moveMenu: (navbar: HTMLElement | null, burger: EventTarget & HTMLButtonElement) => void
}
export const AppMenu: FC<PropsType> = (props) => {
  const pathname = useLocation().pathname;

  const [currentItemId, setCurrentItemId] = useState<number | null>(() => {
      let itemId: number | null = null;
      menuItems.forEach(item => {
        if (item.path === pathname) {
          itemId = item.id
        }
      })
      return itemId;
  });
  
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
          <ListItemWrapper 
                        onClick={() => setCurrentItemId(item.id)}
                        className={item.id === currentItemId ? 'active' : ''}>
            <ListItemIcon children={<item.icon/>} />
            <ListItemText> 
              <Item to={item.path}>
                { item.name }
              </Item> 
            </ListItemText>        
          </ListItemWrapper>
          { (item.id === 1 || item.id === 5) && <Divider/> } 
        </div> 
      ))}        
    </Menu>
  )
}
