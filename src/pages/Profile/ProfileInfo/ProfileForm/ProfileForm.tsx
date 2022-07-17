import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import Contact from './Contact/Contact';
import { Checkbox, Input, Textarea } from 'components/FormFields/FormFields';
import { required } from 'shared/validators';
import { ContactsType, UserProfileType } from 'shared/types';

import styled from 'styled-components';
import { Button, ButtonGroup, TextField, CheckboxUI } from 'components';

/** styled-components */
const Fieldset = styled.fieldset`
    border: 1px solid var(--border-color);
    border-radius: 0.3em;
    margin: 2em 1em 0;

`;

const Legend = styled.legend`
    font-size: 1.2rem;
    padding-left: 0.35em;
    padding-right: 0.35em;
    color: var(--dark-text-color);
    font-weight: 400;
`;

/** React component ProfileForm */
type OwnPropsType = {
    contacts: ContactsType
    deactivateEditMode: () => void
}

const ProfileForm: FC<InjectedFormProps<UserProfileType, OwnPropsType> & OwnPropsType> = React.memo((props) => {
    const contactInputs = Object.keys(props.contacts).map(contact => <Contact key={uuidv4()} contact={contact}/>)
    return (
        <form onSubmit={props.handleSubmit}>
            <ButtonGroup disableElevation variant="contained">
                <Button type="reset" onClick={props.deactivateEditMode}>Reset and Return</Button>
                <Button type="submit" style={{marginLeft: "0.3em"}}>Save Profile</Button>
            </ButtonGroup>
            <Fieldset>
                <Legend>User Profile Data: </Legend>
                <TextField id="outlined-basic" label="Full name" variant="outlined">
                    <Field component={Input} 
                        name="fullName" 
                        type="text" 
                        placeholder="enter your full name" 
                        label="fullName" 
                        validate={[required]}
                    />
                </TextField>
                <div>
                    <Field component={Textarea} 
                        name="aboutMe" 
                        placeholder="Tell about you..." 
                        cols="40" rows="4"
                    />
                </div>
                <div>
                    <Field component={Textarea} 
                        name="lookingForAJobDescription" 
                        placeholder="What kind of job you're looking for..." 
                        cols="40" rows="4"
                    />
                </div>
                <CheckboxUI>
                    <Field component={Checkbox} label="Looking for a job" name="lookingForAJob" type="checkbox"/>
                </CheckboxUI>
            </Fieldset>
            <Fieldset>
                <Legend>Social contacts: </Legend>
                { contactInputs }
            </Fieldset>
        </form>
    )
})

export default reduxForm<UserProfileType, OwnPropsType>({form: 'profileForm'})(ProfileForm);
