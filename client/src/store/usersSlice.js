import { createSlice } from '@reduxjs/toolkit'
import http from '../api/http'

const initialState = {
	error: null,
	entities: [],
	isLoading: false,
}
const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		userRequest: (state, action) => {
			state.isLoading = true
		},
		userRequestFailed: (state, action) => {
			state.error = action.payload
		},
		userRequestedSuccess: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
		},
	},
})

const { reducer: userReducer, actions } = usersSlice
const { userRequest, userRequestFailed, userRequestedSuccess } = actions

export const fetchUsers = () => async (dispatch, getState) => {
	dispatch(userRequest())
	try {
		const { data } = await http.get('users')
		dispatch(userRequestedSuccess(data))
	} catch (e) {
		dispatch(userRequestFailed(e.message))
	}
}

export const getCurrentUserData = (id) => (state) => {
	if (state.users.entities.length > 0) {
		return state.users.entities.find((u) => u._id === id)
	}
}
export default userReducer
