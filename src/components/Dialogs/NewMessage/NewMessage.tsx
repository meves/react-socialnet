import React, { FC } from 'react';
import styles from './NewMessage.module.scss';
import { AddMessageType } from '../../../redux/dialog-reducer';
import MessageForm from './NewMessageForm';

type PropsType = {
    addMessage: (newMessage: string) => AddMessageType
}

const NewMessage: FC<PropsType> = (props): JSX.Element => {
    const onAddMessage = (formData: any) => {
        props.addMessage(formData.newMessage);
    }
    
    return (
        <div className={styles.newMessage}>
            <h2 className={styles.heading}>New message</h2>
            <MessageForm onSubmit={onAddMessage}/>
        </div> 
    )
}

export default NewMessage;
