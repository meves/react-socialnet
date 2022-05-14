import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/users-reducer";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { receiveFilter } from "../../redux/selectors/users-selectors";
import { Button } from "../../styles/components";

/**
 * * styled-components
 */
const FormWrapper = styled.div`
    background-color: var(--bg-color-medium);
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
`;

const FieldSelect = styled(Field)`
    margin-right: 1em;
    font-size: 0.75rem;
    padding: 0.5em;
    background-color: var(--bg-color-light);
`;

const SearchButton = styled(Button)`
    font-size: 0.5rem;
`;

/**
 * * React Component UserSearchForm
 */
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
                    <FieldSelect as="select" name="friend">
                            <option value="null">All users</option> 
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>   
                    </FieldSelect>
                    <SearchButton type="submit" disabled={isSubmitting}>
                        Submit
                    </SearchButton>
                </Form>
            )} 
            </Formik>
        </FormWrapper>
    )
}

export default UserSearchForm;
