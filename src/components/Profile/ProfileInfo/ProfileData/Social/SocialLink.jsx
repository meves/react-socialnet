import React from 'react';
import styles from './../ProfileData.module.scss';

const SocialLink = props => {
    return (
        <li className={styles.item}><a className={styles.link} href={props.linkValue}>{props.linkName}</a></li>
    )
}

export default SocialLink;
