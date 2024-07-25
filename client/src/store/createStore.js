import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSliceReducer } from './authSlice'
import { postReducer } from './postSilce'
import userReducer from './usersSlice'
import roleReducer from './roleSlice'
import qualityReducer from "./qualitySlice";

const rootReducer = combineReducers({
	auth: authSliceReducer,
	posts: postReducer,
	users: userReducer,
	role: roleReducer,
	quality:qualityReducer,
})

export const createStore = () => {
	return configureStore({ reducer: rootReducer })
}
