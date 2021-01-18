import React from 'react';
import { Formik } from 'formik';
import LoginForm from '../../common/forms/login-form';


const initialUser = {
    email: '',
    password: '',
}

const Login = ({ handleSubmit, hangleGoogleLogin }) => {

    return (
        <>
            <Formik
                initialValues={initialUser}
                onSubmit={handleSubmit}
            >
                {LoginForm}
            </Formik>
            {/* <Row justify="center" >
                <Button type="primary" className="btn-google" onClick={hangleGoogleLogin}>Google</Button>
            </Row> */}
        </>

    )
}

export default Login;