import { authAPI, securityAPI } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

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

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
type ActionsTypes = AuthMeActionType | SetCaptchaUrlActionType

type PayLoadType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
export type AuthMeActionType = {
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
type AuthThunkType = ThunkAction<Promise<AuthMeActionType | undefined>, AppStateType, unknown, ActionsTypes>;
export const auth = (): AuthThunkType => 
    async (dispatch) => {
        const data = await authAPI.auth();
        if (data.resultCode === 0) {
            const {id, login, email} = data.data;
            return dispatch(authMe(id, login, email, true));
        }    
    }

type LoginThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>;    
export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined)
: LoginThunkType => 
    async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(auth());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            const message: string = data.messages.length > 0 ? data.messages[0] : 'Incorrect Email or Password';
            dispatch(stopSubmit('loginForm', {_error: message}));
        }    
    }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
    
const getCaptchaUrl = (): ThunkType => 
    async (dispatch) => {
        const data = await securityAPI.getCaptcha();    
        dispatch(setCaptchaUrl(data.url));
    }

export const logout = (): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(authMe(null, null, null, false));
        }
    }

export default authReducer;
