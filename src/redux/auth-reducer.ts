import { authAPI } from "../api/auth-api"; 
import { securityAPI } from "../api/security-api";
import { FormAction, stopSubmit } from "redux-form";
import { InferActionsTypes, ThunkActionType } from "./redux-store";
import { ResultCodeCaptcha, ResultCodes } from "../enums/responseCodes";

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
}
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_AUTH_ME":
            return {
                ...state,
                ...action.payload
            }
        case "SET_CAPTCHA_URL":
            return {
                ...state, 
                captchaUrl: action.captchaUrl
            }
        case "SET_USERID":
            return {
                ...state,
                id: action.userId
            }
        default:
            return state
    }
}

const actions = {
    setAuthMe: (id: number|null, login: string|null, email: string|null, isAuth: boolean) => ({
        type: "SET_AUTH_ME", payload: { id, login, email, isAuth }
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: "SET_CAPTCHA_URL", captchaUrl
    } as const),
    setUserId: (userId: number) => ({
        type: "SET_USERID", userId
    } as const)
}

type ThunkType = ThunkActionType<ActionsTypes | FormAction, void | ReturnType<typeof actions.setAuthMe>>;

export const auth = (): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.auth();
        if (data.resultCode === ResultCodes.Success) {
            const {id, login, email} = data.data;
            return dispatch(actions.setAuthMe(id, login, email, true));
        }    
    }

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean|undefined): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setUserId(data.data.userId));
            dispatch(auth());
        } else {
            if (data.resultCode === ResultCodeCaptcha.CaptchaUrlIsRequired) {
                dispatch(getCaptchaUrl());
            }
            const message: string = data.messages.length > 0 ? data.messages[0] : 'Incorrect Email or Password';
            dispatch(stopSubmit('loginForm', {_error: message}));
        }    
    }

    
const getCaptchaUrl = (): ThunkType => 
    async (dispatch) => {
        const data = await securityAPI.getCaptcha();    
        dispatch(actions.setCaptchaUrl(data.url));
    }

export const logout = (): ThunkType => 
    async (dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setAuthMe(null, null, null, false));
        }
    }

export default authReducer;
