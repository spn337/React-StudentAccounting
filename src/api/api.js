import * as axios from 'axios';

import {
    getToken,
    removeToken
} from '../helpers/tokenHelper';

const instanceAPI = axios.create({
    baseURL: "http://localhost:5000/api/",
});

instanceAPI.interceptors.request.use(
    (config) => {
        const token = `Bearer ${getToken()}`;
        config.headers.Authorization = token;
        return config;
    })

instanceAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            removeToken();
        }
        return Promise.reject(error);
    });


export const usersAPI = {
    getUsers(currentPage, pageSize, searchValue, sortOrder, sortName) {
        const serverSortName = this.transformSortName(sortName);
        return instanceAPI
            .get(`users?currentPage=${currentPage}&pageSize=${pageSize}` +
                `&searchValue=${searchValue}&sortOrder=${sortOrder}&sortName=${serverSortName}`)
            .then(response => response.data)
    },

    getUserById(id) {
        return instanceAPI.get(`users/${id}`)
            .then(response => response.data)
    },

    createUser(user) {
        return instanceAPI.post(`auth/registration`, user);
    },

    deleteUser(id) {
        return instanceAPI.delete(`users/${id}`);
    },

    updateUser(id, user) {
        return instanceAPI.put(`users/${id}`, user);
    },

    transformSortName(name) {
        if (name !== "") {
            const toServerName = name[0].toUpperCase() + name.slice(1)
            return toServerName;
        }
        return name;
    }
}

export const enrollmentsAPI = {
    getSubscribedCourses() {
        return instanceAPI.get(`enrollments/subscribed`)
            .then(response => response.data);
    },

    getUnsubscribedCourses() {
        return instanceAPI.get(`enrollments/unsubscribed`)
            .then(response => response.data);
    },

    subscribe(courseId, studyDate) {
        return instanceAPI.post(`enrollments/${courseId}`, {
            studyDate
        })
    },

    unsubscribe(courseId) {
        return instanceAPI.delete(`enrollments/${courseId}`)
    },
}

export const authAPI = {
    getAuthorizedUser() {
        return instanceAPI.get(`auth/profile`);
    },

    login(loginData) {
        return instanceAPI.post(`auth/login`, loginData);
    },

    registration(user) {
        return instanceAPI.post(`auth/registration`, user);
    },

    logout() {
        return instanceAPI.delete(`auth/logout`);
    },

    confirmEmail(userId, token) {
        return instanceAPI.get(`auth/confirmemail?userId=${userId}&token=${token}`);
    }
}