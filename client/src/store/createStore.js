import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSliceReducer } from './authSlice'
import { postReducer } from './postSilce'
import userReducer from './usersSlice'
import roleReducer from './roleSlice'

const rootReducer = combineReducers({
	auth: authSliceReducer,
	posts: postReducer,
	users: userReducer,
	role: roleReducer,
	// message: "messageReducer"
})

export const createStore = () => {
	return configureStore({ reducer: rootReducer })
}
