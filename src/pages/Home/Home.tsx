import React, { FC } from 'react';

import { AboutMe } from './AboutMe';
import { MySkills } from './MySkills';
import { accordionDescriptionData } from './data/accordion'; 

import { Accordion } from 'components';
import styled from 'styled-components';

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
