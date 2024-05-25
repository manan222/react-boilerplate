import { combineReducers } from "redux";
import authReducer from "../redux/reducers/authReducer";
import postReducer from "../redux/reducers/postReducer";
import profileReducer from "../redux/reducers/profileReducer";
import loaderReducer from "../redux/reducers/loaderReducer";

export default combineReducers({
    userReducer: authReducer,
    postReducer: postReducer,
    profileReducer: profileReducer,
    loaderReducer: loaderReducer

});