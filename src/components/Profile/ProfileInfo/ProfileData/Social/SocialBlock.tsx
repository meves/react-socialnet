import React, { FC } from 'react';
import SocialLink from './SocialLink';
import styles from './../ProfileData.module.scss';
import { ContactsType, UserProfileType } from '../../../../../types/types';

type PropsTypes = {
    profile: UserProfileType
}

const SocialBlock: FC<PropsTypes> = (props): JSX.Element => {
    const contacts: ContactsType = props.profile.contacts;
    const items: Array<JSX.Element> = [];
    for (let [key, value] of Object.entries(contacts)) {
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
