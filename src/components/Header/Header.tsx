import React, { FC } from 'react';
import styles from './Header.module.scss';
import Logo from './../../assets/images/logo.png';
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
        <img className={styles.image} src={Logo} alt="logo" />        
          <div className={styles.loginBlock}>
            {props.isAuth 
            ? <div>
                <div>{props.login}</div>
                <button onClick={handleLogout}>Logout</button>
              </div> 
            : <NavLink to="/login">
                <button>Login</button>
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
