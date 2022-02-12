import { ThunkAction } from "redux-thunk";
import { auth, AuthMeActionType } from "./auth-reducer";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default: 
            return state;
    }
}

// action-creators
type ActionsTypes = InitializeAppSuccessActionType

type InitializeAppSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
const initializeAppSuccess = (): InitializeAppSuccessActionType => ({
    type: INITIALIZED_SUCCESS
})

// thunk-creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => 
    async (dispatch) => {
        const promises: Array<Promise<AuthMeActionType | undefined>> = [];
        promises.push(dispatch(auth()));
        // promises.push(dispatch(getTheme()));
        // promises.push(dispatch(getLanguage()));
        await Promise.all(promises);
        dispatch(initializeAppSuccess());        
    }

export default appReducer;
