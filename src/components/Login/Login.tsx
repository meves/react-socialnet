import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { recieveIsAuth } from '../../redux/selectors/auth-selectors';
import LoginForm, { FormDataType } from './LoginForm';
import styled from 'styled-components';

/**
 * * styled-components
 */
const Wrapper = styled.section`
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

/**
 * * React Component "Login"
 */
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
            <Wrapper>
                <LoginForm onSubmit={onSubmit} />
            </Wrapper>
        )
    } 
}
