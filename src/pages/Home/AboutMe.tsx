import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { recieveUserProfilePhoto } from "../../redux/selectors/profile-selectors";
import { Alert, Box, Typography } from "@mui/material";
import { FigureImage } from "../../components/common/FigureImage/FigureImage";
import Icon from '../../assets/images/Sergey_Medvedkin.jpg';

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
                <Typography variant="h5" sx={{marginBottom: '1em'}}>My name is Sergey Medvedkin</Typography>
                <FigureImage photos={photos} icon={Icon} userName="Sergey Medvedkin" userId={19836}/>                    
                <Typography variant="body2" sx={{marginTop: '1em'}}> Hello, I am Sergey Medvedkin.
                    I practice in web development. This is my personal web-site. 
                    About my skills you can find out on my skills page. I specialize in front-end, but I also 
                    make backend API server on Node using Express and Nest. My site hosts on Timeweb servers.
                </Typography>
            </TextBlock>
        </Box>
        </>
    )
})
