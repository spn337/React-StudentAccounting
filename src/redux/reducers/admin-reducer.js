import {
    usersAPI
} from '../../api/api';
import getErrors from '../../helpers/getErrors';

const LOADING = 'LOADING';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SORTING = 'SET_SORTING';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_UPDATED_USER = 'SET_UPDATED_USER';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

const SUBMIT_DATA_SUCCESS = 'SUBMIT_DATA_SUCCESS';
const DELETE_DATA_FAILED = 'DELETE_DATA_FAILED';
const SET_SUBMIT_MESSAGE = 'SET_SUBMIT_MESSAGE';

const PAGE_SIZE = 10;
const CURRENT_PAGE = 1;

const initialState = {
    usersData: [],
    paggingInfo: {
        pageSize: PAGE_SIZE,
        currentPage: CURRENT_PAGE,
        totalUsersCount: 1,
    },
    searchValue: "",
    sortName: "",
    sortOrder: "",

    updatedUser: {},

    isLoading: false,
    isSubmitUserSuccessed: false,
    isDeleteUserFailed: false,
    submitMessage: null
};


const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.isLoading,
                isSubmitUserSuccessed: false,
                isGetDataSuccessed: false,
                isDeleteUserFailed: false,
                submitMessage: null
            }
        }
        case SET_USERS: {
            return {
                ...state,
                usersData: action.users
            }
        }
        case SET_UPDATED_USER: {
            return {
                ...state,
                updatedUser: action.user
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                paggingInfo: {
                    ...state.paggingInfo,
                    currentPage: action.currentPage
                }
            }
        }
        case SET_SORTING: {
            return {
                ...state,
                sortOrder: action.sortOrder,
                sortName: action.sortName,
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                paggingInfo: {
                    ...state.paggingInfo,
                    totalUsersCount: (action.totalCount > 150) ?
                        150 : action.totalCount
                }
            }
        }
        case SET_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: action.searchValue
            }
        }
        case SUBMIT_DATA_SUCCESS: {
            return {
                ...state,
                isSubmitUserSuccessed: true,
            }
        }
        case SET_SUBMIT_MESSAGE: {
            return {
                ...state,
                submitMessage: action.message
            }
        }
        case DELETE_DATA_FAILED: {
            return {
                ...state,
                isDeleteUserFailed: true
            }
        }
        default:
            return state;
    }
};

const setUsers = (users) => ({
    type: SET_USERS,
    users
});

const setUpdatedUser = (user) => ({
    type: SET_UPDATED_USER,
    user
});

const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

const setSorting = (sortOrder, sortName) => ({
    type: SET_SORTING,
    sortOrder,
    sortName
});

const setTotalUsersCount = (totalCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});

const setSearchValue = (searchValue) => ({
    type: SET_SEARCH_VALUE,
    searchValue
});

const loading = (isLoading) => ({
    type: LOADING,
    isLoading
});

const submitUserSuccess = () => ({
    type: SUBMIT_DATA_SUCCESS,
});

const deleteUserFailed = () => ({
    type: DELETE_DATA_FAILED,
});

const setSubmitMessage = (message) => ({
    type: SET_SUBMIT_MESSAGE,
    message
});


export const getUsersTC = (currentPage = 1, pageSize = 1, searchValue = "", sortOrder = "", sortName = "") => (dispatch) => {
    dispatch(loading(true));
    dispatch(setCurrentPage(currentPage));
    dispatch(setSearchValue(searchValue));
    dispatch(setSorting(sortOrder, sortName));

    usersAPI.getUsers(currentPage, pageSize, searchValue, sortOrder, sortName)
        .then(data => {
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
        .finally(() => dispatch(loading(false)));
}

export const getUpdatedUserTC = (id) => (dispatch) => {
    dispatch(loading(true));

    usersAPI.getUserById(id)
        .then(data => {
            dispatch(setUpdatedUser(data));
        })
        .finally(() => dispatch(loading(false)));
}

export const createUserTC = (user, formActions) => (dispatch) => {
    dispatch(loading(true));

    usersAPI.createUser(user)
        .then(() => {
            formActions.setSubmitting(false);
            dispatch(setSubmitMessage("User was added"));

            dispatch(submitUserSuccess());
        })
        .catch(error => {
            if (error.response.status === 400) {
                const errorMessages = getErrors(error.response.data.errors);
                formActions.setErrors(errorMessages);
            }
        })
        .finally(() => dispatch(loading(false)));

}

export const updateUserTC = (user, formActions) => (dispatch) => {
    dispatch(loading(true));

    usersAPI.updateUser(user.id, user)
        .then(() => {
            formActions.setSubmitting(false);
            dispatch(setSubmitMessage("User was updated"));
            dispatch(submitUserSuccess());
        })
        .catch(error => {
            if (error.response.status === 400) {
                const errorMessages = getErrors(error.response.data.errors);
                formActions.setErrors(errorMessages);
            }
        })
        .finally(() => dispatch(loading(false)));
}

export const deleteUserTC = (id) => (dispatch) => {
    dispatch(loading(true));

    usersAPI.deleteUser(id)
        .then(() => {
            dispatch(setSubmitMessage("User was deleted"));
            dispatch(submitUserSuccess());
        })
        .catch(error => {
            if (error.response.status === 400) {
                dispatch(deleteUserFailed());
            }
        })
        .finally(() => dispatch(loading(false)));

}

export default AdminReducer;