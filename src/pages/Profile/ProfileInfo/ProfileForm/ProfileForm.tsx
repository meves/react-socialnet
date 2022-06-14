import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { required } from '../../../../utils/validators/validators';
import { Checkbox, Input, Textarea } from '../../../../components/common/FormControls/FormControls';
import Contact from './Contact';
import { ContactsType, UserProfileType } from '../../../../types/types';
import { Button } from '../../../../styles/components';
import styled from 'styled-components';

const Fieldset = styled.fieldset`
    border: 4px solid white;
    border-radius: 0.75em;
    margin-top: 2em;

`;

const Legend = styled.legend`
    font-size: 1.2rem;
    padding-left: 0.35em;
    padding-right: 0.35em;
    color: white;
    font-weight: 400;
`;

type OwnPropsType = {
    contacts: ContactsType
    deactivateEditMode: () => void
}

const ProfileForm: FC<InjectedFormProps<UserProfileType, OwnPropsType> & OwnPropsType> = React.memo((props) => {
    const contactInputs = Object.keys(props.contacts).map(contact => <Contact contact={contact}/>)
    return (
        <form onSubmit={props.handleSubmit}>
            <Button type="reset" onClick={props.deactivateEditMode}>Reset and Return</Button>
            <Button type="submit" style={{marginLeft: "0.3em"}}>Save Profile</Button>
            <Fieldset>
                <Legend>User Profile Data: </Legend>
                <Field component={Input} name="fullName" type="text" placeholder="enter your full name" label="fullName" validate={[required]}/>
                <Field component={Textarea} name="aboutMe" placeholder="Tell about you..." cols="40" rows="4"/>
                <Field component={Textarea} name="lookingForAJobDescription" placeholder="What kind of job you're looking for..." cols="40" rows="4"/>
                <Field component={Checkbox} name="lookingForAJob" type="checkbox"/>
            </Fieldset>
            <Fieldset>
                <Legend>Social contacts: </Legend>
                { contactInputs }
            </Fieldset>
        </form>
    )
})

export default reduxForm<UserProfileType, OwnPropsType>({form: 'profileForm'})(ProfileForm);
