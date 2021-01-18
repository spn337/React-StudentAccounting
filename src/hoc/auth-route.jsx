import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { Routes, Types, Roles } from "../constants/constants";


const AuthRoute = (props) => {
    const { user, type } = props;

    const isAuthUser = (user !== null) ? true : false;

    const homeRouteName =
        (isAuthUser && user.roles[0] === Roles.ADMIN)
            ? Routes.ADMIN
            : Routes.STUDENT;

    if (type === Types.GUEST && isAuthUser) {
        return <Redirect to={homeRouteName} />
    }
    else if (type === Types.PRIVATE && !isAuthUser) {
        return <Redirect to={Routes.AUTH} />;
    }

    return <Route {...props} />;
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(AuthRoute);
