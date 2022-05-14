import React, { FC } from 'react';
import { SocialLink } from './SocialLink';
import styled from 'styled-components';
import { ContactsType, UserProfileType } from '../../../../../types/types';

const List = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    padding-left: 0;
`;

type PropsTypes = {
    profile: UserProfileType
}

export const SocialBlock: FC<PropsTypes> = (props) => {
    const items = [];
    for (let [key, value] of Object.entries(props.profile.contacts)) {
        items.push(<SocialLink key={key} linkName={key} linkValue={value}/>);       
    }
    return (
        <div>
            <h3>Contacts: </h3>
            <List>{ items }</List>
        </div>
    )
}
