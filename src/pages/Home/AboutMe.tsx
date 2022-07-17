import React from "react";
import { useSelector } from "react-redux";

import { FigureImage } from "components/FigureImage";
import { recieveUserProfilePhoto } from "redux/selectors/profile-selectors";
import { aboutMeData } from "./data/aboutMe";
import Icon from 'assets/images/Sergey_Medvedkin.jpg';

import styled from "styled-components";
import { Alert, Box, Typography } from "components";

/*** styled-components */
const TextBlock = styled.article`
    max-width: 75%;
    margin-right: 1em;
    margin-left: 1em;
    line-height: 1.5;
`;

/** React Component "AboutMe" */
export const AboutMe: React.FC = React.memo(() => {
    const photos = useSelector(recieveUserProfilePhoto);
    return (
        <>
        <Alert severity="warning">
            To test this site, please enter email: " free@samuraijs.com " and password: " free " !
        </Alert>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-block)',
                marginBottom: '2em', padding: '0.5em',
                '&:hover': {
                backgroundColor: 'var(--bg-block-hover)',
                color: 'var(--light-text-color)',
                opacity: [0.9, 0.8, 0.7], cursor: 'pointer'
                }
            }}
            >
            <TextBlock>
                <Typography variant="h5" sx={{marginBottom: '1em'}}>
                    { aboutMeData.title }
                </Typography>
                <FigureImage photos={photos} icon={Icon} userName="Sergey Medvedkin" userId={19836}/>                    
                <Typography variant="body2" sx={{marginTop: '1em'}}>
                    { aboutMeData.text }
                </Typography>
            </TextBlock>
        </Box>
        </>
    )
})
