import React, { FC } from 'react';
import styled from 'styled-components';

const AppFooterWrapper = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AppFooter: FC = (props) => {
    return (
        <AppFooterWrapper>
           <p>Social Net ©2020</p> 
           <p>Created by Sergey Medvedkin
            <time dateTime="2020-08-20">&nbsp; 20.08.2020</time>
           </p>
           <p><a href="tel:8-918-253-8109">tel: 8-918-253-8109</a></p>
           <p><a href="mailto:meves.sergey@gmail.com">email: meves.sergey@gmail.com</a></p>
        </AppFooterWrapper>
    );
}
