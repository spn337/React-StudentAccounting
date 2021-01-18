import {
    Validated
} from '../constants/constants';


export const validateFormField = (value) => {
    let error = "";
    if (!value) {
        error = `Required!`
    } else if (value.length > Validated.MAX_LENGTH) {
        error = `Max length is ${Validated.MAX_LENGTH} symbols`
    }
    return error;
}

export const validateFirstName = (value) => {
    let error = validateFormField(value);
    if (error !== "") {
        return error;
    } else if (!Validated.NAME_REGEX.test(value)) {
        error = `First Name must contain only letters`;
    }
    return error;
};

export const validateLastName = (value) => {
    let error = validateFormField(value);
    if (error !== "") {
        return error;
    } else if (!Validated.NAME_REGEX.test(value)) {
        error = `Last name must contain only letters`;
    }
    return error;
};

export const validateAge = (value) => {
    let error = validateFormField(value);
    if (error !== "") {
        return error;
    } else if (value < Validated.MIN_AGE || value > Validated.MAX_AGE) {
        error = `Age must be between ${Validated.MIN_AGE} and ${Validated.MAX_AGE}`;
    }
    return error;
};

export const validateEmail = (value) => {
    let error = validateFormField(value);
    if (error !== "") {
        return error;
    } else if (!Validated.EMAIL_REGEX.test(value)) {
        error = "Please enter a valid email address";
    }
    return error;
};

export const validatePassword = (value) => {
    let error = validateFormField(value);
    if (error !== "") {
        return error;
    } else if (!Validated.PASSWORD_WITH_LOWERCASE_REGEX.test(value)) {
        error = "Password must contain at least one lowercase letter";
    } else if (!Validated.PASSWORD_WITH_UPPERCASE_REGEX.test(value)) {
        error = "Password must contain at least one uppercase letter";
    } else if (!Validated.PASSWORD_WITH_DIGIT_REGEX.test(value)) {
        error = "Password must contain at least one digit";
    } else if (!Validated.PASSWORD_WITH_SPECIAL_CHARACTER_REGEX.test(value)) {
        error = "Password must contain at least one special character";
    } else if (!Validated.PASSWORD_WITH_MIN_LENGTH.test(value)) {
        error = "Password must contain at least 8 characters";
    }
    return error;
};

export const validateConfirmPassword = (value, password) => {
    let error = validateFormField(value);
    if (error !== "") {
        return error;
    } else if ((value && password) && (value !== password)) {
        error = "Password not matched";
    }
    return error;
};