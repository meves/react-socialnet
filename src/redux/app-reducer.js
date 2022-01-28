import { auth } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
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

const initializeAppSuccess = () => ({
    type: INITIALIZED_SUCCESS
})

export const initializeApp = () => async dispatch => {
    const promises = [];
    promises.push(dispatch(auth()));
    // promises.push(dispatch(getTheme()));
    // promises.push(dispatch(getLanguage()));
    await Promise.all(promises);
    dispatch(initializeAppSuccess());        
}

export default appReducer;
