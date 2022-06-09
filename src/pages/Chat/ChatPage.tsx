import { Box, Button, CardContent, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/reducers/chat-reducer';
import { receiveChatMessages, receiveChatSatus } from '../../redux/selectors/chat-selectors';
import { ChatMessageType } from '../../types/types';

/**
 * styled-components
 */
const ChatWrapper = styled.section`
    height: 150vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.5em 0;
    background-color: var(--bg-page);
`;

const Error = styled.div`
    border-radius: 2em;
    background-color: var(--bg-error-color);
    color: var(--light-text-color);
`;

const MessagesWrapper = styled.div`
    overflow: auto;
`;

const MessageWrapper = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1em 2em;
    background-color: var(--bg-post-item);
    margin-bottom: 0.5em;
    margin-right: 0.5em;
    border-radius: 0.5em;
    box-shadow: 0.1em 0.1em var(--bg-post-item-shadow);
`;

const Image = styled.img`
    min-width: 1.5em;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

/**
 * React cmponents
 */
const ChatPage: FC = (props) => {
    const chatStatus = useSelector(receiveChatSatus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [dispatch]);
    return (
        <ChatWrapper>
            { chatStatus === 'error' && <Error>{`Connection Error. Please reload page.`}</Error> }
            <Messages /> 
            <AddMessageChatForm />            
        </ChatWrapper>
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
        if (Math.abs((scrolledBox.scrollHeight - scrolledBox.scrollTop) - scrolledBox.clientHeight) < 700) {
            !isAutoScroll && setisAutoScroll(true);
        } else {
            isAutoScroll && setisAutoScroll(false);
        }
    }
    return (
        <MessagesWrapper onScroll={scrollHandler}>
            {messages.map((message) => (
                <Message key={message.id} message={message}/>
            ))}
            <div ref={messagesAnchorRef}></div>
        </MessagesWrapper>
    )
}

type MessagePropsType = {
    message: ChatMessageType
}
const Message: FC<MessagePropsType> = React.memo((props) => {
    const message: ChatMessageType =  props.message;
    return (
        <MessageWrapper>
            <Box sx={{ width: 60, height: 60, backgroundColor: 'transparent', borderRadius: '50%',
                    '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                        cursor: 'pointer'
                    },}}
            >
                <Image src={message.photo} alt="User Avatar"/>
            </Box>
            <CardContent style={{marginLeft: '2em', paddingTop: '0'}}>
                <Typography gutterBottom variant="h6" component="div">
                    {message.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {message.message}
                </Typography>
            </CardContent>
        </MessageWrapper>
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
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, minWidth: '28ch' } }} noValidate autoComplete="off">
                <TextField  id="outlined-multiline-flexible" label="enter your message" multiline
                            maxRows={5} value={message} onChange={handleChange}
                />
            </Box>
            <Box component={Button}>
                <Button variant="contained" disabled={chatStatus === 'pending'} onClick={handleClick}>Send</Button>
            </Box>
        </div>
    )
}

export default ChatPage;
