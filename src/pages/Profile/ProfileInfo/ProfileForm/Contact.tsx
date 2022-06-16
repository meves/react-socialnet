import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Input } from '../../../../components/common/FormControls/FormControls';

const FieldWrapper = styled.p`
`;

type PropsType = {
    contact: string
}

const Contact: FC<PropsType> = React.memo((props) => {
    const contact = props.contact;
    return (
        <FieldWrapper>
            <TextField id="outlined-basic" label={contact} variant="outlined">
            <Field component={Input} type="url" name={`contacts.${contact}`} 
                    placeholder={`${contact}...`} label={contact} key={contact}
            />
            </TextField>
        </FieldWrapper>
    )
})

export default Contact;
