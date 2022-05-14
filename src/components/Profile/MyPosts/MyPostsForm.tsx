import React, { FC } from 'react';
import styled from 'styled-components';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { maxLength300, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';
import { SendButton } from '../../../styles/components';

const ButtonWrapper = styled.div`
    margin-bottom: 2em;
`;

export type FormDataType = {
    newPost: string
}

const MyPostForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  component={Textarea} 
                        name="newPost"
                        placeholder="print your post here..." 
                        cols="40" rows="7"
                        validate={[required, maxLength300]} />
            </div>
            <ButtonWrapper>
                <SendButton>
                    Add new post
                </SendButton>
            </ButtonWrapper> 
        </form>
    )
}

export default reduxForm<FormDataType>({form: 'postForm'})(MyPostForm);
