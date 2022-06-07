import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import thunkMiddleWare, { ThunkAction } from "redux-thunk";
import dialogReducer from "./reducers/dialog-reducer";
import profileReducer from "./reducers/profile-reducer";
import navbarReducer from "./reducers/navbar-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./reducers/app-reducer";
import chatReducer from "./reducers/chat-reducer";

const rootReducer = combineReducers({
    dialogsPage: dialogReducer,
    profilePage: profileReducer,
    navbar: navbarReducer,
    usersPage: usersReducer, 
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chatPage: chatReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppStateType = ReturnType<typeof store.getState>;

export type InferActionsTypes<T> = T extends {[key: string] : (...args: any[]) => infer U} ? U : "never";

export type ThunkActionType<A extends Action, R=void> = ThunkAction<Promise<R>, AppStateType, unknown, A>;

export default store;
