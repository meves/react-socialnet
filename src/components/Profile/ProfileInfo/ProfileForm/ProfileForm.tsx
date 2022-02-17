import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { required } from '../../../../utils/validators/validators';
import { Checkbox, Input, Textarea } from '../../../common/FormControls/FormControls';
import Contact from './Contact';
import { ContactsType, UserProfileType } from '../../../../types/types';

type OwnPropsType = {
    contacts: ContactsType
    deactivateEditMode: () => void
}

const ProfileForm: FC<InjectedFormProps<UserProfileType, OwnPropsType> & OwnPropsType> = (props) => {
    const contactInputs = Object.keys(props.contacts).map(contact => <Contact contact={contact}/>)
    return (
        <form onSubmit={props.handleSubmit}>
            <button type="reset" onClick={props.deactivateEditMode}>Reset and Return</button>
            <button type="submit">Save Profile</button>
            <fieldset>
                <legend>User Profile Data: </legend>
                <Field component={Input} name="fullName" type="text" placeholder="enter your full name" label="fullName" validate={[required]}/>
                <Field component={Textarea} name="aboutMe" placeholder="Tell about you..." cols="40" rows="4"/>
                <Field component={Textarea} name="lookingForAJobDescription" placeholder="What kind of job you're looking for..." cols="40" rows="4"/>
                <Field component={Checkbox} name="lookingForAJob" type="checkbox"/>
            </fieldset>
            <fieldset>
                <legend>Social contacts: </legend>
                { contactInputs }
            </fieldset>
        </form>
    )
}

export default reduxForm<UserProfileType, OwnPropsType>({form: 'profileForm'})(ProfileForm);
