import React, { useState } from 'react'
import styles from '../../../styles/components/VerificationPage/LoginPage.module.scss'
import { autoLoginUser, loginUser } from '../API/ApiFetcher.js'

const Login = ({ setUsername, setIsLoggedIn, setServerMessage }) => {
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
		e.preventDefault() // Prevent form submission from refreshing the page
		console.log('Form submitted with login details:', loginDetails)

		try {
			// Logging the request details
			console.log('Sending login request:', {
				user: loginDetails.user,
				pass: loginDetails.pass,
			})

			const data = await loginUser(loginDetails.user, loginDetails.pass)

			// Logging the response from the loginUser request
			console.log('Login response received:', data)

			if (data.success) {
				localStorage.setItem('jwt', data.data.jwt)
				console.log('JWT saved to localStorage:', data.data.jwt)

				// Attempting auto-login
				console.log('Sending auto-login request with JWT:', data.data.jwt)
				const autoLoginData = await autoLoginUser(data.data.jwt)

				// Logging the response from the auto-login request
				console.log('Auto-login response received:', autoLoginData)

				if (autoLoginData.success) {
					setIsLoggedIn(true)
					setUsername(loginDetails.user)
					console.log(`User ${loginDetails.user} logged in successfully`)
					window.location.replace('https://zimbabaluba.pp.ua/user/')
				}
			} else {
				console.warn('Login failed:', data.data.message)
				setServerMessage(data.data.message)
			}
		} catch (error) {
			// Logging any errors during the request
			console.error('Login Error:', error)
			setServerMessage('An error occurred during login.')
		}
	}

	return (
		<div className={styles.LoginContainer}>
			<header className={styles.LoginWrapper}>
				<h2>Login</h2>
				<p>{setServerMessage}</p>
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
