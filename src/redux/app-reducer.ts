import { auth } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: AppReducerActionType): InitialStateType => {
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
type AppReducerActionType = InitializeAppSuccessActionType

type InitializeAppSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
const initializeAppSuccess = (): InitializeAppSuccessActionType => ({
    type: INITIALIZED_SUCCESS
})

// thunk-creators
export const initializeApp = () => async (dispatch: any) => {
    const promises = [];
    promises.push(dispatch(auth()));
    // promises.push(dispatch(getTheme()));
    // promises.push(dispatch(getLanguage()));
    await Promise.all(promises);
    dispatch(initializeAppSuccess());        
}

export default appReducer;
