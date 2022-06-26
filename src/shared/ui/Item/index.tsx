import { Link } from "react-router-dom";
import styled from "styled-components";

export const Item = styled(Link)`
    display: block;
    width: 100%;
    padding: 0.5em 0.5em 0.5em 0.5em;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--dark-text-color);
    text-decoration: none;    
    text-transform: uppercase;
`;
