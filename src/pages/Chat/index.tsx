import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message as MessageWrapper } from 'components/common/Message';
import { ChatMessageType } from 'types/types';
import { sendMessage, startMessagesListening, stopMessagesListening } from 'redux/reducers/chat-reducer';
import { receiveChatMessages, receiveChatSatus } from 'redux/selectors/chat-selectors';
import { withAuthNavigate } from 'hoc/withAuthNavigate';

import { Box, Button, TextField } from 'shared/ui';
import styled from 'styled-components';

/** styled-components */
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

/** React cmponents */
/** --ChatPage------------------------------------------------------------ */
const ChatPage: FC = () => {
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
/** --Messages------------------------------------------------------------ */
const Messages: FC =  React.memo(() => {
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
})
/** --Message------------------------------------------------------------- */
type MessagePropsType = {
    message: ChatMessageType
}
const Message: FC<MessagePropsType> = React.memo((props) => {
    const message: ChatMessageType =  props.message;
    return (
        <MessageWrapper message={message}/>            
    )
})
/** --AddMessageChatForm-------------------------------------------------- */
const AddMessageChatForm: FC = React.memo(() => {
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
})

export default withAuthNavigate(ChatPage);
