const initialState = {
    friendsNames: [
        {id: 1, name: 'Andrew'}, 
        {id: 2, name: 'Sveta'}, 
        {id: 3, name: 'Sasha'}
    ]
}

const navbarReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default navbarReducer;
