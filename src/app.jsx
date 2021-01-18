import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuthorizedUserTC } from './redux/reducers/auth-reducer';
import HeaderNavbarContainer from './components/header-navbar/header-navbar-container';
import AuthPageContainer from './components/auth-page/auth-page-container';
import AdminPageContainer from './components/admin-page/admin-page-container';
import CreateUserPageContainer from './components/admin-page/create-user-page/create-user-page-container';
import UpdateUserPageContainer from './components/admin-page/update-user-page/update-user-page-container';
import StudentPageContainer from './components/student-page/student-page-container';
import ConfirmEmailPageContainer from './components/auth-page/confirm-email-page/confirm-email-page-container';
import AuthRoute from './hoc/auth-route';
import { Routes, Types } from './constants/constants';
import { Layout } from 'antd';
import "antd/dist/antd.css";
import './style.css';


class App extends React.Component {
    componentDidMount() {
        // googleAPI.initialize();
        this.props.getAuthorizedUserTC();
    }
    render() {
        const { Header, Content } = Layout;

        return (
            <BrowserRouter>
                <Layout >
                    <Header>
                        <HeaderNavbarContainer />
                    </Header>
                    <Content className="container">
                        <AuthRoute type={Types.GUEST} path={Routes.AUTH} component={AuthPageContainer} exact />
                        <AuthRoute type={Types.PRIVATE} path={Routes.DEFAULT} component={StudentPageContainer} exact />
                        <AuthRoute type={Types.GUEST} path={Routes.CONFIRM_EMAIL} component={ConfirmEmailPageContainer} />
                        <AuthRoute type={Types.PRIVATE} path={Routes.ADMIN} component={AdminPageContainer} exact />
                        <AuthRoute type={Types.PRIVATE} path={Routes.STUDENT} component={StudentPageContainer} exact />
                        <AuthRoute type={Types.PRIVATE} path={Routes.CREATE_USER} component={CreateUserPageContainer} />
                        <AuthRoute type={Types.PRIVATE} path={`${Routes.UPDATE_USER}:id`} component={UpdateUserPageContainer} />
                    </Content>
                </Layout>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { getAuthorizedUserTC })(App);