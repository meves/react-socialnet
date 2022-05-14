import styled, { css } from "styled-components";

/**
 * * App
 */
 export const AppWrapper = styled.div`
    max-width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 2fr 10fr;
    grid-template-areas: "header header"
                        "navbar content"; 
 `;
 
 export const AppContent = styled.div`
    grid-area: content;
    width: 100%;
    background-color: var(--bg-color-dark);
    padding: 3em 2em;    
 `;  
    


/**
 * Button
 */
const cursorPointer = css`
    cursor: pointer;
`;

export const Button = styled.button`
  padding: 1em 1.5em;
  text-align: center;
  border: none;
  border-radius: 10%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1em;
  background: navy;
  color: aliceblue;
  
  &:hover {
      background: var(--bg-hover-button);
      color: var(--color-hover-button);
      ${cursorPointer}
  }
`;

export const SendButton = styled.button`
    font-size: 0.75rem;
    padding: 0.35em 1.5em;
    outline: none;
    border: 2px solid var(--wthite-color);
    background-color: var(--bg-color-dark);
    color: var(--white-text-color);
    border-radius: 0.3em;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: var(--bg-color-light);
        color: var(--black-color);
        transform: translateY(0.3em);
        border-color: var(--bg-color-medium);
        ${cursorPointer}
    }
`;

export const MoreButton = styled.button`
    margin-top: 2em;
    padding: 0.5em 1em;
    font-size: 1.5rem;
    outline: none;
    border: 7px solid var(--bg-color-light);
    background-color: var(--bg-color-medium);
    color: var(--wthite-color);
    border-radius: 0.5em;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    &:hover {
        cursor: pointer;
        background-color: var(--bg-color-light);
        color: var(--bg-color-dark);
        border-color: var(--wthite-color);
    }        
`;