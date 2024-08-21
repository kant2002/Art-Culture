import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'
import '/src/styles/components/UserProfile/userProfile.module.scss'

function UserProfileAddPost() {

	const { t } = useTranslation();

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		titleUa: '',
		descriptionUa: '',
		titleEn: '',
		descriptionEn: '',
		photo: null,
	});

	// Состояния для отслеживания оставшихся символов
	const [remainingTitleUa, setRemainingTitleUa] = useState(50);
	const [remainingTitleEn, setRemainingTitleEn] = useState(50);

	const handleProfilePageClick = () => {
		navigate('/userProfile');
	};

	const handlePostsClick = () => {
		navigate('/userProfilePosts');
	};

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost');
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'photo') {
			setFormData({ ...formData, photo: files[0] });
		} else {
			setFormData({ ...formData, [name]: value });

			// Обновление оставшихся символов
			if (name === 'titleUa') {
				setRemainingTitleUa(50 - value.length);
			} else if (name === 'titleEn') {
				setRemainingTitleEn(50 - value.length);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Логика для обработки и сохранения данных формы
		console.log('Form data submitted:', formData);
	};

	return (
		<div className={styles.profile}>
			{/* Верхние кнопки */}
			<div className={styles.profileActions}>
				<button
					className={styles.profileAction}
					onClick={handleProfilePageClick}
				>
					Інформація
				</button>
				<button
					className={styles.profileAction}
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
				<h2 className={`${styles.profileAddPostTitle}`}>Додати нову публікацію</h2>
				<form onSubmit={handleSubmit} className={`${styles.profileAddPostForm}`}>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							Введіть назву публікації українською мовою:
							<input
								type="text"
								name="titleUa"
								value={formData.titleUa}
								onChange={handleChange}
								maxLength="50"
								required
								className={`${styles.profileAddPostInput}`}
								placeholder="Например: Моя перша публікація"
							/>
						</label>
						<small className={styles.remainingChars}>{remainingTitleUa} символів залишилось</small>
					</div>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							Введіть опис публікації українською мовою:
							<textarea
								name="descriptionUa"
								value={formData.descriptionUa}
								onChange={handleChange}
								required
								className={`${styles.profileAddPostTextarea}`}
								placeholder="Введіть детальний опис публікації"
							/>
						</label>
					</div>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							Введіть назву публікації англійською мовою:
							<input
								type="text"
								name="titleEn"
								value={formData.titleEn}
								onChange={handleChange}
								maxLength="50"
								required
								className={`${styles.profileAddPostInput}`}
								placeholder="For example: My first post"
							/>
						</label>
						<small className={styles.remainingChars}>{remainingTitleEn} characters remaining</small>
					</div>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							Введіть опис публікації англійською мовою:
							<textarea
								name="descriptionEn"
								value={formData.descriptionEn}
								onChange={handleChange}
								required
								className={`${styles.profileAddPostTextarea}`}
								placeholder="Enter a detailed description of the post"
							/>
						</label>
					</div>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							Завантажте фото для публікації:
							<input
								type="file"
								name="photo"
								accept="image/*"
								onChange={handleChange}
								required
								className={`${styles.profileAddPostFileInput}`}
							/>
						</label>
					</div>
					<button type="submit" className={`${styles.profileAddPostButton}`}>
						Зберегти
					</button>
				</form>
			</div>
		</div>
	)
}

export default UserProfileAddPost
