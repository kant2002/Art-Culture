import React, { useState } from 'react'
import styles from '../../../styles/components/VerificationPage/LoginPage.module.scss'
import { loginUser } from '../API/ApiFetcher.js'

const Login = ({
	setUsername,
	setIsLoggedIn,
	serverMessage,
	setServerMessage,
}) => {
	const [loginDetails, setLoginDetails] = useState({
		user: '',
		pass: '',
	})

	// Log changes to input fields
	const handleChange = e => {
		const { name, value } = e.target
		console.log(`Input Change - Field: ${name}, Value: ${value}`)
		setLoginDetails(prev => ({
			...prev,
			[name]: value,
		}))
	}

	// Debugging and logging the API interaction
	const handleSubmit = async e => {
		e.preventDefault()
		console.log('Form submitted with login details:', loginDetails)

		try {
			console.log('Sending login request:', {
				user: loginDetails.user,
				pass: loginDetails.pass,
			})
			const data = await loginUser(loginDetails.user, loginDetails.pass)

			console.log('Login response received:', data)

			if (data.success) {
				localStorage.setItem('jwt', data.data.jwt)
				console.log('JWT saved to localStorage:', data.data.jwt)

				console.log('Sending auto-login request with JWT:', data.data.jwt)
				const response = await fetch(
					`https://zimbabaluba.pp.ua/?rest_route=/simple-jwt-login/v1/autologin&JWT=${data.data.jwt}`
				)

				// Detect if the response was redirected or if we received HTML
				if (response.redirected) {
					console.warn(
						'Request was redirected. This is likely an issue with the endpoint.'
					)
				}

				const contentType = response.headers.get('content-type')
				if (
					response.ok &&
					contentType &&
					contentType.includes('application/json')
				) {
					const autoLoginData = await response.json()
					console.log('Auto-login response data:', autoLoginData)

					if (autoLoginData.success) {
						setIsLoggedIn(true)
						setUsername(loginDetails.user)
						console.log(`User ${loginDetails.user} logged in successfully`)
						window.location.replace('https://zimbabaluba.pp.ua/mysite/#/')
					} else {
						console.warn('Auto-login failed:', autoLoginData.message)
						setServerMessage(autoLoginData.message)
					}
				} else {
					console.warn('Unexpected response format. Status:', response.status)
					const responseText = await response.text()
					console.log('Received HTML instead of JSON:', responseText)
					setServerMessage('Unexpected response from server. Please try again.')
				}
			} else {
				console.warn('Login failed:', data.data.message)
				setServerMessage(data.data.message)
			}
		} catch (error) {
			console.error('Login Error:', error)
			setServerMessage('An error occurred during login.')
		}
	}

	return (
		<div className={styles.LoginContainer}>
			<header className={styles.LoginWrapper}>
				<h2>Login</h2>
				{/* Render serverMessage here */}
				<p>{serverMessage}</p>
				<form className={styles.LoginForm} onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='User Name'
						name='user'
						value={loginDetails.user}
						onChange={handleChange}
					/>
					<input
						type='password'
						placeholder='Password'
						name='pass'
						value={loginDetails.pass}
						onChange={handleChange}
					/>
					<input type='submit' value='Go' />
				</form>
			</header>
		</div>
	)
}

export default Login
