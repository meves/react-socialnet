import { PersonType } from "../../types/types";

const initialState = {
    friendsNames: [
        {id: 1, name: 'Andrew'}, 
        {id: 2, name: 'Sveta'}, 
        {id: 3, name: 'Sasha'}
    ] as Array<PersonType>
}
type InitialStateType = typeof initialState

const navbarReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        default:
            return state;
    }
}

export default navbarReducer;
