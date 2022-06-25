import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.3em 1em;
    margin-bottom: 0.5em;
    background-color: var(--bg-post-item);
    box-shadow: 0.1em 0.1em var(--bg-post-item-shadow);
    border-radius: 0.1em;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s;

    &:hover {
        cursor: pointer;
        background-color: var(--bluegray-medium);
        color: var(--dark-text-color);
    }
`;

type PropsType = {
    message: string
}

export const Message: FC<PropsType> = React.memo((props) => {
    return (
        <Wrapper>
            {props.message}
        </Wrapper>
    )
})
