import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const AUTH_ME = 'AUTH_ME';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
}
type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: AuthReducerActionType): InitialStateType => {
    switch (action.type) {
        case AUTH_ME:
            return {
                ...state,
                ...action.payload
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
type AuthReducerActionType = AuthMeActionType | SetCaptchaUrlActionType

type PayLoadType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type AuthMeActionType = {
    type: typeof AUTH_ME
    payload: PayLoadType
}
const authMe = (id: number|null, login: string|null, email: string|null, isAuth: boolean): AuthMeActionType => ({
    type: AUTH_ME,
    payload: { id, login, email, isAuth }
})

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    captchaUrl: string
}
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
}) 

// thunk-creators
export const auth = () => async (dispatch: any) => {
    const data = await authAPI.auth();
    if (data.resultCode === 0) {
        const {id, login, email} = data.data;
        return dispatch(authMe(id, login, email, true));
    }    
}

export const login = (email: string, password: string, rememberMe: boolean|undefined, captcha: boolean|undefined) => 
    async (dispatch: any) => {
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

const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptcha();    
    dispatch(setCaptchaUrl(data.url));
}

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(authMe(null, null, null, false));
    }
}
