import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/reducers/chat-reducer';
import { receiveChatMessages } from '../../redux/selectors/chat-selectors';
import { ChatMessageType } from '../../types/types';

const ChatPage: FC = (props) => {
    return (
        <Chat/>
    )
}

const Chat: FC = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [dispatch]);
    return (
        <div>
            <Messages />
            <AddMessageChatForm />
        </div>
    )
}

const Messages: FC =() => {
    const messages = useSelector(receiveChatMessages);    
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

const AddMessageChatForm: FC =() => {
    const [message, setMessage] = useState<string>('');
    const dispatch = useDispatch();
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.currentTarget.value);
    }
    const handleClick = () => {
        if (!message) return;
        dispatch(sendMessage(message));
        setMessage('');
    }
    return (
        <div style={{marginTop: '2em'}}>
            <div>
                <textarea value={message} onChange={handleChange} cols={50} rows={5}></textarea>
            </div>
            <div>
                <button onClick={handleClick}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;
