import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";

import { FilterType } from "redux/reducers/users-reducer";
import { receiveFilter } from "redux/selectors/users-selectors";

import styled from "styled-components";
import { Button } from "components";

/** styled-components */
const FormWrapper = styled.div`
    background-color: var(--bg-post-item);
    box-shadow: 0.1em 0.1em var(--bg-post-item-shadow);
    display: flex;
    padding: 0.5em;
    font-size: 1rem;
    border-radius: 0.3em;
    margin-bottom: 2em;
`;
const FieldTerm = styled(Field)`
    margin-right: 1em;
    font-size: 0.75rem;
    padding: 0.5em;
    width: 20em;
    border-radius: 0.3em;
    border: none;
    margin-bottom: 0.75em;
`;

/** React Component UserSearchForm */
const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    changeFilter: (filter: FilterType) => void
}

type ValuesType = {
    term: string
    friend: string
}

const UserSearchForm: FC<PropsType> = (props) => {
    const filter = useSelector(receiveFilter);

    const submit = (values: ValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.changeFilter(filter);
        setSubmitting(false);
    }
    return (
        <FormWrapper>
            <Formik
                enableReinitialize={true}
                initialValues={{ term: filter.term, friend: String(filter.friend)}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
            {({isSubmitting}) => (
                <Form>
                    <FieldTerm type="text" name="term"/>
                    <Field as="select" name="friend"
                            style={{
                                marginRight: '1em',
                                fontSize: '0.75rem',
                                padding: '0.4em',
                                borderRadius: '0.2em',
                                backgroundColor: 'var(--bluegray-light)'
                            }} 
                    >
                            <option value="null">All users</option> 
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>   
                    </Field>
                    <Button type="submit" disabled={isSubmitting} variant="outlined"
                            sx={{
                                borderColor: 'var(--bg-button-border)',
                                color: 'var(--dark-text-color)',
                                fontSize: '0.63rem',
                            }}>
                        Submit
                    </Button>
                </Form>
            )} 
            </Formik>
        </FormWrapper>
    )
}

export default UserSearchForm;
