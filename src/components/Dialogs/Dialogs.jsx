import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessage from './NewMessage/NewMessage';
import { addMessage } from '../../redux/dialog-reducer';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { recieveDialogsPage } from '../../redux/selectors';

const Dialogs = props => {
    const dialogsPage = props.dialogsPage;
    const dialogsItems = dialogsPage.dialogs.map(dialog => (
        <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />
    ))
    const messagesItems = dialogsPage.messages.map(message => (
        <Message key={message.id} message={message.message} />
    ))    
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
               {dialogsItems}                
            </div>            
            <div className={styles.messages}>
                {messagesItems}
            </div>  
            <NewMessage addMessage={props.addMessage} />        
        </div>
    )
}

const mapStateToProps = state => ({
    dialogsPage: recieveDialogsPage(state)
})

export default compose(
    withAuthNavigate,
    connect(mapStateToProps, { addMessage })
)(Dialogs); 
