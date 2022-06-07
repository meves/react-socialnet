import { ChatMessageType } from "../types/types";

type SubscriberType = (messages: ChatMessageType[]) => void;

let subscribers: SubscriberType[] = [];

let ws: WebSocket | null = null;   

const closeHandler = () => {
    console.log(`WS CLOSED`);
    setTimeout(createChannel, 10000);            
}
const messageHandler = (event: MessageEvent) => {
    const newMessages: ChatMessageType[] = JSON.parse(event.data);
    subscribers.forEach(s => s(newMessages));
}

const createChannel = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.close();            
    ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`);
    ws?.addEventListener('message', messageHandler);
    ws?.addEventListener('close', closeHandler);               
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener('message', messageHandler);
        ws?.removeEventListener('close', closeHandler);
        ws?.close();
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback);
        // return () => {
        //     subscribers = subscribers.filter(s => s!== callback)
        // }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}
