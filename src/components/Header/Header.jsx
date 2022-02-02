import React from 'react';
import styles from './Header.module.scss';
import Logo from './../../assets/images/logo.png';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { NavLink } from 'react-router-dom';
import { recieveLogin, recieveIsAuth } from '../../redux/selectors/auth-selectors';
import { compose } from 'redux';

const Header = props => {
    const handleLogout = () => {
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

const mapStateToProps = state => ({
  login: recieveLogin(state),
  isAuth: recieveIsAuth(state)
})

export default compose( connect(mapStateToProps, { logout }) )(Header);
