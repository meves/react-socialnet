import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { email, maxLength30, minLength6, required } from '../../utils/validators/validators';
import { Input, Checkbox } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormControls/FormControls.module.scss';
import { recieveIsAuth, receiveCaptchaUrl } from '../../redux/selectors';

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

const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);

const Login = props => {
    const onSubmit = formData => {
       const { email, password, rememberMe, captcha } = formData;
       props.login(email, password, rememberMe, captcha);
    }
    if (props.isAuth) {
        return <Navigate to="/" />
    } else {
        return (
            <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        )
    } 
}

const mapStateToProps = state => ({
    isAuth: recieveIsAuth(state),
    captchaUrl: receiveCaptchaUrl(state)
})

export default connect(mapStateToProps, { login })(Login);
