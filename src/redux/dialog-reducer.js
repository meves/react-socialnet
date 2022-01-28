const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {    
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
        ]
}

export const dialogReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,  
                    {
                      id: state.messages.length + 1,
                      message: action.newMessage 
                    }
                ]
            }
        default: 
        return state;
    }
}

export const addMessage = newMessage => ({
    type: ADD_MESSAGE,
    newMessage
})

export default dialogReducer;
