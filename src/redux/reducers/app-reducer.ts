import { auth } from "./auth-reducer";
import { InferActionsTypes, ThunkActionType } from "../redux-store";

const initialState = {
    initialized: false
}
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
const actions = {
    initializeAppSuccess: () => ({
        type: "INITIALIZED_SUCCESS"
    } as const)
}

type ThunkType = ThunkActionType<ActionsTypes>;

export const initializeApp = (): ThunkType => 
    async (dispatch) => {
        const promises = [];
        promises.push(dispatch(auth()));
        // promises.push(dispatch(getTheme()));
        // promises.push(dispatch(getLanguage()));
        await Promise.all(promises);
        dispatch(actions.initializeAppSuccess());        
    }

export default appReducer;
