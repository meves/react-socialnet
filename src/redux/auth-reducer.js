import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const AUTH_ME = 'AUTH_ME';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ME:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA_URL:
            return {
                ...state, 
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
}

// action-creators
const authMe = (id, login, email, isAuth) => ({
    type: AUTH_ME,
    data: {id, login, email, isAuth}
})

const setCaptchaUrl = captchaUrl => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
}) 

// thunk-creators
export const auth = () => async dispatch => {
    const data = await authAPI.auth();
    if (data.resultCode === 0) {
        const {id, login, email} = data.data;
        return dispatch(authMe(id, login, email, true));
    }    
}

export const login = (email, password, rememberMe, captcha) => async dispatch => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(auth());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        const message = data.messages.length > 0 ? data.messages[0] : 'Incorrect Email or Password';
        dispatch(stopSubmit('loginForm', {_error: message}));
    }    
}

const getCaptchaUrl = () => async dispatch => {
    const data = await securityAPI.getCaptcha();    
    dispatch(setCaptchaUrl(data.url));
}

export const logout = () => async dispatch => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(authMe(null, null, null, false));
    }
}
