import React, { FC } from 'react';
import PostForm, { FormDataType } from '../../../components/common/Forms/PostForm';
import { actions } from '../../../redux/reducers/dialog-reducer';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const Wrapper = styled.div`
    padding: 1em;
    margin-bottom: 2em;
`;

export const NewMessage: FC = React.memo(() => {
    const dispatch = useDispatch();
    const { addMessage } = actions;

    const onAddMessage = (formData: FormDataType) => {
        dispatch(addMessage(formData.post));
    }
    
    return (
        <Wrapper>
            <Typography variant="h5">New message</Typography>
            <PostForm onSubmit={onAddMessage} />
        </Wrapper> 
    )
})
