import axios from 'axios'
import localStorageService from './localStorageService'

const baseURL = 'http://localhost:3001/api/v1/auth/'

const httpAuth = axios.create({
	baseURL,
})

const authServices = {
	register: async (payload) => {
		try {
			const { data } = await httpAuth.post('signUp', payload)
			return data
		} catch (e) {}
	},

	login: async (payload) => {
		try {
			const { data } = await httpAuth.post('signIn', payload)
			return data
		} catch (e) {}
	},

	refresh: async () => {
		try {
			const { data } = await httpAuth.post('token', {
				refreshToken: localStorageService.getRefreshToken(),
			})
			return data
		} catch (e) {}
	},
}

export default authServices
