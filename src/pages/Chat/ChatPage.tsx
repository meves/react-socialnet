import React, { ChangeEvent, FC, useEffect, useState } from 'react';

type ChatMessageType = {
    userId: number
    message: string
    photo: string
    userName: string
}

const ChatPage: FC = (props) => {
    return (
        <Chat/>
    )
}

const Chat: FC = (props) => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
    useEffect(() => {
        let ws: WebSocket;        
        const closeHandler = () => {
            console.log(`WS CLOSED`);
            setTimeout(createChannel, 10000);            
        }
        const createChannel = () => {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();            
            ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`);
            ws?.addEventListener('close', closeHandler)
            setWsChannel(ws);            
        }
        createChannel();
        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }
    }, []) 
    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageChatForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: FC<{wsChannel: WebSocket | null}> =({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    
    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            const newMessages = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);     
        }
        wsChannel?.addEventListener('message', messageHandler);
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }        
    }, [wsChannel]);
    return (
        <div style={{height: '55vh', overflow: 'auto'}}>
            {messages.map((message) => (
                <Message key={message.userId} message={message}/>
            ))}
        </div>
    )
}

type MessagePropsType = {
    message: ChatMessageType
}
const Message: FC<MessagePropsType> = (props) => {
    const message: ChatMessageType =  props.message;
    return (
        <div style={{display: "flex", alignItems: 'end', justifyContent: 'flex-start', padding: '2em', borderBottom: '2px solid black'}}>
            <img src={message.photo} alt="User Avatar" style={{width: '50px'}}/>
            <h2 style={{marginLeft: '2em'}}>{message.userName}</h2>
            <p style={{marginLeft: '2em'}}>{message.message}</p>
        </div>
    )
}

const AddMessageChatForm: FC<{wsChannel: WebSocket | null}> =({wsChannel}) => {
    const [message, setMessage] = useState<string>('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');
    
    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready');
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler);
        }
    }, [wsChannel]);
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.currentTarget.value);
    }
    const handleClick = () => {
        if (!message && !wsChannel?.OPEN) return;
        wsChannel?.send(message);
        setMessage('');
    }
    return (
        <div style={{marginTop: '2em'}}>
            <div>
                <textarea value={message} onChange={handleChange} cols={50} rows={5}></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={handleClick}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;
