import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0.5em;
    background-color: var(--bg-color-medium);
    border-radius: 0.5em;
`;

const SkillsBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items:center;
`;

const Skill = styled.div`
    padding: 0.5em;
    margin: 0.5em 0.25em;
    flex: 1 1 10em;
    border-radius: 0.3em;
    background-color: var(--bg-color-dark);
    transition: transform 0.2s, border-radius 0.2s;

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        border-radius: 0.2em;
        background-color: var(--selected-text-solor);
    }
`;

export const MySkills: React.FC = () => {
    const skills = ["JavaScript", "ES-6+", "TypeScript", "React", "Redux", "REST", "HTTP", "Unit testing",
                    "CSS/SASS", "Webpack", "Git"];
    return (
        <Wrapper>
            <h2>My skills</h2>
            <SkillsBlock>
                {skills.map((value, index) => (
                    <Skill key={index}>{value}</Skill>
                ))}
            </SkillsBlock>
        </Wrapper>
    )
}
