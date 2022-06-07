import React, { FC } from 'react';
import styled from 'styled-components';
import PreloaderGif from './../../../assets/images/preloader.gif';

const Wrapper = styled.div`
    max-width: 3em;
    padding: 0em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: black;
`;

const Image = styled.img`
    width: 100%;
`;

export const Preloader: FC = () => {    
    return (
        <Wrapper >
            <Image src={PreloaderGif} alt="Preloader"/>
        </Wrapper>
    )
}
