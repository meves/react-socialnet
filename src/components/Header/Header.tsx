import React, { FC } from 'react';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { NavLink } from 'react-router-dom';
import { recieveLogin, recieveIsAuth } from '../../redux/selectors/auth-selectors';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
  login: string | null
  isAuth: boolean
  logout: () => void
}

const Header: FC<PropsType> = (props): JSX.Element => {
    const handleLogout = (): void => {
      props.logout();
    }
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>Social network</h1>       
          <div className={styles.loginBlock}>
            {props.isAuth 
            ? <div className={styles.loginWrapper}>
                <div className={styles.login}>{props.login}</div>
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

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: recieveLogin(state),
  isAuth: recieveIsAuth(state)
})

type MapDispatchPropsType = {
  logout: () => void
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(Header);
