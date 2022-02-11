import React, { FC } from 'react';
import styles from './../ProfileData.module.scss';

type PropsType = {
    linkName: string
    linkValue: string
}
const SocialLink: FC<PropsType> = (props): JSX.Element => {
    return (
        <li className={styles.item}>
            <a className={styles.link} href={props.linkValue}>{props.linkName}</a>
        </li>
    )
}

export default SocialLink;
