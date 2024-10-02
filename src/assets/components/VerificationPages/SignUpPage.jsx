import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import styles from '../../../styles/components/VerificationPage/SignUpPage.module.scss'
import API from '../../../utils/api.js'

const SignUp = () => {
	const [signUpDetails, setSignUpDetails] = useState({
		email: '',
		password: '',
		role: 'USER',
	})
	const [serverMessage, setServerMessage] = useState('')
	const { login } = useAuth() // Utilize login from AuthContext
	const navigate = useNavigate()

	const handleChange = e => {
		const { name, value } = e.target
		setSignUpDetails(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		try {
			const response = await API.post(
				'/auth/register',
				{
					email: signUpDetails.email,
					password: signUpDetails.password,
					role: signUpDetails.role,
				},
				console.log('signUpDetails', signUpDetails)
			)

			if (response.status === 201) {
				const { token, user } = response.data // Assuming API returns user data
				login(user, token) // Update AuthContext
				navigate('/userProfile') // Redirect to profile
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.error || 'Registration failed.')
			} else {
				setServerMessage('An error occurred during registration.')
			}
		}
	}

	return (
		<div className={styles.SignUpContainer}>
			<header className={styles.SignUpWrapper}>
				<h2>Sign Up</h2>
				{serverMessage && (
					<p className={styles.ErrorMessage}>{serverMessage}</p>
				)}
				<form className={styles.SignUpForm} onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={signUpDetails.email}
						onChange={handleChange}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={signUpDetails.password}
						onChange={handleChange}
						required
					/>
					<select
						name='role'
						value={signUpDetails.role}
						onChange={handleChange}
						className={styles.roleSelect}
					>
						<option value='USER'>User</option>

						<option value='MUSEUM'>Museum</option>
						<option value='CREATOR'>Creator</option>
						<option value='EDITOR'>Editor</option>
					</select>
					<button type='submit'>Sign Up</button>
				</form>
			</header>
		</div>
	)
}
export default SignUp
