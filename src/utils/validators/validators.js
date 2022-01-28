export const required = value => value ? undefined : 'Required field' 

const maxLength = max => value => value && value.length <= max ? undefined : `Max length has to be ${max} or less symbols`
export const maxLength30 = maxLength(30)
export const maxLength300 = maxLength(300)

const minLength = min => value => value && value.length >= min ? undefined : `Characters has to be more than ${min}`
export const minLength6 = minLength(6)

export const email = value =>  value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) 
            ? undefined : 'Invalid email address'
