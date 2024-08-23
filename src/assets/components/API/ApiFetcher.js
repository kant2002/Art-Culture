import axios from 'axios'

const API_URL = 'https://admin.playukraine.com/?rest_route=/simple-jwt-login/v1'

// Login User
export const loginUser = async (email, password) => {
	const url = `${API_URL}/auth&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
	const response = await axios.post(url)
	return response.data
}

export const refreshJWT = async jwt => {
	const url = `${API_URL}/auth/refresh&JWT=${jwt}`
	const response = await axios.post(url)
	return response.data
}

export const validateJWT = async jwt => {
	const url = `${API_URL}/auth/validate&JWT=${jwt}`
	const response = await axios.get(url)
	return response.data
}

// Auto Login User
export const autoLoginUser = async jwt => {
	try {
		const response = await axios.get(`${API_URL}/autologin`, {
			params: { JWT: jwt },
		})

		console.log('Auto-login API response:', response) // Inspect the response object
		return response.data // Ensure this is structured as expected
	} catch (error) {
		console.error('Auto-login API error:', error)
		return { success: false, message: 'Auto-login failed due to an error' }
	}
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
export const fetchUserPosts = async userId => {
	const jwt = localStorage.getItem('jwt') // Retrieve JWT from local storage

	if (!jwt) {
		throw new Error('User is not authenticated.')
	}

	try {
		const response = await axios.get(
			`https://admin.playukraine.com/wp-json/wp/v2/posts?author=${userId}&_embed`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error fetching user posts:', error)
		throw error
	}
}
