import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { createUserTC } from '../../../redux/reducers/admin-reducer'
import { Redirect } from 'react-router-dom';
import { Routes, Validated } from '../../../constants/constants';
import { Col, Row, Typography } from 'antd';
import CreateUserForm from '../../common/forms/create-user-form';

const updatedUser = {
    firstName: '',
    lastName: '',
    age: Validated.MIN_AGE,
    email: '',
    password: '',
    confirmPassword: ''
}
class CreateUserPageContainer extends React.Component {

    handleSubmit = (values, actions) => {
        this.props.createUserTC(values, actions);
    }

    render() {
        if (this.props.isSubmitUserSuccessed) {
            return <Redirect to={Routes.ADMIN} />
        }
        const { Title } = Typography;

        return (
            <>
                <Row justify="center" className="my-5">
                    <Col>
                        <Title align="center">Create User</Title >
                    </Col>
                </Row>
                <Row justify="center">
                    <Col xs={20} sm={20} md={16} lg={12} xl={10} xxl={8}>
                        <Formik
                            initialValues={updatedUser}
                            onSubmit={this.handleSubmit}
                        >
                            {CreateUserForm}
                        </Formik>
                    </Col>
                </Row>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isSubmitUserSuccessed: state.adminPage.isSubmitUserSuccessed,
});

export default connect(mapStateToProps, { createUserTC })(CreateUserPageContainer)