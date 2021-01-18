import React from "react";
import { Form, Input } from "antd";


const createAntdField = (Component) => ({ field, form, hasFeedback, ...props }) => {
    const touched = form.touched[field.name];
    const errorMessage = form.errors[field.name];
    const touchedError = errorMessage && touched;

    return (
        <Form.Item
            hasFeedback={(hasFeedback && touched) ? true : false}
            help={touchedError ? errorMessage : false}
            validateStatus={touchedError ? "error" : "success"}
        >
            <Component {...field} {...props} allowClear />
        </Form.Item>
    );
}

export const AntInput = createAntdField(Input);
