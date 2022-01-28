import React from 'react';
import styles from './Message.module.scss';

const Message = props => {
    return (
        <div className={styles.message}>
            {props.message}
        </div>
    )
}

export default Message;
