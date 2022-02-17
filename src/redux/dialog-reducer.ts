import { PersonType, IMessageType } from "../types/types";
import { ActionsTypes } from "./redux-store";

const initialState = {    
        dialogs: [
            {id: 1, name: 'Richard'},
            {id: 2, name: 'Thomas'},
            {id: 3, name: 'Leopold'},
            {id: 4, name: 'Elizabeth'}
        ] as Array<PersonType>,
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you'},
            {id: 3, message: 'Yo-yo-yo'}
        ] as Array<IMessageType>
}
type InitialStateType = typeof initialState

export const dialogReducer = (state=initialState, action: ActionsTypes<ActionType>): InitialStateType => {
    switch(action.type) {
        case "ADD_MESSAGE":
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

export const action = {
    addMessage: (newMessage: string) => ({
        type: "ADD_MESSAGE", newMessage
    } as const)
}
type ActionType = typeof action;
export type AddMessageType = ReturnType<typeof action.addMessage>;

export default dialogReducer;
