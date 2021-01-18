import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUsersTC, deleteUserTC }
    from '../../redux/reducers/admin-reducer';

import AdminPage from './admin-page';
import { message } from 'antd';
import { openChangeUserNotification, openErrorNotification } from '../../helpers/notifications';

class AdminPageContainer extends React.Component {

    componentDidMount() {
        message.config({
            top: 65, duration: 3
        });

        if (this.props.isSubmitUserSuccessed) {
            openChangeUserNotification(this.props.submitMessage)
        }

        this.props.getUsersTC(
            this.props.currentPage,
            this.props.pageSize,
            this.props.searchValue,
            this.props.sortOrder,
            this.props.sortName);
    }

    componentDidUpdate(prevProps) {

        if ((prevProps.isSubmitUserSuccessed !== this.props.isSubmitUserSuccessed)
            && this.props.isSubmitUserSuccessed) {

            openChangeUserNotification(this.props.submitMessage)

            this.props.getUsersTC(
                this.props.currentPage,
                this.props.pageSize,
                this.props.searchValue,
                this.props.sortOrder,
                this.props.sortName);
        }
        if ((prevProps.isDeleteUserFailed !== this.props.isDeleteUserFailed)
            && this.props.isDeleteUserFailed) {

            openErrorNotification()

            this.props.getUsersTC(
                this.props.currentPage,
                this.props.pageSize,
                this.props.searchValue,
                this.props.sortOrder,
                this.props.sortName);
        }
    }

    handleChangeUser = (pagination, filters, sorter) => {
        this.props.getUsersTC(
            this.props.currentPage,
            this.props.pageSize,
            this.props.searchValue,
            sorter.order,
            sorter.field);
    }

    onChangePage = (pageNumber) => {
        this.props.getUsersTC(
            pageNumber,
            this.props.pageSize,
            this.props.searchValue,
            this.props.sortOrder,
            this.props.sortName);
    }

    onChangeSearchValue = (searchValue) => {
        this.props.getUsersTC(
            1,
            this.props.pageSize,
            searchValue,
            this.props.sortOrder,
            this.props.sortName);
    }

    handleDelete = (id) => {
        this.props.deleteUserTC(id);
    };

    render() {
        return (
            <AdminPage
                {...this.props}
                onChangeSearchValue={this.onChangeSearchValue}
                handleChangeUser={this.handleChangeUser}
                handleDelete={this.handleDelete}
                onChangePage={this.onChangePage}
            />
        )
    }
};

const mapStateToProps = (state) => ({
    usersData: state.adminPage.usersData,
    totalUsersCount: state.adminPage.paggingInfo.totalUsersCount,
    currentPage: state.adminPage.paggingInfo.currentPage,
    pageSize: state.adminPage.paggingInfo.pageSize,
    searchValue: state.adminPage.searchValue,
    sortName: state.adminPage.sortName,
    sortOrder: state.adminPage.sortOrder,
    isSubmitUserSuccessed: state.adminPage.isSubmitUserSuccessed,
    submitMessage: state.adminPage.submitMessage,
    isDeleteUserFailed: state.adminPage.isDeleteUserFailed
});

export default compose(
    connect(mapStateToProps, { getUsersTC, deleteUserTC })
)(AdminPageContainer);