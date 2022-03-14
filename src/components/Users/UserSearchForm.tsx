import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { FilterType } from "../../redux/users-reducer";
import styles from './User.module.scss';

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
    const submit = (values: ValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.changeFilter(filter);
        setSubmitting(false);
    }
    return (
        <div className={styles.userSearchForm}>
            <Formik
                initialValues={{term: "", friend: "null"}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
            {({isSubmitting}) => (
                <Form>
                    <Field className={styles.term} type="text" name="term"/>
                    <Field className={styles.select} as="select" name="friend">
                            <option value="null">All users</option> 
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>   
                    </Field>
                    <button className={`${styles.searchButton} button`} type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )} 
            </Formik>
        </div>
    )
}

export default UserSearchForm;
