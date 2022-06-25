import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Logo } from 'components/common/Logo';
import { logout } from 'redux/reducers/auth-reducer';
import { recieveLogin, recieveIsAuth } from 'redux/selectors/auth-selectors';

import styled from 'styled-components';
import { Button } from 'shared/ui';

/** styled-components */
const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--bg-header);
  padding: 0.3em 0;
`;

const LogoWrapper = styled.div`
  margin-left: 0.5em;
  margin-right: 2em;
  
  @media(max-width: 600px) {
    margin-right: 1em;
  }
  @media(max-width: 380px) {
    margin-right: 0;
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 2rem;
  font-weight: 100;
  color: var(--light-text-color);
  margin: 0;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 0.1em;
  margin-left: auto;
  margin-right: 0.5em;

  @media(max-width: 383px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Login = styled.div`
  font-size: 0.75rem;
  color:  var(--light-text-color);
  margin-right: 1em;

  @media(max-width: 383px) {
    margin-bottom: 0.5em;
  }
`;

/** React Component */
export const AppHeader: FC = () => {
  const login = useSelector(recieveLogin);
  const isAuth: boolean = useSelector(recieveIsAuth);

  const dispatch = useDispatch();
  const handleLogout = (): void => {
    dispatch(logout());
  }
  return (
    <Header>
      <LogoWrapper><Logo /></LogoWrapper>
      <Title>Sergey Medvedkin</Title>
      { isAuth 
      ? <LoginWrapper>
          <Login>{login || ''}</Login>     
          <Button variant="contained" color="primary" onClick={handleLogout} >Logout</Button>
        </LoginWrapper> 
      : <LoginWrapper>
          <NavLink to="/login" style={{textDecoration: 'none'}}>
            <Button variant="contained" color="primary">Login</Button>
          </NavLink>
        </LoginWrapper>
      }
    </Header>        
  )
}

