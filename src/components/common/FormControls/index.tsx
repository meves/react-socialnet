import React, { FC } from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import styles from './index.module.scss';

type PropsType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    type?: string
    placeholder?: string
    label?: string
    cols?: number
    rows?: number
}

export const Input: FC<PropsType> = ({input, type, placeholder, label, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <label htmlFor={label}>                         
                <input {...input} type={type} placeholder={placeholder} />
            </label>
            {touched &&  ( (error && <div>{error}</div>) || (warning && <div>{warning}</div>) )}
        </div>
    )
}

export const Textarea: FC<PropsType> = ({input, placeholder, cols, rows, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <textarea {...input} placeholder={placeholder} cols={cols} rows={rows} />
            {touched &&  ( (error && <div>{error}</div>) || (warning && <div>{warning}</div>) )}
        </div>
    )
}

export const Checkbox: FC<PropsType> = ({input, type, label, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <label> 
                <input {...input} type={type} />
                {label}
            </label>
            {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
        </div>
    )
}
