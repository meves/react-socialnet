import { ChatStatusType } from "shared/types";
import { ChatMessageType } from "shared/types";

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: ChatStatusType) => void;
let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};
type EventsNamesType = keyof (typeof subscribers);
type InferedSubscribersType<T> = T extends {[key: string]: (infer U)[]} ? U : never;
type SubscribersType = InferedSubscribersType<typeof subscribers>;

let ws: WebSocket | null = null;   

const openHandler = () => {
    subscribers['status-changed'].forEach(s => s('ready'))
}

const messageHandler = (event: MessageEvent) => {
    const newMessages: ChatMessageType[] = JSON.parse(event.data);
    subscribers['messages-received'].forEach(s => s(newMessages));
}

const closeHandler = () => {
    subscribers['status-changed'].forEach(s => s('pending'))
    setTimeout(createChannel, 10000);            
}

const errorHandler = () => {
    subscribers['status-changed'].forEach(s => s('error'))
}

type CleanupType = 'reconnect' | 'stop';

const cleanup = (wsStatus: CleanupType) => {
    if (wsStatus === 'stop') { 
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
    }
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('error', errorHandler);
    ws?.close();
}

const createChannel = () => {
    cleanup('reconnect');
    ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`);
    ws?.addEventListener('open', openHandler);
    ws?.addEventListener('message', messageHandler);
    ws?.addEventListener('close', closeHandler);      
    ws?.addEventListener('error', errorHandler);       
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {        
        cleanup('stop');
    },
    subscribe(eventName: EventsNamesType, callback: SubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s!== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: SubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}
