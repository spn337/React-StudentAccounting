import React from 'react';
import { Field, Form } from 'formik';
import { validateFormField, } from '../../../utils/validators';
import { Button, Row } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { AntInput } from '../form-controls/create-antd-field';


const LoginForm = ({ handleSubmit, values }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field
                component={AntInput}
                prefix={<MailOutlined />}
                name="email"
                placeholder="Email"
                value={values.email}
                validate={validateFormField}
            />
            <Field
                component={AntInput}
                prefix={<LockOutlined />}
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                validate={validateFormField}
            />
            <Row align="center" className="my-3">
                <Button type="primary" htmlType="submit">Login</Button>
            </Row>
        </Form >
    )
}

export default LoginForm;