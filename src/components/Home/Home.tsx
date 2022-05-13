import React, { FC, useState } from 'react';
import { AboutMe } from './AboutMe';
import { MySkills } from './MySkills';
import styled from 'styled-components';

/**
 * * styled-components
 */
const HomePage = styled.section`
    color: var(--white-text-color);
`;

const TitleGroup = styled.hgroup`
    display: flex;
    justify-content: flex-start;
    padding: 0;
`;

const Title = styled.h2`
    background-color: var(--bg-color-medium);
    text-transform: uppercase;
    font-size: 1rem;
    padding: 0.5em 0.75em;
    border-radius: 0.3em;
    margin-top: 0;
    margin-bottom: 0.9em;
    
    &:hover {
        cursor: pointer;
    }

    &:first-child {
        margin-right: 0.3em;
        margin-left: 0.1em;
    }
`;

/**
 * * React Component
 */
export const Home: FC = () => {
    const [isAbout, setAbout] = useState(true);
    return (
        <HomePage>
            <TitleGroup>
                <Title onClick={() => setAbout(true)}>About me</Title>
                <Title onClick={() => setAbout(false)}>My slills</Title>
            </TitleGroup>
            {isAbout ? <AboutMe/> : <MySkills/>}
        </HomePage>
    )
}
