import { Dispatch } from "redux";
import { chatAPI } from "../../api/chat-api";
import { ChatMessageType } from "../../types/types";
import { InferActionsTypes, ThunkActionType } from "../redux-store";

const initialState = {
    messages: [] as ChatMessageType[]
}
type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;
const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case "ADD_CHAT_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'ADD_CHAT_MESSAGE',
        payload: { messages }
    } as const)
}

// memoization
let _newMessageHandler: ((messages: ChatMessageType[]) =>void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

type ThunkType = ThunkActionType<ActionsTypes, void>;
export const startMessagesListening = (): ThunkType => 
    async (dispatch) => {
        chatAPI.start();
        chatAPI.subscribe(newMessageHandlerCreator(dispatch));
    }

export const stopMessagesListening = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
        chatAPI.stop();
    }

export const sendMessage = (message: string): ThunkType => 
    async (dispatch) => {
        chatAPI.sendMessage(message);
    }

export default chatReducer;