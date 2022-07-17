import React, { FC } from 'react';
import styled from 'styled-components';

const Item = styled.li`
    min-width: 5em;
    margin: 0.5em;
    padding: 0.4em 0.75em;
    border: 3px solid var(--bg-button-border);
    border-radius: 0.3em;
    text-align: center;
    transition: border-color 0.3s;

    &:hover {
        cursor: pointer;
        border-color: var(--blue-color);
        a {
            color: var(--blue-color);
        }
    }
`;

const Link = styled.a`
    display: block;
    margin-left: 0;
    font-size: 0.75rem;
    text-decoration: none;
    color: var(--light-text-color);
    transition: color 0.3s;
`;

type PropsType = {
    linkName: string
    linkValue: string
}
export const SocialLink: FC<PropsType> = React.memo((props) => {
    return (
        <Item>
            <Link href={props.linkValue} target="_blank">{ props.linkName }</Link>
        </Item>
    )
})
