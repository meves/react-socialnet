import styled, { css } from "styled-components";

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
