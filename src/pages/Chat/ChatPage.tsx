import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/reducers/chat-reducer';
import { receiveChatMessages, receiveChatSatus } from '../../redux/selectors/chat-selectors';
import { ChatMessageType } from '../../types/types';

const ChatPage: FC = (props) => {
    return (
        <Chat/>
    )
}

const Chat: FC = (props) => {
    const chatStatus = useSelector(receiveChatSatus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [dispatch]);
    return (
        <div>
            { chatStatus === 'error' && <div>{`Connection Error. Please reload page.`}</div> }
            <Messages /> 
            <AddMessageChatForm />            
        </div>
    )
}

const Messages: FC =() => {
    const [isAutoScroll, setisAutoScroll] = useState(true);
    const messages = useSelector(receiveChatMessages);    
    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages, isAutoScroll]);
    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        const scrolledBox = event.currentTarget;
        if (Math.abs((scrolledBox.scrollHeight - scrolledBox.scrollTop) - scrolledBox.clientHeight) < 100) {
            !isAutoScroll && setisAutoScroll(true);
        } else {
            isAutoScroll && setisAutoScroll(false);
        }
    }
    return (
        <div style={{height: '55vh', overflow: 'auto'}} onScroll={scrollHandler}>
            {messages.map((message) => (
                <Message key={message.userId} message={message}/>
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

type MessagePropsType = {
    message: ChatMessageType
}
const Message: FC<MessagePropsType> = React.memo((props) => {
    const message: ChatMessageType =  props.message;
    return (
        <div style={{display: "flex", alignItems: 'end', justifyContent: 'flex-start', padding: '2em', borderBottom: '2px solid black'}}>
            <img src={message.photo} alt="User Avatar" style={{width: '50px'}}/>
            <h2 style={{marginLeft: '2em'}}>{message.userName}</h2>
            <p style={{marginLeft: '2em'}}>{message.message}</p>
        </div>
    )
})

const AddMessageChatForm: FC =() => {
    const [message, setMessage] = useState<string>('');
    const chatStatus = useSelector(receiveChatSatus);
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
                <button disabled={chatStatus === 'pending'} onClick={handleClick}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;
