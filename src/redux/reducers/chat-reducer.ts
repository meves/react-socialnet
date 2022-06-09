import { Dispatch } from "redux";
import { chatAPI } from "../../api/chat-api";
import { ChatMessageType, ChatStatusType } from "../../types/types";
import { InferActionsTypes, ThunkActionType } from "../redux-store";
import { v4 as uuidv4 } from 'uuid';

type ChatMessageTypeWithId = ChatMessageType & { id: string }
const initialState = {
    messages: [] as ChatMessageTypeWithId[],
    status: 'pending' as ChatStatusType
}
type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;
const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case "ADD_CHAT_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(message => ({...message, id: uuidv4()}))]
                        .filter((el, index, array) => index >= array.length - 30)                        
            }
        case 'SET_CHAT_STATUS':
            return {
                ...state,
                status: action.payload.status
            }    
        default:
            return state;
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'ADD_CHAT_MESSAGE',
        payload: { messages }
    } as const),
    setStatus: (status: ChatStatusType) => ({
        type: 'SET_CHAT_STATUS',
        payload: { status }
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
let _setStatusHandler: ((status: ChatStatusType) => void) | null = null;
const setStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_setStatusHandler === null) {
        _setStatusHandler = (status: ChatStatusType) => {
            dispatch(actions.setStatus(status))
        }
    }
    return _setStatusHandler;
}

type ThunkType = ThunkActionType<ActionsTypes, void>;

export const startMessagesListening = (): ThunkType => 
    async (dispatch) => {
        chatAPI.start();
        chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
        chatAPI.subscribe('status-changed', setStatusHandlerCreator(dispatch));
    }

export const stopMessagesListening = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
        chatAPI.unsubscribe('status-changed', setStatusHandlerCreator(dispatch));
        chatAPI.stop();
    }

export const sendMessage = (message: string): ThunkType => 
    async (dispatch) => {
        chatAPI.sendMessage(message);
    }

export default chatReducer;