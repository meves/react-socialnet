import React, { FC } from 'react';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { NavLink } from 'react-router-dom';
import { recieveLogin, recieveIsAuth } from '../../redux/selectors/auth-selectors';

export const Header: FC = (props) => {
  const login = useSelector(recieveLogin);
  const isAuth = useSelector(recieveIsAuth);

  const dispatch = useDispatch();
  const handleLogout = (): void => {
    dispatch(logout());
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Social network</h1>       
        <div className={styles.loginBlock}>
         { isAuth 
          ? <div className={styles.loginWrapper}>
              <div className={styles.login}>{login}</div>
              <button className="button" onClick={handleLogout}>Logout</button>
            </div> 
          : <NavLink to="/login">
              <div className={styles.loginWrapper}>
                <button className="button">Login</button>                  
              </div>
            </NavLink>}
        </div>
    </header>
  )
}
