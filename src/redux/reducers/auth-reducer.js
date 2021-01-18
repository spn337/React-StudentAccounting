import {
    authAPI,
} from "../../api/api";
import {
    googleAPI
} from "../../api/google-api";
import getErrors from "../../helpers/getErrors";
import {
    setToken,
    removeToken
} from "../../helpers/tokenHelper"


const LOADING_START = 'LOADING_START';
const LOADING_FINISH = 'LOADING_FINISH';

const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';


const initialState = {
    user: null,
    isRegistrationSuccessed: false,
    isConfirmEmailSuccessed: false,
    isLoginFailed: false,
    errorMessage: null,
    isLoading: false,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START: {
            return {
                ...state,
                isRegistrationSuccessed: false,
                isConfirmEmailSuccessed: false,
                errorMessage: null,
                isLoading: true,
            }
        }
        case LOADING_FINISH: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case SET_AUTHORIZED_USER: {
            return {
                ...state,
                user: {
                    ...action.payload.user,
                    roles: action.payload.roles,
                }
            }
        }
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                isRegistrationSuccessed: true,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                user: null,
            }
        }
        case CONFIRM_EMAIL_SUCCESS: {
            return {
                ...state,
                isConfirmEmailSuccessed: true,
            }
        }
        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage,
            }
        }
        default:
            return state;
    }
};

const loadingStart = () => ({
    type: LOADING_START,
});

const loadingFinish = () => ({
    type: LOADING_FINISH,
});

const setAuthorizedUser = (payload) => ({
    type: SET_AUTHORIZED_USER,
    payload
})

const confirmEmailSuccess = () => ({
    type: CONFIRM_EMAIL_SUCCESS
});

const registrationSuccess = () => ({
    type: REGISTRATION_SUCCESS,
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

const setErrorMessage = (errorMessage) => ({
    type: SET_ERROR_MESSAGE,
    errorMessage
});


export const getAuthorizedUserTC = () => (dispatch) => {
    dispatch(loadingStart());

    return authAPI.getAuthorizedUser()
        .then(response => {
            dispatch(setAuthorizedUser(response.data));
        })
        .finally(() => dispatch(loadingFinish()));
}

export const loginTC = (loginData) => (dispatch) => {
    dispatch(loadingStart());

    authAPI.login(loginData)
        .then((response) => {
            setToken(response.data.token);
            dispatch(setAuthorizedUser(response.data));
        })
        .catch(error => {
            if (error.response !== undefined && error.response.status === 400) {
                const errorMessage = error.response.data.error;
                dispatch(setErrorMessage(errorMessage));
            }
        })
        .finally(() => dispatch(loadingFinish()));
}

export const googleLoginTC = () => (dispatch) => {
    googleAPI.login()
        .then((response) => {
            const id = response.getBasicProfile().getId();
            const firstName = response.getBasicProfile().getGivenName()
            const lastName = response.getBasicProfile().getFamilyName()
            const userName = response.getBasicProfile().getEmail()

            // setToken(response.data.token);
            dispatch(setAuthorizedUser({
                id,
                firstName,
                lastName,
                userName
            }));
        })
        .catch(() => {
            dispatch(setErrorMessage("some error"));
        })
}

export const registrationTC = (user, formActions) => (dispatch) => {
    dispatch(loadingStart());

    authAPI.registration(user)
        .then(() => {
            formActions.setSubmitting(false);
            formActions.resetForm();
            dispatch(registrationSuccess());
        })
        .catch(error => {
            if (error.response !== undefined && error.response.status === 400) {
                const errorMessages = getErrors(error.response.data.errors);
                formActions.setErrors(errorMessages);
            }
        })
        .finally(() => dispatch(loadingFinish()));
}

export const logoutTC = () => (dispatch) => {
    dispatch(loadingStart());

    authAPI.logout()
        .then(() => {
            removeToken();

            dispatch(logoutSuccess());
        })
        .finally(() => dispatch(loadingFinish()));
}

export const confirmTC = (userId, token) => (dispatch) => {
    dispatch(loadingStart());

    authAPI.confirmEmail(userId, token)
        .then(() => {
            dispatch(confirmEmailSuccess());
        })
        .catch(error => {
            if (error.response !== undefined && error.response.status === 400) {
                const errorMessage = error.response.data.error;
                dispatch(setErrorMessage(errorMessage));
            }
        })
        .finally(() => dispatch(loadingFinish()));
}

export default AuthReducer;