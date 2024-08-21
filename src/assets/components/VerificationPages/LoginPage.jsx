import React, { useState } from 'react'
import styles from '../../../styles/components/VerificationPage/LoginPage.module.scss'
import {
	autoLoginUser,
	loginUser,
	refreshJWT,
	validateJWT,
} from '../API/ApiFetcher.js'

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
			const loginData = await loginUser(loginDetails.user, loginDetails.pass)
			console.log('Login response received:', loginData)

			if (loginData.success) {
				localStorage.setItem('jwt', loginData.data.jwt)
				console.log('JWT saved to localStorage:', loginData.data.jwt)
				console.log('Sending auto-login request with JWT:', loginData.data.jwt)
				// const response = await fetch(
				// 	`https://admin.playukraine.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=${loginData.data.jwt}`
				// )

				// Validate JWT
				const validationResponse = await validateJWT(loginData.data.jwt)
				if (validationResponse.success) {
					console.log('JWT validated proceeding with auto-login')

					// Perform auto-login
					const autoLoginData = await autoLoginUser(loginData.data.jwt)
					if (autoLoginData.success) {
						setIsLoggedIn(true)
						setUsername(loginDetails.user)
						console.log(`User ${loginDetails.user} logged in successfully`)
						window.location.replace('https://art.playukraine.com/userProfile/')
					} else {
						console.warn('Auto-login failed:', autoLoginData.message)
						console.log('Auto-login responce:', autoLoginData)
						setServerMessage(autoLoginData.message)
					}
				} else if (validationResponse.expired) {
					const refreshData = await refreshJWT(loginData.data.jwt)
					if (refreshData.success) {
						localStorage.setItem('jwt', refreshData.data.new_jwt)
						console.log(
							'JWT refreshed and saved to localStorage:',
							refreshData.data.new_jwt
						)

						// Perform auto-login with refreshed JWT
						const autoLoginData = await autoLoginUser(refreshData.data.new_jwt)
						if (autoLoginData.success) {
							setIsLoggedIn(true)
							setUsername(loginDetails.user)
							console.log(`User ${loginDetails.user} logged in successfully`)
							window.location.replace(
								'https://art.playukraine.com/userProfile/'
							)
						} else {
							console.warn(
								'Auto-login failed after refresh:',
								autoLoginData.message || 'No error message provided'
							)
							setServerMessage(
								autoLoginData.message ||
									'Unknown error occurred during auto-login'
							)
						}
					} else {
						console.warn('failed to refresh JWT:', refreshData.message)
						setServerMessage('Session expired. Log again.')
					}
				}
			} else {
				condole.warn('login failed :', loginData.data.message)
				setServerMessage(loginData.data.message)
			}
		} catch (error) {
			console.error('Login error:', error)
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
						placeholder='Email'
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
