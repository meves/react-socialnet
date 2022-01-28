import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import navbarReducer from "./navbar-reducer";

const store = {
    _subscriber() {},
    subscribe(observer) {
        this._subscriber = observer;
    },
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Richard'},
                {id: 2, name: 'Thomas'},
                {id: 3, name: 'Leopold'},
                {id: 4, name: 'Elizabeth'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'Yo-yo-yo'}
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: '"Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It\'s my first post', likesCount: 5},
                {id: 3, message: 'Send me your messages', likesCount: 0},
                {id: 4, message: 'Nice to meet you, friends', likesCount: 20}
            ],
            newPostText: ''
        },
        navbar: {
            friendsNames: [
                {id: 1, name: 'Andrew'}, 
                {id: 2, name: 'Sveta'}, 
                {id: 3, name: 'Sasha'}
            ]
        }
    },
    getState() {
        return this._state;
    },
    dispatch(action) {        
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);

        this._subscriber();
    }
}

export default store;
