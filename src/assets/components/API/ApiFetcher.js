// src/APIFetcher.js
import axios from 'axios'

const apiURL = 'https://zimbabaluba.pp.ua/wp-json'

export const login = async (username, password) => {
	try {
		const response = await axios.post(`${apiURL}/jwt-auth/v1/token`, {
			username,
			password,
		})
		return response.data.token
	} catch (error) {
		throw new Error('Login failed')
	}
}

export const register = async (username, password, email) => {
	try {
		await axios.post(`${apiURL}/wp/v2/users/register`, {
			username,
			password,
			email,
		})
	} catch (error) {
		throw new Error('Registration failed')
	}
}
