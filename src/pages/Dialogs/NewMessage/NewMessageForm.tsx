import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { maxLength300, required } from '../../../utils/validators/validators';
import { Textarea } from '../../../components/common/FormControls/FormControls';
import styled from 'styled-components';
import { SendButton } from '../../../styles/components';

const Button = styled(SendButton)`
    margin-bottom: 2em;
`;

export type FormDataType = {
    newMessage: string
}
const NewMessageForm: FC<InjectedFormProps<FormDataType>> = React.memo((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                        name="newMessage"
                        placeholder="print your message here..."
                        cols="40" rows="7"
                        validate={[required, maxLength300]} />
            </div>
            <Button>Add new message</Button>            
        </form>
    )
})

export default reduxForm<FormDataType>({form: 'messageForm'})(NewMessageForm);
