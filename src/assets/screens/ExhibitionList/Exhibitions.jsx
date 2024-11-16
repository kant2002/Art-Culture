import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/Context/AuthContext'
import styles from '/src/styles/screen/ExhibitionList/Exhibitions.module.scss'
import API from '/src/utils/api.js'

function MuseumExhibitions() {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const [serverMessage, setServerMessage] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [exhibitions, setExhibitions] = useState([])
	const [loading, setLoading] = useState(true)
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedExhibitionImages, setSelectedExhibitionImages] = useState([])
	const [editingExhibition, setEditingExhibition] = useState(null)
	const [formData, setFormData] = useState({
		title_en: '',
		description_en: '',
		location_en: '',
		title_uk: '',
		description_uk: '',
		location_uk: '',
		startDate: '',
		endDate: '',
		time: '',
		artists: null,
		images: null,
	})
	const [message, setMessage] = useState('')
	const [formErrors, setFormErrors] = useState({})
	const [remainingTitle, setRemainingTitle] = useState(500)
	const [remainingDescription, setRemainingDescription] = useState(5000)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchExhibitions = async () => {
			try {
				const response = await API.get('/exhibitions/my-exhibitions', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					params: {
						page,
						limit: 10,
					},
				})
				setExhibitions(response.data.exhibitions)
				setTotalPages(response.data.totalPages)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching exhibitions:', error)
				setError('Failed to load exhibitions.')
				setLoading(false)
			}
		}

		fetchExhibitions()
	}, [page])

	if (loading) {
		return <div>Loading exhibitions...</div>
	}

	if (error) {
		return <div>{error}</div>
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

	const handleExhibitionImageClick = images => {
		setSelectedExhibitionImages(images)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedExhibitionImages([])
	}

	const openEditModal = exhibition => {
		setEditingExhibition(exhibition)
		setFormData({
			title_en: exhibition.title_en || '',
			description_en: exhibition.description_en || '',
			location_en: exhibition.location_en || '',
			title_uk: exhibition.title_uk || '',
			description_uk: exhibition.description_uk || '',
			location_uk: exhibition.location_uk || '',
			images: exhibition.images || null,
		})
		setRemainingTitle(
			500 - exhibition.title_en.length || exhibition.title_uk.length
		)
		setRemainingDescription(
			5000 - exhibition.description_en.length ||
				exhibition.description_uk.length
		)
		setIsModalOpen(true)
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setEditingExhibition(null)
		setFormErrors({})
		setMessage('')
	}

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images' || name === 'exhibitionsImages') {
			setFormData({ ...formData, images: files })
		} else {
			setFormData({ ...formData, [name]: value })

			if (name === 'title_uk' || name === 'title_uk') {
				setRemainingTitle(500 - value.length)
			}

			if (name === 'description_en' || name === 'description_uk') {
				setRemainingDescription(5000 - value.length)
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
			!formData.description_en ||
			!formData.location_en ||
			!formData.title_uk ||
			!formData.description_uk ||
			!formData.location_uk
		) {
			setFormErrors({ form: 'Потрібно заповнити поля' })
			return
		}

		try {
			const exhibitionData = new FormData()
			exhibitionData.append('title_en', formData.title_en)
			exhibitionData.append('description_en', formData.description_en)
			exhibitionData.append('title_uk', formData.title_uk)
			exhibitionData.append('description_uk', formData.description_uk)
			exhibitionData.append('specs_en', formData.specs_en)
			exhibitionData.append('specs_uk', formData.specs_uk)
			if (formData.images && formData.images.length > 0) {
				for (let i = 0; i < formData.images.length; i++) {
					exhibitionData.append('exhibitionsImages', formData.images[i])
				}
			}
			const response = await API.put(
				`/exhibitions/${editingExhibition.id}`,
				exhibitionData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			if (response.status === 200) {
				setMessage('Публікація оновлено')

				setExhibitions(prevExhibitions =>
					prevExhibitions.map(exhibition =>
						exhibition.id === editingExhibition.id ? response.data : exhibition
					)
				)
				closeEditModal()
			}
		} catch (error) {
			console.error('Error updating exhibition:', error)
			setMessage(
				error.response?.data?.error || 'Помилка при оновленні публікації'
			)
		}
	}

	const handleDeleteExhibition = async exhibitionId => {
		if (window.confirm(t('Ви впевнені, що хочете видалити цю публікацію?'))) {
			try {
				const response = await API.delete(`/exhibitions/${exhibitionId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				if (response.status === 200) {
					setExhibitions(
						exhibitions.filter(exhibition => exhibition.id !== exhibitionId)
					)
				}
			} catch (err) {
				console.error('Error deleting exhibition:', err)
				setError('Помилка при видаленні публікації')
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
				<button className={styles.profileAction} onClick={handlePostsClick}>
					{t('Публікації')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
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
				<button
					className={styles.profileAction}
					onClick={handleExhibitionCardCreateClick}
				>
					{t('Додати виставку ')}
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
			<div className={styles.exhibitionsContainer}>
				<h2>
					{t('Ваші виставки:')}
					{/*  TODO: Need translate  */}
				</h2>
				{exhibitions.length === 0 ? (
					<p>{t('Ви не створили жодної виставки')}</p>
				) : (
					<div className={styles.exhibitionList}>
						{exhibitions.map(exhibition => {
							const title =
								currentLanguage === 'en'
									? exhibition.title_en || exhibition.title_uk
									: exhibition.title_uk || exhibition.title_en

							const description =
								currentLanguage === 'en'
									? exhibition.description_en || exhibition.description_uk
									: exhibition.description_uk || exhibition.description_en

							const location =
								currentLanguage === 'en'
									? exhibition.location_en || exhibition.location_uk
									: exhibition.location_uk || exhibition.location_en

							const artistNames =
								exhibition.exhibitionArtists &&
								exhibition.exhibitionArtists.length > 0
									? exhibition.exhibitionArtists
											.map(ea => {
												const artist = ea.artist
												return artist.name || artist.title || artist.email
											})
											.join(',')
									: t('Немає митців')
							return (
								<div key={exhibition.id} className={styles.exhibitionCard}>
									<h3>
										{/*  TODO: Need translate  */}
										{t('Назва:')}
										{title}
									</h3>
									{/*  TODO: Need translate  */}
									<p>
										{t('Опис:')}
										{description}
									</p>
									<p>
										{/*  TODO: Need translate  */}
										{t('Дата виставки:')}{' '}
										{new Date(exhibition.startDate).toLocaleDateString()} -{' '}
										{new Date(exhibition.endDate).toLocaleDateString()}
									</p>
									<p>
										{/*  TODO: Need translate  */}
										{t('Місце проведення:')} {location}
									</p>

									<p>
										{/*  TODO: Need translate  */}
										{t('Час виставки:')} {exhibition.time}
									</p>
									<p>
										{/*  TODO: Need translate  */}
										{t('Митці:')} {artistNames}
									</p>
									{console.log('type data artists:', artistNames)}
									{/* Display images if available */}
									{exhibition.images && exhibition.images.length > 0 && (
										<div className={styles.imagesContainer}>
											{exhibition.images.map(image => (
												<img
													key={image.id}
													src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
													alt={title}
													className={styles.exhibitionImage}
													loading='lazy'
												/>
											))}
										</div>
									)}
									<div className={styles.exhibitionDelEditWrapper}>
										<button
											className={styles.exhibitionEditButton}
											onClick={() => openEditModal(exhibition)}
										>
											{t('Редагувати')}
										</button>
										<button
											className={styles.exhibitionDeleteButton}
											onClick={() => handleDeleteExhibition(exhibition.id)}
										>
											{t('Видалити')}
										</button>
									</div>
								</div>
							)
						})}
					</div>
				)}
				<div className={styles.pagination}>
					<button
						onClick={() => setPage(prev => Math.max(prev - 1, 1))}
						disabled={page === 1}
					>
						{t('Попередня')}
					</button>
					<span>
						{t('Сторінка')} {page} {t('з')} {totalPages}
					</span>
					<button
						onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
						disabled={page === totalPages}
					>
						{t('Наступна')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default MuseumExhibitions
