import React, { FC } from 'react';
import styles from './NewMessage.module.scss';
import MessageForm from './NewMessageForm';
import { FormDataType } from './NewMessageForm';
import { actions } from '../../../redux/dialog-reducer';
import { useDispatch } from 'react-redux';

export const NewMessage: FC = () => {
    const dispatch = useDispatch();
    const { addMessage } = actions;

    const onAddMessage = (formData: FormDataType) => {
        dispatch(addMessage(formData.newMessage));
    }
    
    return (
        <div className={styles.newMessage}>
            <h2 className={styles.heading}>New message</h2>
            <MessageForm onSubmit={onAddMessage}/>
        </div> 
    )
}
