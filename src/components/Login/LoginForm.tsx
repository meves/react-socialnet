import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { receiveCaptchaUrl } from '../../redux/selectors/auth-selectors';
import { email, maxLength30, minLength6, required } from '../../utils/validators/validators';
import { Input, Checkbox } from '../common/FormControls/FormControls';
import styles from '../common/FormControls/FormControls.module.scss';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { CheckboxField, InputField } from '../../styles/components';

/** styled-components */
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



/** React Component "LoginForm */
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
                            label="Remember me" 
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
