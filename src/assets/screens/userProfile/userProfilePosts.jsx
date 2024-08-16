import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/components/UserProfile/userProfilePosts.module.scss'

const UserProfile = () => {
	const navigate = useNavigate()

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}
	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}
	return (
		<div className={`${styles.profile}`}>
			{/* Верхние кнопки */}
			<div className={`${styles.profileActions}`}>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleProfilePageClick}
				>
					Інформація
				</button>
				<button
					className={`${styles.profileAction}`}
					onClick={handlePostsClick}
				>
					Публікації
				</button>
				<button
					className={`${styles.profileAction}`}
					onClick={handleAddPostClick}
				>
					Додати публікацію
				</button>
			</div>
			<p>userProfilePosts</p>
		</div>
	)
}

export default UserProfile
