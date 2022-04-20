import React, { FC } from 'react';
import styles from './Dialogs.module.scss';
import { NewMessage } from './NewMessage/NewMessage';
import { useGenerateDialogsElements, useGenerateMessagesElements } from '../../hooks/dialogs-hooks';

const DialogsPage: FC = () => {
    const dialogs = useGenerateDialogsElements();
    const messages = useGenerateMessagesElements();
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogBlock}>
                <div className={styles.dialogsItems}>
                    { dialogs }                
                </div>            
                <div className={styles.messages}>
                    { messages }
                </div>  
            </div>
            <NewMessage />        
        </div>
    )
}
export default DialogsPage; 
