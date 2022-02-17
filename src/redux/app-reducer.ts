import { ThunkAction } from "redux-thunk";
import { auth, AuthMeActionType } from "./auth-reducer";
import { ActionsTypes, AppStateType } from "./redux-store";

const initialState = {
    initialized: false
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes<ActionType>): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default: 
            return state;
    }
}

// action-creators
const action = {
    initializeAppSuccess: () => ({
        type: "INITIALIZED_SUCCESS"
    } as const)
}
type ActionType = typeof action;

// thunk-creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const initializeApp = (): ThunkType => 
    async (dispatch) => {
        const promises: Array<Promise<AuthMeActionType | undefined>> = [];
        promises.push(dispatch(auth()));
        // promises.push(dispatch(getTheme()));
        // promises.push(dispatch(getLanguage()));
        await Promise.all(promises);
        dispatch(action.initializeAppSuccess());        
    }

export default appReducer;
