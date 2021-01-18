import React from 'react';
import { Formik } from 'formik';
import { Validated } from '../../../constants/constants';
import CreateUserForm from '../../common/forms/create-user-form';


const initialUser = {
    firstName: '',
    lastName: '',
    age: Validated.MIN_AGE,
    email: '',
    password: '',
    confirmPassword: ''
}

const Registration = ({ handleSubmit }) => {

    return (
        <Formik
            initialValues={initialUser}
            onSubmit={handleSubmit}
        >
            {CreateUserForm}
        </Formik>
    )
}

export default Registration;
