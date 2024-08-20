import axios from 'axios'

const API_URL = 'https://admin.playukraine.com/?rest_route=/simple-jwt-login/v1'

// Login User
export const loginUser = async (email, password) => {
	const url = `${API_URL}/auth&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`

	const response = await axios.post(url)
	return response.data
}

// Register User
export const registerUser = async userData => {
	const formData = new FormData()
	formData.append('username', userData.username)
	formData.append('email', userData.email)
	formData.append('password', userData.password)

	const response = await axios.post(`${API_URL}/users`, formData)
	return response.data
}

// Auto Login User
export const autoLoginUser = async jwt => {
	const response = await axios.get(`${API_URL}/autologin`, {
		params: { JWT: jwt },
	})
	return response.data
}
