import React from 'react';
import { Formik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { getUpdatedUserTC, updateUserTC } from '../../../redux/reducers/admin-reducer'
import { Routes } from '../../../constants/constants';
import { Col, Row, Typography, Spin } from 'antd';
import UpdateUserForm from '../../common/forms/update-user-form';


class UpdateUserPageContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.id;
        this.props.getUpdatedUserTC(userId);
    }

    handleSubmit = (values, actions) => {
        this.props.updateUserTC(values, actions);
    }

    render() {
        if (this.props.isSubmitUserSuccessed) {
            return <Redirect to={Routes.ADMIN} />
        }
        const { Title } = Typography;

        return (
            (this.props.isLoading)
                ? <Spin />
                : <>
                    <Row justify="center" className="my-5">
                        <Col>
                            <Title align="center">Update User</Title >
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={20} sm={20} md={16} lg={12} xl={10} xxl={8}>
                            <Formik
                                initialValues={this.props.updatedUser}
                                onSubmit={this.handleSubmit}
                            >
                                {UpdateUserForm}
                            </Formik>
                        </Col>
                    </Row>
                </>
        )
    }
}

const mapStateToProps = (state) => ({
    isSubmitUserSuccessed: state.adminPage.isSubmitUserSuccessed,
    updatedUser: state.adminPage.updatedUser,
    isLoading: state.adminPage.isLoading
});

export default compose(
    connect(mapStateToProps, { getUpdatedUserTC, updateUserTC }),
    withRouter
)(UpdateUserPageContainer)