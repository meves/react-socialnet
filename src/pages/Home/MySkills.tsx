import React, { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { skillsData } from "./data/skills";

const SkillItem = styled.div`
    width: 90%;
    padding: 0.5em;
    flex: 1;
    flex-wrap: wrap;
    border-radius: 0.3em;
    background-color: var(--bg-skill-item-hover);
    
    &:hover {
        cursor: pointer;
        background-color: var(--bg-skill-item);
    }
    
    &:hover > div {
        animation-name: scaleAnimation;
        animation-duration: 1.2s;
        animation-fill-mode: forwards;
    }

    @keyframes scaleAnimation {
        0% {  background-image: linear-gradient(to right, #fc2007 0%, #fbc607 10%, white 50%, white 100%); }
        20% { background-image: linear-gradient(to right, #f50a1a 0%, #f50a1a 10%, white 50%, white 100%); }
        50% { background-image: linear-gradient(to right, #f5870a 0%, #f5870a 40%, white 60%, white 100%); }
        90% { background-image: linear-gradient(to right, #f5ed0a 0%, #f5ed0a 70%, white 90%, white 100%); }
        100% { background-image: linear-gradient(to right,#2df50a 0%, #2df50a 90%, white 100%); }

    }
`;

const Scale = styled.div`
    width: 100%;
    height: 2vh;
    margin-top: 0.3em;
    background-image: linear-gradient(to right, #fc2007 0%, #fbc607 10%, white 50%, white 100%);
`;



export const MySkills: FC = React.memo(() => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                backgroundColor: 'var(--bg-block)', marginTop: '2em',
                '&:hover': {
                backgroundColor: 'var(--bg-block-hover)',
                color: 'var(--light-text-color)',
                opacity: [0.9, 1, 0.7], cursor: 'pointer'
                }
            }}
            >
            <Typography variant="h5">My skills</Typography>
            <Box sx={{width: '100%'}}>
            <Stack spacing={2} sx={{display: 'flex', alignItems: 'center', padding: '1em'}}> 
                {skillsData.map(value => (
                    <SkillItem key={uuidv4()}>
                        { value }
                        <Scale/>
                    </SkillItem>
                ))}
            </Stack>

            </Box>
        </Box>
    )
})
