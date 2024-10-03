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
		title: '',
		content: '',
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

			if (name === 'title') {
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
		if (!formData.title || !formData.content) {
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
			postData.append('title', formData.title)
			postData.append('content', formData.content)
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

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={styles.profileAction}
					onClick={() => navigate('/userProfile')}
				>
					{t('Профіль')}
				</button>
				<button
					className={styles.profileAction}
					onClick={() => navigate('/userProfilePosts')}
				>
					{t('Публікації')}
				</button>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={() => navigate('/userProfileAddPost')}
				>
					{t('Додати публікацію')}
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
					{t('Переглянути вироби/картини ')}
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
					<div className={styles.profileAddPostField}>
						<label className={styles.profileAddPostLabel}>
							{t('Назва публікації:')}
							<input
								type='text'
								name='title'
								value={formData.title}
								onChange={handleChange}
								maxLength='50'
								className={styles.profileAddPostInput}
								placeholder='Наприклад: Моя перша публікація'
								required
							/>
						</label>
						<small className={styles.remainingChars}>
							{remainingTitle} {t('символів залишилось')}
						</small>
					</div>
					<div className={styles.profileAddPostField}>
						<label className={styles.profileAddPostLabel}>
							{t('Опис публікації:')}
							<textarea
								name='content'
								value={formData.content}
								onChange={handleChange}
								className={styles.profileAddPostTextarea}
								placeholder='Введіть детальний опис публікації'
								required
							/>
						</label>
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
					<button type='submit' className={styles.profileAddPostButton}>
						{t('Зберегти')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default UserProfileAddPost
