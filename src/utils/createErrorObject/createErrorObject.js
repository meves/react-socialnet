/**create error messages object for ProfileForm */
export const createErrorObject = data => {
    const errors = {
        'contacts' : {}
    };
    data.messages.forEach(message => {
        createErrorMessage(errors, message);           
    });
    return errors;
}

const createErrorMessage = (errors, message) => {
    const { first, last } = getIndexes(message, "(", ")");
    let { errorText, errorField } = getParsedError(message, first, last);
    if (errorField.includes('->')) {
        errors['contacts'][parseErrorField(errorField, errorText, errors)] = errorText;
    } else {
        errors[convertFirstCharacterToLowerCase(errorField)] = errorText;                
    } 
}

const getIndexes = (message, strOne, strTwo) => {
    return {first: message.indexOf(strOne), last: message.indexOf(strTwo)};
}

const getParsedError = (message, strOne, strTwo) => {
    return {errorText: message.substring(0, strOne), errorField: message.substring(strOne + 1, strTwo)}
}

const parseErrorField = (errorField) => {
    return convertFirstCharacterToLowerCase(errorField.substring(errorField.indexOf('>') + 1, ));    
}

const convertFirstCharacterToLowerCase = stringProperty => 
    stringProperty.charAt(0).toLowerCase().concat(stringProperty.substring(1, ));
