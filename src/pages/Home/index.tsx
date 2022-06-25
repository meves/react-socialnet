import React, { FC } from 'react';
import { AboutMe } from './AboutMe';
import { MySkills } from './MySkills';
import styled from 'styled-components';
import { Accordion } from '../../shared/ui/accordion';
import { accordionDescriptionData } from './data/accordion'; 

/** styled-components */
const HomePage = styled.section`
    color: var(--white-text-color);
    background-color: var(--bg-page)
`;


export const Home: FC = () => {
    return (
        <HomePage>
            <AboutMe />
            <Accordion accordionData={accordionDescriptionData}/>
            <MySkills />
        </HomePage>
    )
}
