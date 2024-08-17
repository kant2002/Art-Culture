import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'
import '/src/styles/components/UserProfile/userProfile.module.scss'

function UserProfile() {
	const { t } = useTranslation()

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
					className={`${styles.profileAction}`}
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
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleAddPostClick}
				>
					Додати публікацію
				</button>
			</div>

			{/* Добавить публикацию */}
			<div className={`${styles.profileAddPostContainer}`}>
			</div>
		</div>
	)
}

export default UserProfile
