import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from '../../../styles/components/ExhibitionCard/ExhibitionCardCreate.module.scss'
import API from '../../../utils/api'

function ExhibitionForm() {
	const [formData, setFormData] = useState({
		title_en: '',
		title_uk: '',
		description_en: '',
		description_uk: '',
		startDate: '',
		endDate: '',
		time: '',
		location_en: '',
		location_uk: '',
		artists: [],
		images: [],
	})
	const [artists, setArtists] = useState([]) // All available artists
	const [errors, setErrors] = useState([])
	const [serverMessage, setServerMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [selectedAuthors, setSelectedAuthors] = useState([])
	const [selectedPaintings, setSelectedPaintings] = useState([])
	const [selectedAuthorPaintings, setSelectedAuthorPaintings] = useState({})

	const navigate = useNavigate()
	const { t } = useTranslation()
	const { user, logout } = useAuth()
	const isUser = user && user.role === 'USER'
	const isCreator = user && user.role === 'CREATOR'
	const isMuseum = user && user.role === 'MUSEUM'
	const isAdmin = user && user.role === 'ADMIN'

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalData, setModalData] = useState({
		authorId: null,
		paintings: [],
		selectedPaintings: [],
	})

	console.log('CurrentUser:', user)

	useEffect(() => {
		// Fetch artists to populate the checkboxes
		const fetchArtists = async () => {
			try {
				const response = await axios.get('/api/users/creators', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				console.log('Artists data:', response.data.creators)
				setArtists(response.data.creators)
			} catch (error) {
				console.error('Error fetching artists:', error)
				setErrors(prevErrors => [...prevErrors, 'Failed to load artists.'])
				setArtists([])
			}
		}

		fetchArtists()
	}, [])

	const handleSearchChange = async e => {
		const query = e.target.value
		setSearchQuery(query)

		if (query.length > 2) {
			const [authorsResponse, paintingsResponse] = await Promise.all([
				API.get(`/search/authors?q=${query}`),
				API.get(`/search/paintings?q=${query}`),
			])
			setSearchResults([
				...authorsResponse.data.authors.map(authors => ({
					...authors,
					type: 'author',
				})),
				...paintingsResponse.data.paintings.map(painting => ({
					...painting,
					type: 'painting',
				})),
			])
		} else {
			setSearchResults([])
		}
	}

	const handleSelectedResult = result => {
		if (result.type === 'author') {
			if (!selectedAuthors.find(author => author.id === result.id)) {
				setSelectedAuthors([...selectedAuthors, result])
			}
		} else if (result.type === 'painting') {
			if (!selectedPaintings.find(painting => painting.id === result.id)) {
				setSelectedPaintings([...selectedPaintings, result])
			}
		}
		setSearchQuery('')
		setSearchResults([])
	}

	const handleSelectAuthorPaintings = async authorId => {
		try {
			// Fetch paintings by the author
			const response = await API.get(`/products/author/${authorId}`)
			const paintings = response.data.products

			setModalData({
				authorId,
				paintings,
				selectedPaintings: selectedAuthorPaintings[authorId] || [],
			})
			setIsModalOpen(true)
		} catch (error) {
			console.error('Error fetching author paintings:', error)
		}
	}

	const handleTogglePaintingSelection = painting => {
		setModalData(prevData => {
			const isSelected = prevData.selectedPaintings.find(
				p => p.id === painting.id
			)
			if (isSelected) {
				return {
					...prevData,
					selectedPaintings: prevData.selectedPaintings.filter(
						p => p.id !== painting.id
					),
				}
			} else {
				return {
					...prevData,
					selectedPaintings: [...prevData.selectedPaintings, painting],
				}
			}
		})
	}

	const handleSaveSelectedPaintings = () => {
		setSelectedAuthorPaintings(prevState => ({
			...prevState,
			[modalData.authorId]: modalData.selectedPaintings,
		}))
		setIsModalOpen(false)
	}

	const handleInputChange = useCallback(e => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}, [])

	const handleArtistSelection = useCallback(e => {
		const artistId = parseInt(e.target.value, 10)
		if (e.target.checked) {
			setFormData(prevState => ({
				...prevState,
				artists: [...prevState.artists, artistId],
			}))
		} else {
			setFormData(prevState => ({
				...prevState,
				artists: prevState.artists.filter(id => id !== artistId),
			}))
		}
	}, [])

	const handleRemoveAuthor = authorId => {
		setSelectedAuthors(prevAuthors =>
			prevAuthors.filter(author => author.id !== authorId)
		)
		setSelectedAuthorPaintings(prevState => {
			const newState = { ...prevState }
			delete newState[authorId]
			return newState
		})
	}

	const handleRemovePainting = (authorId, paintingId) => {
		if (authorId) {
			// Remove painting from author's selected paintings
			setSelectedAuthorPaintings(prevState => ({
				...prevState,
				[authorId]: prevState[authorId].filter(p => p.id !== paintingId),
			}))
		} else {
			// Remove painting from selectedPaintings
			setSelectedPaintings(prevPaintings =>
				prevPaintings.filter(p => p.id !== paintingId)
			)
		}
	}

	const handleImageChange = useCallback(e => {
		setFormData(prevState => ({
			...prevState,
			images: [...e.target.files],
		}))
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setErrors([])
		setServerMessage('')
		setIsSubmitting(true)

		// Prepare artistIds and paintingIds
		const artistIds = selectedAuthors.map(author => author.id)
		const paintingIds = [
			...selectedPaintings.map(p => p.id),
			...Object.values(selectedAuthorPaintings)
				.flat()
				.map(p => p.id),
		]

		const paintingAuthorIds = selectedPaintings
			.map(p => p.author.id)
			.filter(authorId => !artistIds.includes(authorId))

		// Combine all artist IDs, ensuring uniqueness
		const allArtistIds = [...new Set([...artistIds, ...paintingAuthorIds])]

		// Update form validation
		if (allArtistIds.length === 0) {
			setErrors(['Please select at least one artist.'])
			setIsSubmitting(false)
			return
		}

		// Destructure formData for easier access
		const {
			title_en,
			title_uk,
			description_en,
			description_uk,
			startDate,
			endDate,
			time,
			location_en,
			location_uk,
			artists: selectedArtists,
			images,
		} = formData

		// Form validation
		if (
			!title_en ||
			!title_uk ||
			!description_en ||
			!description_uk ||
			!startDate ||
			!endDate ||
			!time ||
			!location_en ||
			!location_uk
		) {
			setErrors(['All fields are required.'])
			setIsSubmitting(false)
			return
		}

		// Prepare form data
		const submissionData = new FormData()

		// Append multilingual title
		submissionData.append('title_en', title_en)
		submissionData.append('title_uk', title_uk)

		// Append multilingual description
		submissionData.append('description_en', description_en)
		submissionData.append('description_uk', description_uk)

		// Append multilingual location
		submissionData.append('location_en', location_en)
		submissionData.append('location_uk', location_uk)

		// Append dates and time
		submissionData.append('startDate', startDate)
		submissionData.append('endDate', endDate)
		submissionData.append('time', time)

		// Append selected artists
		selectedArtists.forEach(artistId => {
			submissionData.append('artistIds', artistId)
		})

		// Append images
		images.forEach(image => {
			submissionData.append('exhibitionImages', image)
		})

		// Append selected artists
		artistIds.forEach(artistId => {
			submissionData.append('artistIds', artistId)
		})

		// Append selected artists
		allArtistIds.forEach(artistId => {
			submissionData.append('artistIds', artistId)
		})

		// Append selected paintings
		paintingIds.forEach(paintingId => {
			submissionData.append('paintingIds', paintingId)
		})

		// Debug: Log FormData entries
		for (let pair of submissionData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`)
		}

		try {
			const response = await API.post('/exhibitions', submissionData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			console.log('Exhibition created:', response.data)
			setServerMessage('Exhibition created successfully!')
			// Redirect to the exhibition details page
			navigate(`/Exhibitions/${response.data.exhibition.id}`)
		} catch (error) {
			console.error('Error creating exhibition:', error.response)
			if (error.response && error.response.data && error.response.data.errors) {
				setErrors(error.response.data.errors.map(err => err.msg))
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setErrors([error.response.data.message])
			} else {
				setErrors(['An error occurred while creating the exhibition.'])
			}
		} finally {
			setIsSubmitting(false)
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

	const getImageUrl = path => {
		// Remove any leading '../' or './' from the path
		const normalizedPath = path.startsWith('/') ? path : `/${path}`
		return `${process.env.REACT_APP_BASE_URL}${normalizedPath}`
	}

	const defaultAuthorImageUrl = '/Img/ArtistPhoto.jpg'
	const defaultPaintingImageUrl = '/Img/ArtistPhoto.jpg'

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

			<div className={styles.exhibitionFormContainer}>
				<h2 className={styles.formTitle}>{t('Створити виставку')}</h2>
				{errors.length > 0 && (
					<div className={styles.errorMessages}>
						<ul className={styles.errorList}>
							{errors.map((err, index) => (
								<li key={index} className={styles.errorItem}>
									{err}
								</li>
							))}
						</ul>
					</div>
				)}
				{serverMessage && (
					<div className={styles.successMessage}>{serverMessage}</div>
				)}
				<form
					onSubmit={handleSubmit}
					encType='multipart/form-data'
					className={styles.exhibitionForm}
				>
					<div className={styles.modalTextWrapper}>
						<div className={styles.modalFieldUk}>
							{/* Title in Ukrainian */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Назва виставки українською')}
								</label>
								<input
									type='text'
									name='title_uk'
									value={formData.title_uk}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Description in Ukrainian */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Опис виставки українською')}
								</label>
								<textarea
									name='description_uk'
									value={formData.description_uk}
									onChange={handleInputChange}
									required
									className={styles.formTextarea}
								></textarea>
							</div>

							{/* Location in Ukrainian */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Місце проведення українською')}
								</label>
								<input
									type='text'
									name='location_uk'
									value={formData.location_uk}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Start Date */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Дата початку')}</label>
								<input
									type='date'
									name='startDate'
									value={formData.startDate}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Start time */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Час початку')}</label>
								<input
									type='text'
									name='time'
									value={formData.time}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>
						</div>

						<div className={styles.modalFieldEn}>
							{/* Title in English */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Назва виставки англійською')}
								</label>
								<input
									type='text'
									name='title_en'
									value={formData.title_en}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Description in English */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Опис виставки англійською')}
								</label>
								<textarea
									name='description_en'
									value={formData.description_en}
									onChange={handleInputChange}
									required
									className={styles.formTextarea}
								></textarea>
							</div>

							{/* Location in English */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Місце проведення англійською')}
								</label>
								<input
									type='text'
									name='location_en'
									value={formData.location_en}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>
							{/* End Date */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Дата завершення')}
								</label>
								<input
									type='date'
									name='endDate'
									value={formData.endDate}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* End time */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Час завершення')}
								</label>
								<input
									type='text'
									name='time'
									value={formData.time}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>
						</div>
					</div>

					{/* Search input */}
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>{t('Пошук')}</label>
						<input
							type='text'
							name='search'
							value={searchQuery}
							onChange={handleSearchChange}
							placeholder={t("Введіть ім'я митця або картини")}
							className={styles.formInput}
						/>
						{searchResults.length > 0 && (
							<div className={styles.searchResults}>
								{searchResults.map(result => (
									<div
										key={`${result.type}-${result.id}`}
										className={styles.searchResultItem}
										onClick={() => handleSelectedResult(result)}
									>
										{result.type === 'author' ? (
											<>
												<div className={styles.resultAuthorWrapper}>
													{result.images ? (
														<img
															src={getImageUrl(result.images)}
															alt={result.title || result.email}
															className={styles.resultAuthorImage}
														/>
													) : (
														<img
															src={defaultAuthorImageUrl}
															alt='Default author'
															className={styles.resultImage}
														/>
													)}
													<p>{result.title || result.email}</p>
												</div>
											</>
										) : (
											<>
												<div className={styles.resultPaintingsWrapper}>
													{result.images && result.images.length > 0 ? (
														<img
															src={getImageUrl(result.images[0].imageUrl)}
															alt={result.title_en || result.title_uk}
															className={styles.resultPaintingsImage}
														/>
													) : (
														<img
															src={defaultPaintingImageUrl}
															alt='Default painting'
															className={styles.resultImage}
														/>
													)}
													<p>{result.title_en || result.title_uk}</p>
												</div>
											</>
										)}
									</div>
								))}
							</div>
						)}
					</div>
					{/* Selected items search */}
					<div className={styles.selectedObjectWrapper}>
						{selectedAuthors.map(author => (
							<div key={`author-${author.id}`} className={styles.chipContainer}>
								{author.images ? (
									<img
										src={getImageUrl(author.images)}
										alt={author.title || author.email}
										className={styles.chipImage}
									/>
								) : (
									<img
										src={defaultAuthorImageUrl}
										alt='Default author'
										className={styles.chipImage}
									/>
								)}
								<p>{author.title || author.email}</p>
								<button onClick={() => handleRemoveAuthor(author.id)}>×</button>
								<button onClick={() => handleSelectAuthorPaintings(author.id)}>
									{t('Обрати картини')}
								</button>
								{/* Render selected paintings for this author */}
								{selectedAuthorPaintings[author.id] && (
									<div className={styles.authorPaintings}>
										{selectedAuthorPaintings[author.id].map(painting => (
											<div
												key={`painting-${painting.id}`}
												className={styles.chip}
											>
												{painting.images && painting.images.length > 0 ? (
													<img
														src={getImageUrl(painting.images[0].imageUrl)}
														alt={painting.title_en || painting.title_uk}
														className={styles.chipImage}
													/>
												) : (
													<img
														src={defaultPaintingImageUrl}
														alt='Default painting'
														className={styles.chipImage}
													/>
												)}
												<span>{painting.title_en || painting.title_uk}</span>
												<button
													onClick={() =>
														handleRemovePainting(author.id, painting.id)
													}
												>
													×
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						))}
						{selectedPaintings.map(painting => (
							<div
								key={`painting-${painting.id}`}
								className={styles.chipContainer}
							>
								<div className={styles.paintingInfo}>
									{/* Painting Image */}
									{painting.images && painting.images.length > 0 ? (
										<img
											src={getImageUrl(painting.images[0].imageUrl)}
											alt={painting.title_en || painting.title_uk}
											className={styles.chipImage}
										/>
									) : (
										<img
											src={defaultPaintingImageUrl}
											alt='Default painting'
											className={styles.chipImage}
										/>
									)}
									{/* Painting Title */}
									<span>{painting.title_en || painting.title_uk}</span>
								</div>
								<div className={styles.authorInfo}>
									{/* Author Image */}
									{painting.author && painting.author.images ? (
										<img
											src={getImageUrl(painting.author.images)}
											alt={painting.author.title || painting.author.email}
											className={styles.chipImage}
										/>
									) : (
										<img
											src={defaultAuthorImageUrl}
											alt='Default author'
											className={styles.chipImage}
										/>
									)}
									{/* Author Name */}
									<span>{painting.author.title || painting.author.email}</span>
								</div>
								{/* Remove Button */}
								<button onClick={() => handleRemovePainting(null, painting.id)}>
									×
								</button>
							</div>
						))}
					</div>

					{/* Images */}
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>{t('Додати зображення')}</label>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageChange}
							className={styles.formFileInput}
						/>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className={styles.submitButton}
						disabled={isSubmitting}
					>
						{isSubmitting ? t('Створюється...') : t('Створити виставку')}
					</button>
				</form>
			</div>
			{isModalOpen && (
				<div
					className={styles.modalOverlay}
					onClick={() => setIsModalOpen(false)}
				>
					<div
						className={styles.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<button
							className={styles.closeButton}
							onClick={() => setIsModalOpen(false)}
						>
							&times;
						</button>
						<h2>{t('Обрати картини митця')}</h2>
						<div className={styles.paintingsList}>
							{modalData.paintings.map(painting => (
								<div key={painting.id} className={styles.paintingItem}>
									{painting.images && painting.images.length > 0 ? (
										<img
											src={getImageUrl(painting.images[0].imageUrl)}
											alt={painting.title_en || painting.title_uk}
											className={styles.paintingImage}
										/>
									) : (
										<img
											src={defaultPaintingImageUrl}
											alt='Default painting'
											className={styles.paintingImage}
										/>
									)}
									<span>{painting.title_en || painting.title_uk}</span>
									<input
										type='checkbox'
										checked={
											!!modalData.selectedPaintings.find(
												p => p.id === painting.id
											)
										}
										onChange={() => handleTogglePaintingSelection(painting)}
									/>
								</div>
							))}
						</div>
						<button onClick={handleSaveSelectedPaintings}>
							{t('Зберегти')}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default ExhibitionForm
