import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import styles from '@styles/components/VerificationPage/LoginPage.module.scss'
import API from '../../../utils/api.js'
import { useTranslation } from 'react-i18next'
import TextEditor from '@components/Blocks/TextEditor'
import TextAreaEditor from '@components/Blocks/TextAreaEditor'
import ImageEditor from '../../components/Blocks/ImageEditor.jsx'

const SignUp = () => {
	const { t } = useTranslation()
	const [signUpDetails, setSignUpDetails] = useState({
		email: '',
		password: '',
		role: 'USER',
		title: '',
		bio: '',
		profileImage: null,
	})
	const [serverMessage, setServerMessage] = useState('')
	const { login } = useAuth() // Utilize login from AuthContext
	const navigate = useNavigate()

	const textEditorOnChange = ({ name, value }) => {

		setSignUpDetails(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleChange = e => {
		const { name, value, files } = e.target
		if (name === 'profileImage') {
			setSignUpDetails(prev => ({
				...prev,
				profileImage: files[0] || null,
			}))
		} else {
			setSignUpDetails(prev => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		console.log('signUpDetails before submission:', signUpDetails)

		const formData = new FormData()
		formData.append('email', signUpDetails.email)
		formData.append('password', signUpDetails.password)
		formData.append('role', signUpDetails.role)
		formData.append('title', signUpDetails.title)
		formData.append('bio', signUpDetails.bio)
		if (signUpDetails.profileImage) {
			formData.append('profileImage', signUpDetails.profileImage[0])
		}

		// Log formData entries for debugging
		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value)
		}

		try {
			const response = await API.post(
				'/auth/register',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
				console.log('signUpDetails', signUpDetails)
			)

			if (response.status === 201) {
				const { token, user } = response.data // Assuming API returns user data
				login(user, token) // Update AuthContext
				navigate('/profile') // Redirect to profile
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
		<div className={styles.LoginContainer}>
			<header className={styles.LoginWrapper}>
				<h1>{t('Реєстрація')}</h1>
				{serverMessage && (
					<p className={styles.ErrorMessage}>{serverMessage}</p>
				)}
				<form className={styles.SignUpForm} onSubmit={handleSubmit}>
					<TextEditor
						label='Email'
						type='email'
						name='email'
						value={signUpDetails.email}
						onChange={textEditorOnChange}
						maxLength='191'
						required
					/>
					<TextEditor
						label={t('Пароль')}
						type='password'
						name='password'
						value={signUpDetails.password}
						onChange={textEditorOnChange}
						maxLength='191'
						required
					/>
					<TextEditor
						label={t('П.І.Б.')}
						type='text'
						name='title'
						value={signUpDetails.title}
						onChange={textEditorOnChange}
						maxLength='191'
						required 
					/>
					<TextAreaEditor
						label={t('Про себе')}
						placeholder='Bio'
						name='bio'
						value={signUpDetails.bio}
						onChange={textEditorOnChange}
						maxLength='191'
						required 
					/>
					<ImageEditor
						label={t('Додати зображення')}
						type='file'
						name='profileImage'
						accept='image/*'
						onChange={textEditorOnChange}
						maxLength='191'
						required 
					/>
					<select
						name='role'
						value={signUpDetails.role}
						onChange={handleChange}
						className={styles.roleSelect}
						required 					>
						<option value='USER'>User</option>
						<option value='MUSEUM'>Museum</option>
						<option value='CREATOR'>Creator</option>
						<option value='EDITOR'>Editor</option>
					</select>
					<button type='submit'>{t('Реєстрація')}</button>
				</form>
			</header>
		</div>
	)
}
export default SignUp
