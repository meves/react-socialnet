import React from 'react';
import SocialLink from './SocialLink';
import styles from './../ProfileData.module.scss';

const SocialBlock = props => {
    const items = [];
    for (let [key, value] of Object.entries(props.profile.contacts)) {
        items.push(<SocialLink key={key} linkName={key} linkValue={value}/>);       
    }
    return (
        <div className={styles.socialBlock}>
            <h3>Contacts: </h3>
            <ul className={styles.list}>
                    {items}
            </ul>
        </div>
    )
}

export default SocialBlock;
