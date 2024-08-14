import React, { useState } from 'react'
import { autoLoginUser, registerUser } from '../API/ApiFetcher'
import '/src/styles/components/VerificationPage/SignUpPage.module.scss'

const SignUp = ({ setUsername, setIsLoggedIn, setServerMessage }) => {
	const [signUpDetails, setSignUpDetails] = useState({
		user: '',
		email: '',
		pass: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setSignUpDetails(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async () => {
		try {
			const data = await registerUser(signUpDetails)
			if (data.success) {
				localStorage.setItem('jwt', data.data.jwt)
				const autoLoginData = await autoLoginUser(data.data.jwt)
				if (autoLoginData.success) {
					setIsLoggedIn(true)
					setUsername(signUpDetails.user)
					window.location.replace('https://zimbabaluba.pp.ua/mysite/#/')
				}
			} else {
				setServerMessage(data.data.message)
			}
		} catch (error) {
			console.error('Sign Up Error:', error)
		}
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h2>Sign Up</h2>
				<p>{setServerMessage}</p>
				<div className='signup'>
					<input
						type='text'
						placeholder='User Name'
						name='user'
						value={signUpDetails.user}
						onChange={handleChange}
					/>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={signUpDetails.email}
						onChange={handleChange}
					/>
					<input
						type='password'
						placeholder='Password'
						name='pass'
						value={signUpDetails.pass}
						onChange={handleChange}
					/>
					<input type='submit' value='Sign Up' onClick={handleSubmit} />
				</div>
			</header>
		</div>
	)
}

export default SignUp
