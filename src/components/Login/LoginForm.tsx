import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import { email, maxLength30, minLength6, required } from '../../utils/validators/validators';
import { Input, Checkbox } from '../common/FormControls/FormControls';
import styles from '../common/FormControls/FormControls.module.scss';
import styled from 'styled-components';
import { Button } from '@mui/material';

/**
 * * styled-components
 */
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    box-shadow: 0.4em 0.4em var(--bg-login-form-shadow);
    border-radius: 0.4em;
    background-color: var(--bg-login-form);
`;

const InputField = styled.div`
    margin-bottom: 0.75em;

    input {
        width: 100%;
        font-size: 0.7rem;
        border-radius: 0.3em;
        padding: 0.3em 0.5em;
    }
`;

const CheckboxField = styled.div`
    margin-bottom: 0.75em;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
        appearance: none;
        height: 2em;
        width: 2em;
        margin-right: 1.5em;
        background-color: var(--checkbox-bg-color);
        border-radius: 0.5em;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: none;


        &::after {
            font-family: "Font Awesome 5 Free";
            content: "\f14a";
            font-weight: 900;
            font-size: 1rem;
            color: var(--checkbox-text-color);
            display: block;
            visibility: hidden;
        }

        &:hover {
            background-color: var(--checkbox-hover-color);
        }   

        &:checked {
            background-color: var(--checkbox-checked-color);
        }

        &:checked::after {
            visibility: visible;
        }
    }

    label {
        color: var(--checkbox-text-color);
    }
`;

/**
 * * React Component "LoginForm"
 */
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean | undefined
}

const LoginForm: FC<InjectedFormProps<FormDataType, {}> & {}> = (props) => {
    const captchaUrl = useSelector(receiveCaptchaUrl);
    return (
        <form onSubmit={props.handleSubmit}>
            <Fieldset>
                <InputField>                
                    <Field type="text" 
                            placeholder="login" 
                            label="login" 
                            name="email" 
                            component={Input} 
                            validate={[required, maxLength30, email]} 
                    />
                </InputField>
                <InputField>
                    <Field type="password" 
                            placeholder="password" 
                            label="password" 
                            name="password" 
                            component={Input} 
                            validate={[required, minLength6]} 
                    />
                </InputField>
                <CheckboxField>
                    <Field type="checkbox" 
                            label="rememberMe" 
                            name="rememberMe" 
                            component={Checkbox}
                    />                    
                </CheckboxField>
                { captchaUrl && <div>
                        <img src={captchaUrl} alt="Captcha" />
                        <Field component={Input} name="captcha" validate={[required]} />
                    </div>
                }
                { props.error &&     
                    <div className={styles.formSummaryError}>
                        {props.error}
                    </div>
                }
                <div>
                    <Button variant="contained" type="submit"
                            sx={{color: '#F7F8FC', backgroundColor: '#545365', '&:hover': {backgroundColor: '#202136'}}}>
                        Login
                    </Button>
                </div>
            </Fieldset>
        </form>
    )
}

export default reduxForm<FormDataType, {}>({form: 'loginForm'})(LoginForm);
