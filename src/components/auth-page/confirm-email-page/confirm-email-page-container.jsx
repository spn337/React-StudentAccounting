import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../../constants/constants';
import { confirmTC } from '../../../redux/reducers/auth-reducer'


class ConfirmEmailPageContainer extends React.Component {
    componentDidMount() {
        const search = this.props.location.search;
        const queryString = require('query-string');
        const parsed = queryString.parse(search);
        console.log(parsed);
        this.props.confirmTC(parsed.userId, parsed.token);
    }

    render() {
        return (
            <Redirect to={Routes.AUTH} />
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { confirmTC })(ConfirmEmailPageContainer);