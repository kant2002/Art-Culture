import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'

function UserProfile() {
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

			{/* Аватар и информация о пользователе */}
			<p>userProfileAddPost</p>
		</div>
	)
}

export default UserProfile
