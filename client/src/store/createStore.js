import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSliceReducer} from "./authSlice";
import {postReducer} from "./postSilce";

const rootReducer = combineReducers({
    auth: authSliceReducer,
    posts: postReducer,
    // message: "messageReducer"
})

export const createStore = () => {
    return configureStore({reducer: rootReducer})
}