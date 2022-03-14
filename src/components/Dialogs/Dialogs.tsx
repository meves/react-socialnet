import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessage from './NewMessage/NewMessage';
import { actions, AddMessageType } from '../../redux/dialog-reducer';
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { recieveDialogs, receiveMessages } from '../../redux/selectors/dialogs-selectors';
import { IMessageType, PersonType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
    dialogs: Array<PersonType>
    messages: Array<IMessageType>
    addMessage: (newMessage: string) => AddMessageType
}
const Dialogs: FC<PropsType> = (props): JSX.Element => {
    const { dialogs, messages } = props;
    const dialogsItems: JSX.Element[] = dialogs.map((dialog: PersonType): JSX.Element => (
        <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />
    ))
    const messagesItems: JSX.Element[] = messages.map((message: IMessageType): JSX.Element => (
        <Message key={message.id} message={message.message} />
    ))    
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogBlock}>
                <div className={styles.dialogsItems}>
                {dialogsItems}                
                </div>            
                <div className={styles.messages}>
                    {messagesItems}
                </div>  
            </div>
            <NewMessage addMessage={props.addMessage} />        
        </div>
    )
}

type MapStatePropsType = {
    dialogs: Array<PersonType>
    messages: Array<IMessageType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    dialogs: recieveDialogs(state),
    messages: receiveMessages(state)
})

type MapDispatchPropsType = {
    addMessage: (newMessage: string) => AddMessageType 
}

const { addMessage } = actions;

export default compose<React.ComponentType>( 
    //withAuthNavigate, 
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, 
        { addMessage }) )(Dialogs); 
