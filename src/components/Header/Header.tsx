import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { NavLink } from 'react-router-dom';
import { recieveLogin, recieveIsAuth } from '../../redux/selectors/auth-selectors';
import { Button } from '../../styles/components';
import styled from 'styled-components';

/**
 * * styled-components
 */
const HeaderWrapper = styled.header`
  grid-area: header;
  background-color: var(--bg-color-medium);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 0.5em;
`;

const Title = styled.h1`
  flex: 8 8 80%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 3rem;
  font-weight: 900;
  color: aliceblue;
  text-shadow: 0.01em 0.01em 0.1em rgb(236, 223, 203);
`;

const LoginLogoutWrapper = styled.div`
  flex: 1 1 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: 0.1em;
`;

const Login = styled.div`
  color: aliceblue;
  padding-bottom: 1em;
`;

/**
 * * React Component
*/
export const Header: FC = (props) => {
  const login = useSelector(recieveLogin);
  const isAuth = useSelector(recieveIsAuth);

  const dispatch = useDispatch();
  const handleLogout = (): void => {
    dispatch(logout());
  }
  return (
    <HeaderWrapper>
      <Title>Social network</Title>
        <LoginLogoutWrapper>
         { isAuth 
          ? <LoginWrapper>
              <Login>{login}</Login>
              <Button onClick={handleLogout}>Logout</Button>
            </LoginWrapper> 
          : <NavLink to="/login">
                <Button>Login</Button>
            </NavLink>}
        </LoginLogoutWrapper>
    </HeaderWrapper>
  )
}
