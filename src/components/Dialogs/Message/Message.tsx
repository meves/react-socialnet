import React, { FC } from 'react';
import styles from './Message.module.scss';

type PropsType = {
    message: string
}

const Message: FC<PropsType> = (props): JSX.Element => {
    return (
        <div className={styles.message}>
            {props.message}
        </div>
    )
}

export default Message;
