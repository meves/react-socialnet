import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import { recieveIsAuth } from '../../redux/selectors/auth-selectors';
import LoginForm, { FormDataType } from './LoginForm';

export const Login: FC = () => {
    const isAuth = useSelector(recieveIsAuth);
    
    const dispatch = useDispatch();
    const onSubmit = (formData: FormDataType) => {
       const { email, password, rememberMe, captcha } = formData;
       dispatch(login(email, password, rememberMe, captcha));
    }
    if (isAuth) {
        return <Navigate to="/" />
    } else {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm onSubmit={onSubmit} />
            </div>
        )
    } 
}
