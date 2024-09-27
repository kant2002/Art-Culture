import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from '/src/styles/components/UserProfile/userProfile.module.scss'
const UserProfile = () => {
	const { user, logout } = useAuth() // Access user and logout from context
	const [pageText, setPageText] = useState('')
	const [email, setEmail] = useState('')
	const [regDate, setRegDate] = useState('')
	const [serverMessage, setServerMessage] = useState('')
	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			setEmail(`Email: ${user.email}`)
			setRegDate(
				`Date of registration: ${new Date(user.createdAt).toLocaleDateString()}`
			)
			setPageText(`${user.username}'s User Profile`)
		} else {
			setServerMessage('No valid session found. Please login.')
			navigate('/login') // Redirect to login page
		}
		console.log('UserProfile rendering for user:', user)
	}, [user, navigate])

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleProfilePageClick}
				>
					{t('Профіль')}
				</button>
				<button className={styles.profileAction} onClick={handlePostsClick}>
					{t('Публікації')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
				</button>
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.profileInfo}>
				<div className={styles.profileDetails}>
					<h2>{pageText}</h2>
					<p>{email}</p>
					<p>{regDate}</p>
					{serverMessage && (
						<p className={styles.ErrorMessage}>{serverMessage}</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserProfile
