import { AppStateType } from "../redux-store";

export const recieveLogin = (state: AppStateType): string | null => state.auth.login;
export const recieveIsAuth = (state: AppStateType): boolean => state.auth.isAuth;
export const recieveUserId = (state: AppStateType): number | null => state.auth.id;
export const receiveCaptchaUrl = (state: AppStateType): string | null => state.auth.captchaUrl;
