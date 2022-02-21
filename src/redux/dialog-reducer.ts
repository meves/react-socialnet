import { PersonType, IMessageType } from "../types/types";
import { InferActionsTypes } from "./redux-store";

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
type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export const dialogReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
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

export const actions = {
    addMessage: (newMessage: string) => ({
        type: "ADD_MESSAGE", newMessage
    } as const)
}

export type AddMessageType = ReturnType<typeof actions.addMessage>;

export default dialogReducer;
