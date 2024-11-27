// src/components/UserProfile/UserProfileAddPost.jsx

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'

function UserProfileAddPost() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAuth()

	const [formData, setFormData] = useState({
		title_en: '',
		title_uk: '',
		content_en: '',
		content_uk: '',
		images: null,
	})
	const [remainingTitle, setRemainingTitle] = useState(50)
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState({})

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images') {
			setFormData({ ...formData, images: files[0] })
		} else {
			setFormData({ ...formData, [name]: value })

			if (name === 'title_uk') {
				setRemainingTitle(50 - value.length)
			}

			if (name === 'title_en') {
				setRemainingTitle(50 - value.length)
			}

			if (e.target.tagName.toLowerCase() === 'textarea') {
				e.target.style.height = 'auto'
				e.target.style.height = `${e.target.scrollHeight}px`
			}
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setErrors({})

		// Frontend Validation
		if (
			!formData.title_en ||
			!formData.content_en ||
			!formData.title_uk ||
			!formData.content_uk
		) {
			setErrors({ form: 'Title and content are required.' })
			return
		}

		if (!user) {
			setErrors('User not authenticated. Please log in.')
			navigate('/login')
			return
		}

		const token = localStorage.getItem('token')
		if (!token) {
			setErrors('Authentication token missing. Please log in again.')
			navigate('/login')
			return
		}

		try {
			const postData = new FormData()
			postData.append('title_en', formData.title_en)
			postData.append('content_en', formData.content_en)
			postData.append('title_uk', formData.title_uk)
			postData.append('content_uk', formData.content_uk)
			if (formData.images) {
				postData.append('images', formData.images)
			}

			const response = await API.post('/posts', postData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			if (response.status === 201) {
				setMessage('Post added successfully!')
				navigate('/userProfilePosts')
			}
		} catch (error) {
			console.error('Error adding post:', error)
			setMessage(
				error.response?.data?.error || 'Failed to add post. Please try again.'
			)
		}
	}

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

	const handleProductCartCreateClick = () => {
		navigate('/ProductCardCreate')
	}

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleExhibitionCardCreateClick = () => {
		navigate('/ExhibitionCardCreate')
	}

	const handleExhibitionListClick = () => {
		navigate('/Exhibitions')
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
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
				</button>
				<button className={styles.profileAction} onClick={handlePostsClick}>
					{t('Публікації')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleProductCartCreateClick}
				>
					{t('Додати картину')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handlePaintingCardListClick}
				>
					{t('Переглянути вироби/картини')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionCardCreateClick}
				>
					{t('Додати виставку')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionListClick}
				>
					{t('Переглянути виставки')}
				</button>
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.profileAddPostContainer}>
				<h2 className={styles.profileAddPostTitle}>
					{t('Додати нову публікацію')}
				</h2>
				{message && <p className={styles.message}>{message}</p>}
				{errors.form && <p className={styles.error}>{errors.form}</p>}
				<form onSubmit={handleSubmit} className={styles.profileAddPostForm}>
					<div className={styles.modalTextField}>
						<div className={styles.modalFieldUk}>
							<div className={styles.profileAddPostField}>
								<label className={styles.profileAddPostLabel}>
									{t('Назва публікації українською')}
									<input
										type='text'
										name='title_uk'
										value={formData.title_uk}
										onChange={handleChange}
										maxLength='50'
										className={styles.profileAddPostInput}
										// placeholder='Наприклад: Моя перша публікація'
										required
									/>
								</label>
								<small className={styles.remainingChars}>
									{remainingTitle} {t('символів залишилось')}
								</small>
							</div>
							<div className={styles.profileAddPostField}>
								<label className={styles.profileAddPostLabel}>
									{t('Опис публікації українською')}
									<textarea
										name='content_uk'
										value={formData.content_uk}
										onChange={handleChange}
										className={styles.profileAddPostTextarea}
										// placeholder='Введіть детальний опис публікації'
										required
									/>
								</label>
							</div>
						</div>
						<div className={styles.modalFieldEn}>
							<div className={styles.profileAddPostField}>
								<label className={styles.profileAddPostLabel}>
									{t('Назва публікації англійською')}
									<input
										type='text'
										name='title_en'
										value={formData.title_en}
										onChange={handleChange}
										maxLength='50'
										className={styles.profileAddPostInput}
										// placeholder='Title'
										required
									/>
								</label>
								<small className={styles.remainingChars}>
									{remainingTitle} {t('символів залишилось')}
								</small>
							</div>
							<div className={styles.profileAddPostField}>
								<label className={styles.profileAddPostLabel}>
									{t('Опис публікації англійською')}
									<textarea
										name='content_en'
										value={formData.content_en}
										onChange={handleChange}
										className={styles.profileAddPostTextarea}
										// placeholder='Add description'
										required
									/>
								</label>
							</div>
						</div>
					</div>
					<div className={styles.profileAddPostField}>
						<label className={styles.profileAddPostLabel}>
							{t('Додати зображення (опційно):')}
							<input
								type='file'
								name='images'
								accept='image/*'
								onChange={handleChange}
								className={styles.profileAddPostInput}
							/>
						</label>
					</div>

					<div className={styles.profileLinksWrapper}>
						<a
							className={styles.profileLink}
							href='https://www.deepl.com/en/translator'
						>
							{t('Онлайн перекладач')}&#8194;&#187;
						</a>
						<a
							className={styles.profileLink}
							href='https://cloudconvert.com/jpeg-to-webp'
						>
							{t('Онлайн WEBP-конвертер')}&#8194;&#187;
						</a>
					</div>
					<button type='submit' className={styles.profileAddPostButton}>
						{t('Зберегти')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default UserProfileAddPost
