import React from 'react';
import { connect } from 'react-redux';
import { logoutTC } from '../../redux/reducers/auth-reducer';
import HeaderNavbar from './header-navbar';


class HeaderNavbarContainer extends React.Component {


    handleLogout = () => {
        this.props.logoutTC();
    }
    render() {
        return (
            <div className="container">
                <HeaderNavbar {...this.props} handleLogout={this.handleLogout} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.auth.user,
    }
};

export default connect(mapStateToProps, { logoutTC })(HeaderNavbarContainer);