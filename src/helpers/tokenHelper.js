import {
    Constants
} from "../constants/constants";

export const getToken = () => {
    return localStorage.getItem(Constants.TOKEN)
}

export const setToken = (token) => {
    localStorage.setItem(Constants.TOKEN, token);
}

export const removeToken = () => {
    localStorage.removeItem(Constants.TOKEN);
}