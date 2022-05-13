import React, { FC } from 'react';
import styled from 'styled-components';
import PreloaderGif from './../../../assets/images/preloader.gif';

const Wrapper = styled.div`
    max-width: 3em;
`;

const Image = styled.img``;

export const Preloader: FC = () => {    
    return (
        <Wrapper >
            <Image src={PreloaderGif} alt="Preloader"/>
        </Wrapper>
    )
}
