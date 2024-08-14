import React, { useState } from 'react'
import styles from '../../../styles/components/VerificationPage/LoginPage.module.scss'
import { autoLoginUser, loginUser } from '../API/ApiFetcher.js'

const Login = ({ setUsername, setIsLoggedIn, setServerMessage }) => {
	const [loginDetails, setLoginDetails] = useState({
		user: '',
		pass: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setLoginDetails(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async () => {
		try {
			const data = await loginUser(loginDetails.user, loginDetails.pass)
			if (data.success) {
				localStorage.setItem('jwt', data.data.jwt)
				const autoLoginData = await autoLoginUser(data.data.jwt)
				if (autoLoginData.success) {
					setIsLoggedIn(true)
					setUsername(loginDetails.user)
					window.location.replace('https://zimbabaluba.pp.ua/mysite/#/')
				}
			} else {
				setServerMessage(data.data.message)
			}
		} catch (error) {
			console.error('Login Error:', error)
		}
	}

	return (
		<div className={styles.LoginContainer}>
			<header className={styles.LoginWrapper}>
				<h2>Login</h2>
				<p>{setServerMessage}</p>
				<div className={styles.LoginForm}>
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
					<input type='submit' value='Go' onClick={handleSubmit} />
				</div>
			</header>
		</div>
	)
}

export default Login
