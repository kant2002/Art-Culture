import axios from 'axios'

const API_URL = 'https://zimbabaluba.pp.ua/wp-json/simple-jwt-login/v1'

export const loginUser = async (username, password) => {
	const formData = new FormData()
	formData.append('username', username)
	formData.append('password', password)

	const response = await axios.post(`${API_URL}/auth`, formData)
	return response.data
}

export const registerUser = async userData => {
	const formData = new FormData()
	formData.append('username', userData.username)
	formData.append('email', userData.email)
	formData.append('password', userData.password)

	const response = await axios.post(`${API_URL}/users`, formData)
	return response.data
}

export const autoLoginUser = async jwt => {
	const response = await axios.get(`${API_URL}/autologin`, {
		params: { JWT: jwt },
	})
	return response.data
}
