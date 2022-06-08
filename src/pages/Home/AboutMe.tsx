import React from "react";
import Author from '../../assets/images/Sergey_Medvedkin.jpg';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/**
 * * styled-components
 */
const Wrapper = styled.section`
    display: flex;
    align-items: center;
    background-color: var(--bg-block);
    border-radius: 0.5em;
`;

const TextBlock = styled.article`
    max-width: 75%;
    margin-right: 2em;
    margin-left: 1em;
    line-height: 1.5;
`;

const Figure = styled.figure`
    transform: scale(0.9);
    transition: transform 0.5s;
    padding: 0;
    border-radius: 0.5em;
    &:hover {
        transform: scale(0.95);
        transition: transform 0.5s;
        cursor: pointer;
    }
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const Figcaption = styled.figcaption`
    font-size: 0.5rem;
    text-align: center;
`;

/**
 * * React Component "AboutMe"
 */
export const AboutMe: React.FC = () => {
    return (
        <Wrapper>
            <TextBlock>
                <h2>My name is Sergey Medvedkin</h2>
                <p> Hello, I am Sergey Medvedkin. I practice in web development. This is my personal web-site. 
                    About my skills you can find out on my skills page. I specialize in front-end, but I also 
                    make backend API server on Node using Express and Nest. My site hosts on Timeweb servers.
                </p>
            </TextBlock>
            <Figure>
                <NavLink to="/profile">
                    <Image src={Author} alt="Sergey Medvedkin. Author of this site" title="Author Sergey Medvedkin"/>
                </NavLink>
                <Figcaption>Author: Medvedkin Sergey</Figcaption>                    
            </Figure>
        </Wrapper>
    )
}
