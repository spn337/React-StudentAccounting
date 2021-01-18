import React from 'react'
import { Row, Col, Alert, Tabs } from 'antd';
import Registration from './registration/registration';
import Login from './login/login';


const AuthPage = ({ activeTab, changeTab, loginSubmit, hangleGoogleLogin, registrationSubmit, errorMessage }) => {

    const { TabPane } = Tabs;
    const loginFailedAlert =
        (errorMessage) && (
            <Alert
                style={{ marginBottom: 24 }}
                message={errorMessage}
                type="error"
                showIcon
                closable
            />)

    return (
        <Row justify="center" >
            <Col className="my-5" xs={20} sm={20} md={16} lg={12} xl={10} xxl={8}>
                <Tabs activeKey={activeTab} centered size="large" onChange={changeTab}>
                    <TabPane tab="Login" key="1">
                        {loginFailedAlert}
                        <Login
                            handleSubmit={loginSubmit}
                            hangleGoogleLogin={hangleGoogleLogin} />
                    </TabPane>
                    <TabPane tab="Registration" key="2">
                        <Registration
                            handleSubmit={registrationSubmit} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
};

export default AuthPage;