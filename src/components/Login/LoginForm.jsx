import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { email, maxLength30, minLength6, required } from '../../utils/validators/validators';
import { Input, Checkbox } from '../common/FormControls/FormControls';
import styles from '../common/FormControls/FormControls.module.scss';

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset>
                <legend>Login form</legend>
                <div>                
                    <Field type="text" placeholder="login" label="login" name="email" component={Input} validate={[required, maxLength30, email]} />
                </div>
                <div>
                    <Field type="password" placeholder="password" label="password" name="password" component={Input} validate={[required, minLength6]} />
                </div>
                <div>
                    <Field type="checkbox" label="rememberMe" name="rememberMe" component={Checkbox}/>                    
                </div>
                { props.captchaUrl && <div>
                        <img src={props.captchaUrl} alt="Captcha" />
                        <Field component={Input} name="captcha" validate={[required]} />
                    </div>
                }
                { props.error &&     
                    <div className={styles.formSummaryError}>
                        {props.error}
                    </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </fieldset>
        </form>
    )
}

export default reduxForm({form: 'loginForm'})(LoginForm);
