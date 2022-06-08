import React, { FC } from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-footer);
    color: var(--light-text-color);
    font-size: 0.5rem;
    padding: 1em 0;

    p {
        margin: 0 0 0.5em 0;        
    }

    a {
        color: var(--light-text-color);
        text-decoration: none;
    }
`;

export const AppFooter: FC = (props) => {
    return (
        <Footer>
           <p>All Rights Reserved ©2020</p> 
           <p>Created by Sergey Medvedkin
            <time dateTime="2020-08-20">&nbsp; 20.08.2020</time>
           </p>
           <p><a href="tel:8-918-253-8109">tel: 8-918-253-8109</a></p>
           <p><a href="mailto:meves.sergey@gmail.com">email: meves.sergey@gmail.com</a></p>
        </Footer>
    );
}
