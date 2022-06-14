import React, { FC } from 'react';
import { AboutMe } from './AboutMe';
import { MySkills } from './MySkills';
import styled from 'styled-components';
import ControlledAccordions from '../../components/common/Panels/Accordion';

/**
 * * styled-components
 */
const HomePage = styled.section`
    color: var(--white-text-color);
    background-color: var(--bg-page)
`;

export const Home: FC = () => {
    return (
        <HomePage>
            <AboutMe/>
            <ControlledAccordions/>
            <MySkills/>
        </HomePage>
    )
}
