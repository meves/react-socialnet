import React, { FC } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import { recieveIsAuth, receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import LoginForm from './LoginForm';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
    isAuth: boolean
    captchaUrl: string | null
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined) => void
}

const Login: FC<PropsType> = (props): JSX.Element => {
    const onSubmit = (formData: any) => {
       const { email, password, rememberMe, captcha } = formData;
       props.login(email, password, rememberMe, captcha);
    }
    if (props.isAuth) {
        return <Navigate to="/" />
    } else {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm onSubmit={onSubmit} 
                    //captchaUrl={props.captchaUrl}
                />
            </div>
        )
    } 
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: recieveIsAuth(state),
    captchaUrl: receiveCaptchaUrl(state)
})

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined) => void
}

export default connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(mapStateToProps, { login })(Login);
