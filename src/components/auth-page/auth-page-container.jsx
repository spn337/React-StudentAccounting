import React from 'react'
import { connect } from 'react-redux';
import { loginTC, registrationTC, googleLoginTC } from '../../redux/reducers/auth-reducer'
import { Spin } from 'antd';
import { openRegistrationNotification, openConfirmEmailNotification } from '../../helpers/notifications';
import AuthPage from './auth-page';


class AuthPageContainer extends React.Component {

    state = {
        activeTab: "1"
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isRegistrationSuccessed !== this.props.isRegistrationSuccessed) {
            if (this.props.isRegistrationSuccessed === true) {
                openRegistrationNotification();
                this.changeTab("1");
            }
        }
        if (prevProps.isConfirmEmailSuccessed !== this.props.isConfirmEmailSuccessed) {
            if (this.props.isConfirmEmailSuccessed === true) {
                openConfirmEmailNotification();
            }
        }
    }

    loginSubmit = (values) => {
        this.props.loginTC(values);
    }

    registrationSubmit = (values, actions) => {
        this.props.registrationTC(values, actions);
    }

    changeTab = (activeKey) => {
        this.setState({
            activeTab: activeKey
        });
    };

    hangleGoogleLogin = () => {
        this.props.googleLoginTC();
    };

    googleLogout = () => {
        const logoutOk = () => console.log('Google Logout OK');
        const logoutError = () => console.log('Google Logout ERROR');

        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        GoogleAuth.signOut()
            .then(logoutOk, logoutError)
    }

    render() {

        return (

            <Spin spinning={this.props.isLoading}>
                <AuthPage
                    activeTab={this.state.activeTab}
                    changeTab={this.changeTab}
                    loginSubmit={this.loginSubmit}
                    hangleGoogleLogin={this.hangleGoogleLogin}
                    registrationSubmit={this.registrationSubmit}
                    errorMessage={this.props.errorMessage} />
            </Spin>

        )
    }
};

const mapStateToProps = (state) => ({
    isRegistrationSuccessed: state.auth.isRegistrationSuccessed,
    isConfirmEmailSuccessed: state.auth.isConfirmEmailSuccessed,
    errorMessage: state.auth.errorMessage,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { loginTC, registrationTC, googleLoginTC })(AuthPageContainer);