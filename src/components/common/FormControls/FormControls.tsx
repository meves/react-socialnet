import React, { FC } from 'react';
import styles from './FormControls.module.scss';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

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
            {touched &&  ( (error && <span>{error}</span>) || (warning && <span>{warning}</span>) )}
        </div>
    )
}

export const Textarea: FC<PropsType> = ({input, placeholder, cols, rows, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <textarea {...input} placeholder={placeholder} cols={cols} rows={rows} />
            {touched &&  ( (error && <span>{error}</span>) || (warning && <span>{warning}</span>) )}
        </div>
    )
}

export const Checkbox: FC<PropsType> = ({input, type, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <label htmlFor="rememberMe"> 
                <input {...input} type={type} />
                Remember me
            </label>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )
}
