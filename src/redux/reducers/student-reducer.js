import {
    enrollmentsAPI
} from "../../api/api";

const SET_SUBSCRIBED_COURSES = 'SET_SUBSCRIBED_COURSES';
const SET_UNSUBSCRIBED_COURSES = 'SET_UNSUBSCRIBED_COURSES';
const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
const SUBSCRIBE_FAILED = 'SUBSCRIBE_FAILED';
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS';

const initialState = {
    subscribedCourses: [],
    unsubscribedCourses: [],
    isSubscribeSuccess: false,
    isSubscribeFailed: false,
    isUnsubscribeSuccess: false,
    errorMessage: ''
};

const StudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIBED_COURSES: {
            return {
                ...state,
                subscribedCourses: action.courses,
                isSubscribeSuccess: false,
                isUnsubscribeSuccess: false,
                isSubscribeFailed: false,
                errorMessage: ''
            }
        }
        case SET_UNSUBSCRIBED_COURSES: {
            return {
                ...state,
                unsubscribedCourses: action.courses
            }
        }
        case SUBSCRIBE_SUCCESS: {
            return {
                ...state,
                isSubscribeSuccess: true
            }
        }
        case UNSUBSCRIBE_SUCCESS: {
            return {
                ...state,
                isUnsubscribeSuccess: true
            }
        }
        case SUBSCRIBE_FAILED: {
            return {
                ...state,
                isSubscribeFailed: true,
                errorMessage: action.errorMessage
            }
        }
        default:
            return state;
    }
}

const setSubscribedCourses = (courses) => ({
    type: SET_SUBSCRIBED_COURSES,
    courses
});

const setUnsubscribedCourses = (courses) => ({
    type: SET_UNSUBSCRIBED_COURSES,
    courses
});

const unsubscribeSuccess = () => ({
    type: UNSUBSCRIBE_SUCCESS
})

const subscribeSuccess = () => ({
    type: SUBSCRIBE_SUCCESS
});
const subscribeFailed = (errorMessage) => ({
    type: SUBSCRIBE_FAILED,
    errorMessage
});


export const getSubscribedCoursesTC = () => (dispatch) => {

    enrollmentsAPI.getSubscribedCourses()
        .then(data => {
            dispatch(setSubscribedCourses(data.items))
        });
};

export const getUnSubscribedCoursesTC = () => (dispatch) => {

    enrollmentsAPI.getUnsubscribedCourses()
        .then(data => {
            dispatch(setUnsubscribedCourses(data.items))
        });
};

export const subscribeTC = (courseId, studyDate) => (dispatch) => {
    enrollmentsAPI.subscribe(courseId, studyDate)
        .then(() => {
            dispatch(subscribeSuccess());
        })
        .catch(error => {
            if (error.response !== undefined && error.response.status === 400) {
                const errorMessage = error.response.data.error;
                dispatch(subscribeFailed(errorMessage));
            }
        })
}

export const unsubscribeTC = (courseId) => (dispatch) => {
    enrollmentsAPI.unsubscribe(courseId)
        .then(response => {
            if (response.status === 204) {
                dispatch(unsubscribeSuccess());
            }
        });
}

export default StudentReducer;