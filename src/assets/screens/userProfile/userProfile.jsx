import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '/src/styles/components/UserProfile/userProfile.module.scss'

function UserProfile({
	setIsLoggedIn,
	serverMessage,
	setUsername,
	setServerMessage,
}) {
	const [pageText, setPageText] = useState(
		'You are not currently log in. Please log in to see your profile information.'
	)
	const [email, setEmail] = useState('')
	const [regDate, setRegDate] = useState('')

	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		const userJWT = localStorage.getItem('jwt')
		if (userJWT) {
			// Validate JWT
			const url = `https://admin.playukraine.com/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${userJWT}`
			fetch(url)
				.then(res => res.json())
				.then(data => {
					if (data.success) {
						// If validation is successful, set the user data
						setEmail(`Email: ${data.data.user.user_email}`)
						setRegDate(
							`Date of registration: ${data.data.user.user_registered}`
						)
						setPageText(`${data.data.user.user_login}'s User Profile`)
						setIsLoggedIn(true)
						setUsername(data.data.user.user_login)
						setServerMessage('')
					} else {
						// If validation fails, set an error message
						setServerMessage('Session expired. Please log in again.')
						navigate('/LoginPage')
					}
				})
				.catch(error => {
					console.log('Error validating JWT:', error)
					setServerMessage('Error ocurred. Try again.')
				})
		} else {
			setServerMessage('No valid session found. Please login.')
			navigate('/login') // Redirect to login page
		}
	}, [setIsLoggedIn, setUsername, setServerMessage, navigate])
	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}
	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}
	return (
		// <div className={`${styles.profile}`}>
		// 	{/* Верхние кнопки */}
		// 	<div className={`${styles.profileActions}`}>
		// 		<button
		// 			className={`${styles.profileAction} ${styles.profileActionActive}`}
		// 			onClick={handleProfilePageClick}
		// 		>
		// 			Інформація
		// 		</button>
		// 		<button
		// 			className={`${styles.profileAction}`}
		// 			onClick={handlePostsClick}
		// 		>
		// 			Публікації
		// 		</button>
		// 		<button
		// 			className={`${styles.profileAction}`}
		// 			onClick={handleAddPostClick}
		// 		>
		// 			Додати публікацію
		// 		</button>
		// 	</div>

		// 	{/* Аватар и информация о пользователе */}
		// 	<div className={`${styles.profileInfo}`}>
		// 		<div className={`${styles.profileAvatar}`}>
		// 			<img src='ссылка_на_аватар' alt='Фото користувача' />
		// 		</div>
		// 		<div className={`${styles.profileDetails}`}>
		// 			<div className={`${styles.profileField}`}>
		// 				<span className={`${styles.profileLabel}`}>ПІБ:</span>
		// 				<span className={`${styles.profileValue}`}>
		// 					Ведмедчук Микола Іванович
		// 				</span>
		// 				<button className={`${styles.profileEdit}`}>Редагувати</button>
		// 			</div>
		// 			<div className={`${styles.profileField}`}>
		// 				<span className={`${styles.profileLabel}`}>Дата народження:</span>
		// 				<span className={`${styles.profileValue}`}>01.01.1990</span>
		// 				<button className={`${styles.profileEdit}`}>Редагувати</button>
		// 			</div>
		// 			<div className={`${styles.profileField}`}>
		// 				<span className={`${styles.profileLabel}`}>
		// 					Електронна скринька:
		// 				</span>
		// 				<span className={`${styles.profileValue}`}>example@mail.com</span>
		// 				<button className={`${styles.profileEdit}`}>Редагувати</button>
		// 			</div>
		// 			<div className={`${styles.profileField}`}>
		// 				<span className={`${styles.profileLabel}`}>Телефон:</span>
		// 				<span className={`${styles.profileValue}`}>+38 123 456 7890</span>
		// 				<button className={`${styles.profileEdit}`}>Редагувати</button>
		// 			</div>
		// 			<div className={`${styles.profileField}`}>
		// 				<span className={`${styles.profileLabel}`}>Соцмережі:</span>
		// 				<span className={`${styles.profileValue}`}>
		// 					Instagram, Facebook
		// 				</span>
		// 				<button className={`${styles.profileEdit}`}>Редагувати</button>
		// 			</div>
		// 			<div className={`${styles.profileField}`}>
		// 				<span className={`${styles.profileLabel}`}>О собі:</span>
		// 				<span className={`${styles.profileValue}`}>
		// 					Коротко про себе...
		// 				</span>
		// 				<button className={`${styles.profileEdit}`}>Редагувати</button>
		// 			</div>
		// 		</div>
		// 	</div>

		// </div>
		<div className={`${styles.profile}`}>
			<div className={`${styles.profileActions}`}>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleProfilePageClick}
				>
					{t('Profile')}
				</button>
				<button
					className={`${styles.profileAction}`}
					onClick={handlePostsClick}
				>
					{t('Posts')}
				</button>
				<button
					className={`${styles.profileAction}`}
					onClick={handleAddPostClick}
				>
					{t('Add Post')}
				</button>
			</div>

			<div className={`${styles.profileInfo}`}>
				<div className={`${styles.profileDetails}`}>
					<h2>{pageText}</h2>
					<p>{email}</p>
					<p>{regDate}</p>
					<p>{serverMessage}</p>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
