import React from 'react';
import { Field, Form } from 'formik';
import {
    validateFirstName, validateLastName, validateAge
} from '../../../utils/validators';
import { Row, Button, Space } from 'antd';
import { AntInput } from '../form-controls/create-antd-field';
import { Routes, Validated } from '../../../constants/constants';
import { Link } from 'react-router-dom';


const UpdateUserForm = ({ handleSubmit, values }) => {

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

            <Row align="center" className="my-3">
                <Space size={5}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Link to={Routes.ADMIN} className="ant-btn ant-btn-danger mx-3" >Back</Link>
                </Space>
            </Row>
        </Form>
    )
}

export default UpdateUserForm;