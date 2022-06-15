import React, { FC } from 'react';
import { NewMessage } from './NewMessage/NewMessage';
import { useGenerateDialogsElements, useGenerateMessagesElements } from './hooks/dialogs-hooks';
import styled from 'styled-components';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

/** styled-components */
const DialogsPageWrapper = styled.section`
    background-color: var(--bg-page);
`;

const DialogsWrapper = styled.div`
    display: flex;
    padding: 1em;
`;

const Dialogs = styled.div`
    padding: 1em 0;
    flex: 1 1 19em;
    margin-right: 3em;
`;

const Messages = styled.div`
    padding: 1em 0;
    flex: 2 2 20em;
    color: var(--white-text-color);
`;

/** React component DialogsPage */
const DialogsPage: FC = () => {
    const dialogs = useGenerateDialogsElements();
    const messages = useGenerateMessagesElements();
    return (
        <DialogsPageWrapper>
            <DialogsWrapper>
                <Dialogs>{dialogs}</Dialogs>            
                <Messages>{messages}</Messages>  
            </DialogsWrapper>
            <NewMessage/>        
        </DialogsPageWrapper>
    )
}
export default withAuthNavigate(DialogsPage); 
