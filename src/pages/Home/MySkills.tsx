import React, { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

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
`;

const Scale = styled.div`
    width: 100%;
    height: 2vh;
    margin-top: 0.3em;
    background-image: linear-gradient(to right, blue 77%, white);
`;

export const MySkills: FC = React.memo(() => {
    const skills = ["JavaScript / TypeScript", "React / Redux", "REST/HTTP","Unit testing",
                    "CSS/SASS", "Webpack", "Git"];
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
                {skills.map((value, index) => (
                    <SkillItem key={uuidv4()}>
                        {value}
                        <Scale/>
                    </SkillItem>
                ))}
            </Stack>

            </Box>
        </Box>
    )
})
