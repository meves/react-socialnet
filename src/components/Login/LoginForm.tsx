import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import { SendButton } from '../../styles/components';
import { email, maxLength30, minLength6, required } from '../../utils/validators/validators';
import { Input, Checkbox } from '../common/FormControls/FormControls';
import styles from '../common/FormControls/FormControls.module.scss';
import styled from 'styled-components';

/**
 * * styled-components
 */
const Fieldset = styled.fieldset`
    padding: 1em;
    border: 2px solid var(--white-color);
    border-radius: 0.3em;
    background-color: hsl(240, 60%, 40%);
`;

const Legend = styled.legend`
    color: var(--white-color);
    padding-left: 0.3em;
    padding-right: 0.3em;
    font-weight: 500;
    letter-spacing: 0.05em;
`;

const InputField = styled.div`
    margin-bottom: 0.75em;

    input {
        width: 60%;
        font-size: 0.75rem;
        border-radius: 0.3em;
        padding: 0.2em 0.5em;
        margin-right: 0.5em;
        outline: none;
        letter-spacing: 0.05em;
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
        background-color: rgb(255, 255, 255);
        border: 3px solid rgb(27, 199, 21);
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
            color:rgb(255, 255, 255);
            display: block;
            visibility: hidden;
        }

        &:hover {
            background-color: rgba(69, 240, 17, 0.822);
        }   

        &:checked {
            background-color: rgb(45, 197, 25);
        }

        &:checked::after {
            visibility: visible;
        }
    }

    label {
        color: #fff;
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
                <Legend>Login form</Legend>
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
                    <SendButton>Login</SendButton>
                </div>
            </Fieldset>
        </form>
    )
}

export default reduxForm<FormDataType, {}>({form: 'loginForm'})(LoginForm);
