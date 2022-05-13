import React, { FC } from 'react';
import MessageForm from './NewMessageForm';
import { FormDataType } from './NewMessageForm';
import { actions } from '../../../redux/dialog-reducer';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 1em;
`;

const Title = styled.h2`
    color: var(--white-text-color);
`;

export const NewMessage: FC = () => {
    const dispatch = useDispatch();
    const { addMessage } = actions;

    const onAddMessage = (formData: FormDataType) => {
        dispatch(addMessage(formData.newMessage));
    }
    
    return (
        <Wrapper>
            <Title>New message</Title>
            <MessageForm onSubmit={onAddMessage}/>
        </Wrapper> 
    )
}
