import { createSlice } from '@reduxjs/toolkit'
import http from '../api/http'

const initialState = {
	error: null,
	entities: [],
	isLoading: false,
}
const roleSlice = createSlice({
	name: 'role',
	initialState,
	reducers: {
		roleRequest: (state, action) => {
			state.isLoading = true
		},
		roleRequestFailed: (state, action) => {
			state.error = action.payload
		},
		roleRequestedSuccess: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
		},
	},
})

const { reducer: roleReducer, actions } = roleSlice
const { roleRequest, roleRequestFailed, roleRequestedSuccess } = actions

export const fetchRole = () => async (dispatch, getState) => {
	dispatch(roleRequest())
	try {
		const { data } = await http.get('roles')
		dispatch(roleRequestedSuccess(data))
	} catch (e) {
		dispatch(roleRequestFailed(e.message))
	}
}

export const getRoles = (state) => {
	return state.role.entities
}

export const getRolesById = (roleIds) => (state) => {
	if (state.role.entities && roleIds) {
		const rolesArray = []
		for (const roleId of roleIds) {
			for (const role of state.role.entities) {
				if (role._id === roleId) {
					rolesArray.push(role)
				}
			}
		}
		return rolesArray
	}
	return []
}

export default roleReducer
