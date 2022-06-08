import React, { FC } from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`    
`;

const Circle = styled.span`
    display:  inline-block;
    width:  0.5em;
    height:  0.5em;
    margin-right: 0.1em;
    border-radius: 50%;
    animation-name: circle;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;

    &:nth-child(1) {
        background-color: yellow;
        animation-delay: 0;
    }
    &:nth-child(2) {
        background-color: red;
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        background-color: green;
        animation-delay: 0.4s;
    }
    &:nth-child(4) {
        background-color: blue;
        animation-delay: 0.6s;
    }
    &:nth-child(5) {
        background-color: violet;
        animation-delay: 0.8s;
    }
    /*
     * animation 
    */
    @keyframes circle {
        from {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        to {
            opacity: 1;
        }
    }
`;

export const Loading: FC = props => {
    return (
        <LoadingWrapper>
            <Circle></Circle><Circle></Circle><Circle></Circle><Circle></Circle><Circle></Circle>
        </LoadingWrapper>
    )
}
