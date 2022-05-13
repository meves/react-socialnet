import React from "react";
import Author from '../../assets/images/Sergey_Medvedkin.jpg';
import styled from "styled-components";

/**
 * * styled-components
 */
const Wrapper = styled.section`
    display: flex;
    align-items: center;
    background-color: var(--bg-color-medium);
    border-radius: 0.5em;
`;

const TextBlock = styled.article`
    max-width: 75%;
    margin-right: 2em;
    margin-left: 1em;
    line-height: 1.5;
`;

const Figure = styled.figure`
    transform: scale(1);
    transition: transform 1s;
    background-color: var(--bg-color-light);
    padding:0.5em;
    border-radius: 0.5em;
    &:hover {
        transform: scale(1.1);
        transition: transform 1s;
        cursor: pointer;
    }
`;

const Image = styled.img`
    object-fit: contain;
    border-radius: 0.5em;
`;

const Figcaption = styled.figcaption`
    font-size: 0.75rem;
    text-align: center;
`;

/**
 * * React Component "AboutMe"
 */
export const AboutMe: React.FC = () => {
    return (
        <Wrapper>
            <TextBlock>
                <h2>Hello, it's about me</h2>
                <p> Hello, My name is Sergey Medvedkin. I am a web developer. This site was created by myself as 
                    an example of my skills. I specialize in React. I also have practice in JavaScript ES-5, ES-6+
                </p>
            </TextBlock>
            <Figure>
                <Image src={Author} alt="Sergey Medvedkin. Author of this site" title="Author Sergey Medvedkin"/>
                <Figcaption>Author: Medvedkin Sergey</Figcaption>
            </Figure>
        </Wrapper>
    )
}
