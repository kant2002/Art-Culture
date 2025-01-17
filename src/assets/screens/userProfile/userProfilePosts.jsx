// src/components/UserProfile/UserProfilePosts.jsx

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfilePosts.module.scss'

function UserProfilePosts() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAuth()
	const isUser = user && user.role === 'USER'
	const isCreator = user && user.role === 'CREATOR'
	const isMuseum = user && user.role === 'MUSEUM'
	const isAdmin = user && user.role === 'ADMIN'
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

	const [posts, setPosts] = useState([]) // User's posts
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('') // Error state

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingPost, setEditingPost] = useState(null)
	const [formData, setFormData] = useState({
		title_en: '',
		content_en: '',
		title_uk: '',
		content_uk: '',
		images: null,
	})
	const [remainingTitle, setRemainingTitle] = useState(50)
	const [message, setMessage] = useState('')
	const [formErrors, setFormErrors] = useState([])

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				if (!user) {
					setError('User not authenticated')
					navigate('/login')
					return
				}

				// Fetch posts by this user
				const response = await API.get('/posts', {
					params: { authorId: user.id }, // Assuming your API can filter by authorId
				})

				setPosts(Array.isArray(response.data) ? response.data : [])
			} catch (err) {
				console.error('Error fetching user posts:', err)
				setError('Failed to fetch posts')
			} finally {
				setLoading(false)
			}
		}

		fetchUserPosts()
	}, [user, navigate])

	useEffect(() => {
		const handleLanguageChange = lng => {
			setCurrentLanguage(lng)
		}

		i18n.on('languageChanged', handleLanguageChange)

		return () => {
			i18n.off('languageChanged', handleLanguageChange)
		}
	}, [i18n])

	// Handlers for navigation

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

	// Modal Handlers
	const openEditModal = post => {
		setEditingPost(post)
		setFormData({
			title_en: post.title_en || '',
			content_en: post.content_en || '',
			title_uk: post.title_uk || '',
			content_uk: post.content_uk || '',
			images: null,
		})
		setRemainingTitle(50 - post.title_en.length || post.title_uk.length)
		setIsModalOpen(true)
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setEditingPost(null)
		setFormErrors({})
		setMessage('')
	}

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images') {
			setFormData({ ...formData, images: files[0] })
		} else {
			setFormData({ ...formData, [name]: value })

			if (name === 'title_en' || name === 'title_uk') {
				setRemainingTitle(50 - value.length)
			}

			if (e.target.tagName.toLowerCase() === 'textarea') {
				e.target.style.height = 'auto'
				e.target.style.height = `${e.target.scrollHeight}px`
			}
		}
	}

	const handleEditSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setFormErrors({})

		if (
			!formData.title_en ||
			!formData.content_en ||
			!formData.title_uk ||
			!formData.content_uk
		) {
			setFormErrors({ form: 'Заголовок та опис необхідні' })
			return
		}

		try {
			const postData = new FormData()
			postData.append('title_en', formData.title_en)
			postData.append('content_en', formData.content_en)
			postData.append('title_uk', formData.title_uk)
			postData.append('content_uk', formData.content_uk)
			if (formData.images instanceof File) {
				postData.append('images', formData.images)
			}

			const response = await API.put(`/posts/${editingPost.id}`, postData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})

			if (response.status === 200) {
				setMessage('Post update successfully')

				setPosts(prevPosts =>
					prevPosts.map(post =>
						post.id === editingPost.id ? response.data : post
					)
				)
				closeEditModal()
			}
		} catch (error) {
			console.error('Error updating post', error)
			setMessage(
				error.response?.data?.error ||
					'Failed to update post. Please try again.'
			)
		}
	}

	const handleDeletePost = async postId => {
		if (window.confirm(t('Ви впевнені, що хочете видалити цю публікацію?'))) {
			try {
				const response = await API.delete(`/posts/${postId}`)
				if (response.status === 200) {
					setPosts(posts.filter(post => post.id !== postId))
				}
			} catch (err) {
				console.error('Error deleting post', err)
				setError('Failed to delete post')
			}
		}
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
				{!isUser && !isMuseum && (
					<>
						<button
							className={styles.profileAction}
							onClick={handleAddPostClick}
						>
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
					</>
				)}
				{isMuseum && (
					<>
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
					</>
				)}
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.userProfilePostsContainer}>
				<div className={styles.profileTitleWrapper}>
					<h3 className={styles.profileTitle}>{t('Публікації')}</h3>
				</div>
				{loading ? (
					<p className={styles.userPageLoadingMessage}>
						{t('Завантаження...')}
					</p>
				) : error ? (
					<p className={styles.userPageErrorMessage}>{error}</p>
				) : posts.length === 0 ? (
					<p>{t('Публікацій немає')}</p>
				) : (
					posts.map(post => (
						<div key={post.id} className={styles.userProfilePostsWrapper}>
							<div className={styles.userProfilePostsPicAndTextWrapper}>
								<div className={styles.userProfilePostsPicWrapper}>
									{post.images ? (
										<img
											className={styles.userProfilePostsPic}
											src={post.images}
											alt={t('Світлина публікації')}
											onError={e => {
												e.target.onerror = null
												e.target.src = '/Img/defaultPostImage.jpg' // Default image path
											}}
										/>
									) : (
										<img
											className={styles.userProfilePostsPic}
											src='/Img/defaultPostImage.jpg'
											alt={t('Світлина публікації')}
										/>
									)}
								</div>
								<div className={styles.userProfilePostsTextWrapper}>
									<h3 className={styles.userProfilePostsTitle}>
										{currentLanguage === 'en' ? post.title_en : post.title_uk}
									</h3>
									<div className={styles.userProfilePostsDescriptionWrapper}>
										<p className={styles.userProfilePostsDescription}>
											{currentLanguage === 'en'
												? post.content_en.substring(0, 100)
												: post.content_uk.substring(0, 100)}
											...
										</p>
									</div>
									<div className={styles.userProfilePostsClockAndDateWrapper}>
										<img
											className={styles.userProfilePostsClock}
											src='/Img/clock.svg'
											alt={t('Дата')}
										/>
										<p className={styles.userProfilePostsDate}>
											{new Date(post.createdAt).toLocaleDateString()}
										</p>
										<button
											className={styles.userProfilePostsButton}
											onClick={() => navigate(`/posts/${post.id}`)} // Navigate to post detail page
										>
											{t('До публікації')}&#8194;&#187;
										</button>
									</div>
									<div className={styles.userProfileDelEditWrapper}>
										<button
											className={styles.userProfileEditButton}
											onClick={() => openEditModal(post)}
										>
											{t('Редагувати')}
										</button>
										<button
											className={styles.userProfileDeleteButton}
											onClick={() => handleDeletePost(post.id)}
										>
											{t('Видалити')}
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
			{/* Modal Window */}
			{isModalOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<button
							type='button'
							className={styles.modalCancelButton}
							onClick={closeEditModal}
						>
							<span className={styles.close}>&times;</span>
						</button>
						<div className={styles.modalTitleAndCloseButtonWrapper}>
							<h2 className={styles.modalTitle}>
								{t('Редагування публікації')}
							</h2>
						</div>
						{message && <p className={styles.message}>{message}</p>}
						{formErrors.form && (
							<p className={styles.error}>{formErrors.form}</p>
						)}
						<form onSubmit={handleEditSubmit} className={styles.modalForm}>
							<div className={styles.modalFormWrapper}>
								<div className={styles.modalFieldUk}>
									<div className={styles.modalField}>
										<label className={styles.modalLabel}>
											{t('Назва публікації українською')}
											<input
												type='text'
												name='title_uk'
												value={formData.title_uk}
												onChange={handleChange}
												maxLength='50'
												className={styles.modalInput}
												// placeholder='Наприклад: Моя перша публікація'
												required
											/>
										</label>
										<div className={styles.remainingCharsWrapper}>
											<small className={styles.remainingChars}>
												{remainingTitle} {t('символів залишилось')}
											</small>
										</div>
									</div>
									<div className={styles.modalField}>
										<label className={styles.modalLabel}>
											{t('Опис публікації українською')}
											<textarea
												name='content_uk'
												value={formData.content_uk}
												onChange={handleChange}
												className={styles.modalTextarea}
												// placeholder='Введіть детальний опис публікації'
												required
											/>
										</label>
									</div>
								</div>

								<div className={styles.modalFieldEn}>
									<div className={styles.modalField}>
										<label className={styles.modalLabel}>
											{t('Назва публікації англійською')}
											<input
												type='text'
												name='title_en'
												value={formData.title_en}
												onChange={handleChange}
												maxLength='50'
												className={styles.modalInput}
												// placeholder='Title'
												required
											/>
										</label>
										<div className={styles.remainingCharsWrapper}>
											<small className={styles.remainingChars}>
												{remainingTitle} {t('символів залишилось')}
											</small>
										</div>
									</div>
									<div className={styles.modalField}>
										<label className={styles.modalLabel}>
											{t('Опис публікації англійською')}
											<textarea
												name='content_en'
												value={formData.content_en}
												onChange={handleChange}
												className={styles.modalTextarea}
												// placeholder='Description'
												required
											/>
										</label>
									</div>
								</div>
							</div>
							<div className={styles.modalFieldImageUploadWrapper}>
								<div className={styles.modalFieldImage}>
									<label className={styles.modalLabelUploadContainer}>
										{t('Змінити зображення (опційно):')}
										<input
											type='file'
											name='images'
											accept='image/*'
											onChange={handleChange}
											className={styles.modalInputImageField}
										/>
									</label>
									{editingPost.images && !(formData.images instanceof File) && (
										<img
											src={editingPost.images}
											alt={t('Поточне зображення')}
											className={styles.currentImage}
										/>
									)}
								</div>
							</div>
							<div className={styles.modalButtons}>
								<button type='submit' className={styles.modalSaveButton}>
									{t('Зберегти')}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserProfilePosts
