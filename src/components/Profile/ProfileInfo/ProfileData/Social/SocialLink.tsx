import React, { FC } from 'react';
import styles from './../ProfileData.module.scss';

type PropsType = {
    linkName: string
    linkValue: string
}
export const SocialLink: FC<PropsType> = (props) => {
    return (
        <li className={styles.item}>
            <a className={styles.link} 
               href={props.linkValue}>{props.linkName}
            </a>
        </li>
    )
}
