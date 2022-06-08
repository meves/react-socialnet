import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/auth-reducer';
import { NavLink } from 'react-router-dom';
import { recieveLogin, recieveIsAuth } from '../../redux/selectors/auth-selectors';
import styled from 'styled-components';
import { Button } from '@mui/material';

/**
 * * styled-components
 */
const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--bg-header);
  padding: 0.3em 0;
`;

const Logo = styled.div`
  font-size: 0.75rem;
  margin-left: 0.5em;
  border: 2px solid #fff;
  border-radius: 50%;
  padding: 0.5em;
  color: var(--light-text-color);
`;

const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 2rem;
  font-weight: 100;
  color: var(--light-text-color);
  margin: 0 0 0 2em;

  @media(max-width: 380px) {
    margin-left: 1em;
  }
  @media(max-width: 340px) {
    margin-left: 0;
  }
`;



const LoginWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 0.1em;
  margin-left: auto;
  margin-right: 0.5em;
`;

const Login = styled.div`
font-size: 0.75rem;
  color:  var(--light-text-color);
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
    <Header>
      <Logo>SM</Logo>
      <Title>Sergey Medvedkin</Title>
      { isAuth 
      ? <LoginWrapper>
          <Login>{login || ''}</Login>     
          <Button variant="contained" color="primary" onClick={handleLogout} >Logout</Button>
        </LoginWrapper> 
      : <LoginWrapper>
          <NavLink to="/login">
            <Button variant="contained" color="primary">Login</Button>
          </NavLink>
        </LoginWrapper>
      }
    </Header>        
  )
}
