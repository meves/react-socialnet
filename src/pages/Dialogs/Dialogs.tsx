import React, { FC } from 'react';
import { NewMessage } from './NewMessage/NewMessage';
import { useGenerateDialogsElements, useGenerateMessagesElements } from './hooks/dialogs-hooks';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const DialogsPage: FC = () => {
    const dialogs = useGenerateDialogsElements();
    const messages = useGenerateMessagesElements();
    return (
        <section>
            <Wrapper>
                <Dialogs>{dialogs}</Dialogs>            
                <Messages>{messages}</Messages>  
            </Wrapper>
            <NewMessage/>        
        </section>
    )
}
export default DialogsPage; 