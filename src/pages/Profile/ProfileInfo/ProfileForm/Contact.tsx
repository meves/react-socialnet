import React, { FC } from 'react';
import { Field } from 'redux-form';
import { Input } from '../../../../components/common/FormControls/FormControls';

type PropsType = {
    contact: string
}

const Contact: FC<PropsType> = React.memo((props) => {
    const contact = props.contact;
    return (
        <div>
            <span>{`${contact}: `}</span>
            <Field component={Input} type="url" name={`contacts.${contact}`} 
                    placeholder={`${contact}...`} label={contact} key={contact}
            />   
        </div>
    )
})

export default Contact;
