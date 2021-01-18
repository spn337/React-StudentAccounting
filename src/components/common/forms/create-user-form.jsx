import React from 'react';
import { Field, Form } from 'formik';
import {
    validateFirstName, validateLastName, validateAge, validateEmail,
    validatePassword, validateConfirmPassword
} from '../../../utils/validators';
import { Row, Button } from 'antd';
import { AntInput } from '../form-controls/create-antd-field';
import { Validated } from '../../../constants/constants';


const CreateUserForm = ({ handleSubmit, values }) => {

    return (
        <Form onSubmit={handleSubmit}>
            <Field
                component={AntInput}
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                validate={validateFirstName}
                hasFeedback />
            <Field
                component={AntInput}
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                validate={validateLastName}
                hasFeedback />
            <Field
                component={AntInput}
                name="age"
                placeholder="Age"
                value={values.age}
                type="number" min={`${Validated.MIN_AGE}`} max={`${Validated.MAX_AGE}`}
                validate={validateAge}
                hasFeedback />
            <Field
                component={AntInput}
                name="email"
                placeholder="E-mail"
                type="email"
                value={values.email}
                validate={validateEmail}
                hasFeedback />
            <Field
                component={AntInput}
                name="password"
                placeholder="Password"
                type="password"
                value={values.password}
                validate={validatePassword}
                hasFeedback />
            <Field
                component={AntInput}
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
                value={values.confirmPassword}
                validate={(value) => validateConfirmPassword(value, values.password)}
                hasFeedback />
            <Row align="center" className="my-3">
                <Button type="primary" htmlType="submit">Submit</Button>
            </Row>
        </Form>
    )
}

export default CreateUserForm;