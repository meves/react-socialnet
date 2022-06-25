import { AppStateType } from "redux/store";

export const receiveInitializeApp = (state: AppStateType):boolean => state.app.initialized;
