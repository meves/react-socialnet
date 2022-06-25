import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

import { Textarea } from 'components/common/FormControls';
import { maxLength300, required } from 'utils/validators/validators';

import styled from 'styled-components';
import { Button } from 'shared/ui';

const Form = styled.form`
    width: 60%;
`;

export type FormDataType = {
    post: string
}

const PostForm: FC<InjectedFormProps<FormDataType>> = React.memo((props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                        name="post"
                        placeholder="print your message here..."
                        cols="40" rows="7"
                        validate={[required, maxLength300]} 
                        style={{width: '100%'}}        
                />
            </div>
            <Button type="submit" variant="contained"
                    sx={{backgroundColor: 'var(--bluegray-lightdark)',
                        '&:hover': {
                            backgroundColor: 'var(--bluegray-dark)'
                        }
                    }}
            >Post</Button>            
        </Form>
    )
})

export default reduxForm<FormDataType>({form: 'messageForm'})(PostForm);
