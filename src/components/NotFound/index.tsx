import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 70%;
    height: 10vh;
    margin: 0 auto;
    background-color: var(--bg-color-medium);
    padding: 5em 3em;
    border-radius: 0.5em;
`;

const Title = styled.h3`
    color: var(--error-color);
    text-transform: uppercase;
    letter-spacing: 0.025em;
`;

const Text = styled.p`
    color: var(--error-color);
`;

export const NotFound: FC = React.memo(() => {
    return (
        <Wrapper>
            <Title>The Requested Page Was Not Found</Title>
            <Text>Please, try another url address</Text>
        </Wrapper>
    )
})
