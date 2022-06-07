import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 2em;
    padding: 0.75em 1em;
    background-color: var(--bg-color-light);
    border-radius: 0.5em;
    transition: background-color 0.3s;

    &:hover {
        cursor: pointer;
        background-color: var(--bg-item-color);
        color: var(--gray-text-color);
    }
`;

type PropsType = {
    message: string
}

export const Message: FC<PropsType> = (props) => {
    return (
        <Wrapper>
            {props.message}
        </Wrapper>
    )
}
