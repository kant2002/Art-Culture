import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import { useTranslation } from 'react-i18next'
import TextEditor from '@components/Blocks/TextEditor'
import styles from '@styles/components/VerificationPage/LoginPage.module.scss'

const Login = () => {
	const { t } = useTranslation()
	const [loginDetails, setLoginDetails] = useState({ email: '', password: '' }) // Descriptive names
	const [serverMessage, setServerMessage] = useState('')
	const navigate = useNavigate()
	const { login } = useAuth() // Access login function from context

	const textEditorOnChange = ({name, value}) => {
		setLoginDetails(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		try {
			const response = await API.post(
				'/auth/login',
				{
					email: loginDetails.email,
					password: loginDetails.password,
				},
				console.log('loginDetails.email, loginDetails.password')
			)

			if (response.status === 200) {
				const { token, user } = response.data // Assuming API returns user data
				login(user, token) // Update AuthContext
				navigate('/profile') // Redirect to profile
				console.log('token', token)
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.error || 'Login Failed')
			} else {
				setServerMessage('An error occurred during login.')
			}
		}
	}

	const handleSignUPLinkClick = () => {
		navigate('/SignUP')
	}

	return (
		<div className={styles.LoginContainer}>
			<header className={styles.LoginWrapper}>
				<h1>{t('Вхід')}</h1>
				{/* Render serverMessage here */}
				{serverMessage && (
					<p className={styles.ErrorMessage}>{serverMessage}</p>
				)}
				<form className={styles.LoginForm} onSubmit={handleSubmit}>
					<TextEditor 
						label='Email'
						type='email'
						name='email'
						value={loginDetails.email}
						maxLength='100'
						onChange={textEditorOnChange}
						required 
					/>
					<TextEditor
						label={t('Пароль')}
						type='password'
						name='password'
						value={loginDetails.password}
						maxLength='100'
						onChange={textEditorOnChange}
						required
					/>
					<button type='submit'>{t('Увійти')}</button>
				</form>
				<p
					className={styles.SignUp}
					onClick={handleSignUPLinkClick}
				>
					{t('Реєстрація')}
				</p>
			</header>
		</div>
	)
}

export default Login
