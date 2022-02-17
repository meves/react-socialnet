import { authAPI, securityAPI } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ActionsTypes, AppStateType } from "./redux-store";
import { ResponseDataAuthMeType, ResponseDataEmptyDataType, 
         ResponseDataGetCaptchaUrlType, ResponseDataLoginType } from "../api/types";
import { ResultCodeForGetCaptcha, ResultCodes } from "../enums/responseCodes";

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes<ActionType>): InitialStateType => {
    switch (action.type) {
        case "AUTH_ME":
            return {
                ...state,
                ...action.payload
            }
        case "SET_CAPTCHA_URL":
            return {
                ...state, 
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
}

const action = {
    authMe: (id: number|null, login: string|null, email: string|null, isAuth: boolean) => ({
        type: "AUTH_ME", payload: { id, login, email, isAuth }
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: "SET_CAPTCHA_URL", captchaUrl
    } as const) 
}
type ActionType = typeof action;
export type AuthMeActionType = ReturnType<typeof action.authMe>;

// thunk-creators
type AuthThunkType = ThunkAction<Promise<AuthMeActionType | undefined>, AppStateType, unknown, ActionsTypes<ActionType>>;
export const auth = (): AuthThunkType => 
    async (dispatch) => {
        const data: ResponseDataAuthMeType = await authAPI.auth();
        if (data.resultCode === ResultCodes.Success) {
            const {id, login, email} = data.data;
            return dispatch(action.authMe(id, login, email, true));
        }    
    }

type LoginThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType> | FormAction>;    
export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined)
: LoginThunkType => 
    async (dispatch) => {
        const data: ResponseDataLoginType = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(auth());
        } else {
            if (data.resultCode === ResultCodeForGetCaptcha.CaptchaUrl) {
                dispatch(getCaptchaUrl());
            }
            const message: string = data.messages.length > 0 ? data.messages[0] : 'Incorrect Email or Password';
            dispatch(stopSubmit('loginForm', {_error: message}));
        }    
    }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;
    
const getCaptchaUrl = (): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataGetCaptchaUrlType = await securityAPI.getCaptcha();    
        dispatch(action.setCaptchaUrl(data.url));
    }

export const logout = (): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataEmptyDataType = await authAPI.logout();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(action.authMe(null, null, null, false));
        }
    }

export default authReducer;
