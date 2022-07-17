type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = value => value ? undefined : 'Required field' 

export const email: ValidatorType = value =>  value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) 
            ? undefined : 'Invalid email address'

type MinMaxType = (minMax: number) => ValidatorType;
            
const maxLength: MinMaxType = max => value => 
    value && value.length <= max ? undefined : `Max length has to be ${max} or less symbols`

export const maxLength30 = maxLength(30)
export const maxLength300 = maxLength(300)

const minLength: MinMaxType = min => value => 
    value && value.length >= min ? undefined : `Characters has to be more than ${min}`

export const minLength6 = minLength(6)
export const minLength4 = minLength(4)

