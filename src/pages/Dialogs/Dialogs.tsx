import React, { FC } from 'react';
import { NewMessage } from './NewMessage/NewMessage';
import { useGenerateDialogsElements, useGenerateMessagesElements } from './hooks/dialogs-hooks';
import styled from 'styled-components';
import { Alert, Paper, Stack } from '@mui/material';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

/** styled-components */
const DialogsPageWrapper = styled.section`

    background-color: var(--bg-page);
`;

const DialogsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 1em;
    height: 50vh;
`;

/** React component DialogsPage */
const DialogsPage: FC = () => {
    const dialogs = useGenerateDialogsElements();
    const messages = useGenerateMessagesElements();
    return (
        <DialogsPageWrapper>
            <Alert severity="error">The component is in development porocess!</Alert>
            <DialogsWrapper>
                <Paper variant="elevation" elevation={3} sx={{flex: '2', overflow: 'auto', padding: '0.5em'}}>
                    <Stack>{dialogs}</Stack>            
                </Paper>
                <Paper variant="elevation" elevation={3} sx={{flex: '3', overflow: 'auto', padding: '0.5em'}}>
                    <Stack>{messages}</Stack>
                </Paper>
            </DialogsWrapper>
            <NewMessage/>        
        </DialogsPageWrapper>
    )
}
export default withAuthNavigate(DialogsPage); 
