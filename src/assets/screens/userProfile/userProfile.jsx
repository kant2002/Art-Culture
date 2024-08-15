import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '/src/styles/components/UserProfile/userProfile.module.scss'

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
			<div className={`${styles.profileInfo}`}>
				<div className={`${styles.profileAvatar}`}>
					<img src='ссылка_на_аватар' alt='Фото користувача' />
				</div>
				<div className={`${styles.profileDetails}`}>
					<div className={`${styles.profileField}`}>
						<span className={`${styles.profileLabel}`}>ПІБ:</span>
						<span className={`${styles.profileValue}`}>
							Ведмедчук Микола Іванович
						</span>
						<button className={`${styles.profileEdit}`}>Редагувати</button>
					</div>
					<div className={`${styles.profileField}`}>
						<span className={`${styles.profileLabel}`}>Дата народження:</span>
						<span className={`${styles.profileValue}`}>01.01.1990</span>
						<button className={`${styles.profileEdit}`}>Редагувати</button>
					</div>
					<div className={`${styles.profileField}`}>
						<span className={`${styles.profileLabel}`}>
							Електронна скринька:
						</span>
						<span className={`${styles.profileValue}`}>example@mail.com</span>
						<button className={`${styles.profileEdit}`}>Редагувати</button>
					</div>
					<div className={`${styles.profileField}`}>
						<span className={`${styles.profileLabel}`}>Телефон:</span>
						<span className={`${styles.profileValue}`}>+38 123 456 7890</span>
						<button className={`${styles.profileEdit}`}>Редагувати</button>
					</div>
					<div className={`${styles.profileField}`}>
						<span className={`${styles.profileLabel}`}>Соцмережі:</span>
						<span className={`${styles.profileValue}`}>
							Instagram, Facebook
						</span>
						<button className={`${styles.profileEdit}`}>Редагувати</button>
					</div>
					<div className={`${styles.profileField}`}>
						<span className={`${styles.profileLabel}`}>О собі:</span>
						<span className={`${styles.profileValue}`}>
							Коротко про себе...
						</span>
						<button className={`${styles.profileEdit}`}>Редагувати</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
