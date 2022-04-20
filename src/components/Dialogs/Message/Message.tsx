import React, { FC } from 'react';
import styles from './Message.module.scss';

type PropsType = {
    message: string
}

export const Message: FC<PropsType> = (props) => {
    return (
        <div className={styles.message}>
            {props.message}
        </div>
    )
}
