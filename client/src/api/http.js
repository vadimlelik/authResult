import axios from 'axios'
import localStorageService from './localStorageService'
import authService from './authServices'

const baseURL = 'http://localhost:3001/api/v1/'

const http = axios.create({
	baseURL,
})

http.interceptors.request.use(
	async (config) => {
		const expiresDate = localStorageService.getGetTokenExpiresDate()
		const refreshToken = localStorageService.getRefreshToken()
		const isExpired = refreshToken && expiresDate < Date.now()

		if (isExpired) {
			const data = await authService.refresh()
			localStorageService.setToken(data)
		}
		const accessToken = localStorageService.getAccessToken()
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			}
		}

		return config
	},

	(error) => {
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		if (!expectedErrors && !error.config._isRetry) {
			error.config._isRetry = true
			const data = await authService.refresh()
			localStorageService.setToken(data)

			return http.request(error.config)
		}
		return Promise.reject(error)
	}
)

const httpClient = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
}

export default httpClient
