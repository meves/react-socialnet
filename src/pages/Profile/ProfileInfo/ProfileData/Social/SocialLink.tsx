import React, { FC } from 'react';
import styled from 'styled-components';

const Item = styled.li`
    padding: 0.5em 1em;
    border: 1px solid var(--gray-color);
    border-radius: 0.5em;
    text-align: center;
    transition: font-weight 0.3s, border-color 0.3s;

    &:hover {
        cursor: pointer;
        font-weight: bold;
        border-color: var(--wthite-color);
    }
`;

const Link = styled.a`
    display: block;
    margin-left: 0;
    font-size: 0.75rem;
    text-decoration: none;
    color: var(--white-text-color);
`;

type PropsType = {
    linkName: string
    linkValue: string
}
export const SocialLink: FC<PropsType> = (props) => {
    return (
        <Item>
            <Link href={props.linkValue}>{ props.linkName }</Link>
        </Item>
    )
}
