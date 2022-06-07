import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/auth-reducer';
import { NavLink } from 'react-router-dom';
import { recieveLogin, recieveIsAuth } from '../../redux/selectors/auth-selectors';
import styled from 'styled-components';

/**
 * * styled-components
 */
const Header = styled.header`
  background-color: blue;
`;

const Title = styled.h1`
text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 2rem;
  font-weight: 900;
  color: aliceblue;
  text-shadow: 0.01em 0.01em 0.1em rgb(236, 223, 203);
  margin-bottom: 0;
  margin-left: 2em;
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  margin-left: auto;
`;

const AvatarIcon = styled.div`
  background-color: #87d068;
  margin-right: 1em;
`;

/**
 * * React Component
*/
export const AppHeader: FC = (props) => {
  const login = useSelector(recieveLogin);
  const isAuth = useSelector(recieveIsAuth);

  const dispatch = useDispatch();
  const handleLogout = (): void => {
    dispatch(logout());
  }
  return (
    <Header className="header" style={{display: 'flex', alignItems: 'center'}}>
      <div className="logo"/>
      <Title>Social network</Title>
      { isAuth 
      ? <LoginWrapper>
          <AvatarIcon title={login || ''}/>      
          <button onClick={handleLogout} >Logout</button>
        </LoginWrapper> 
      : <LoginWrapper>
          <NavLink to="/login">
            <button >Login</button>
          </NavLink>
        </LoginWrapper>
      }
    </Header>        
  )
}
