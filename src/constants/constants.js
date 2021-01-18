export const Validated = {
    MAX_LENGTH: 30,
    NAME_REGEX: /^(?:[A-Za-z]+)$/,
    EMAIL_REGEX: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
    MIN_AGE: 18,
    MAX_AGE: 100,
    PASSWORD_WITH_LOWERCASE_REGEX: /[a-z]/,
    PASSWORD_WITH_UPPERCASE_REGEX: /[A-Z]/,
    PASSWORD_WITH_DIGIT_REGEX: /[0-9]/,
    PASSWORD_WITH_SPECIAL_CHARACTER_REGEX: /[!@#$%^&*]/,
    PASSWORD_WITH_MIN_LENGTH: /.{8,}/,
}

export const Routes = {
    DEFAULT: '/',
    AUTH: '/auth',
    CONFIRM_EMAIL: '/auth/confirmemail/',
    ADMIN: '/admin/',
    CREATE_USER: '/admin/createuser/',
    UPDATE_USER: '/admin/updateuser/',
    STUDENT: '/student/',
}

export const Constants = {
    TOKEN: 'token'
}

export const Types = {
    GUEST: 'guest',
    PRIVATE: 'private'
}

export const Roles = {
    ADMIN: 'Admin',
    STUDENT: 'Student'
}