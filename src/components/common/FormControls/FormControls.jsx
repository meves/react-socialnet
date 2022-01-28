import React from 'react';
import styles from './FormControls.module.scss';

export const Input = ({input, type, placeholder, label, meta: {touched, error, warning}}) => {
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

export const Textarea = ({input, placeholder, cols, rows, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <textarea {...input} placeholder={placeholder} cols={cols} rows={rows} />
            {touched &&  ( (error && <span>{error}</span>) || (warning && <span>{warning}</span>) )}
        </div>
    )
}

export const Checkbox = ({input, type, meta: {touched, error, warning}}) => {
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
