import {
    combineReducers,
    createStore,
    applyMiddleware
} from "redux";

import authReducer from "./reducers/auth-reducer";
import adminReducer from "./reducers/admin-reducer";
import studentReducer from "./reducers/student-reducer";
import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({
    auth: authReducer,
    adminPage: adminReducer,
    studentPage: studentReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;