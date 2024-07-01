import axios from 'axios'

const baseURL = 'http://localhost:3001/api/v1/'

// http://localhost:3001/api/v1/auth/token
const http = axios.create({
	baseURL,
})

http.interceptors.request.use(
	async (config) => {
		/* expiresDate = localStorageService.getAccessTokenExpiresDate() */
		/* refreshToken = localStorageService.getRefreshToken()  */
		/* isExpired = refreshToken && expiresDate < Date.now()  */

		if (true) {
			const data = await http.get('/auth/token')
			/* localStorageService.setTokens(data) */
		}
		// const accessToken = localStorageService.getAccessToken()
		if (/*accessToken*/ true) {
			config.headers = {
				...config.headers,
				// "Authorization": `Bearer ${/*accessToken*/}`
			}
		}
		return config
	},

	(error) => {
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
