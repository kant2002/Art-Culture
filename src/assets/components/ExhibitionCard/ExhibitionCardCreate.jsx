// src/components/ExhibitionForm/ExhibitionForm.jsx

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import API from '../../../utils/api'
import styles from '/src/styles/components/ExhibitionCard/ExhibitionCardCreate.module.scss'

function ExhibitionForm() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [time, setTime] = useState('')
	const [location, setLocation] = useState('')
	const [artists, setArtists] = useState([]) // All available artists
	const [selectedArtistIds, setSelectedArtistIds] = useState([])
	const [images, setImages] = useState([]) // For storing selected images
	const [errors, setErrors] = useState([])
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { user, logout } = useAuth()
	console.log('CurrentUser:', user)

	useEffect(() => {
		// Fetch artists to populate the dropdown
		axios
			.get('/api/users/creators', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(response => {
				console.log('Artists data:', response.data.creators)
				setArtists(response.data.creators)
			})
			.catch(error => {
				console.error('Error fetching artists:', error)
				setErrors(prevErrors => [...prevErrors, 'Failed to load artists.'])
				setArtists([])
			})
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()

		// Form validation
		if (
			!title ||
			!description ||
			!startDate ||
			!endDate ||
			!time ||
			!location
		) {
			setErrors(['All fields are required.'])
			return
		}

		if (selectedArtistIds.length === 0) {
			setErrors(['Please select at least one artist.'])
			return
		}

		// Prepare form data
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('startDate', startDate)
		formData.append('endDate', endDate)
		formData.append('time', time)
		formData.append('location', location)

		// Append selected artists
		selectedArtistIds.forEach(artistId => {
			formData.append('artistIds', artistId)
		})

		// Append images
		images.forEach(image => {
			formData.append('exhibitionImages', image)
		})

		try {
			const response = await API.post('/exhibitions', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					// Include authorization header if needed
				},
			})
			console.log('Exhibition created:', response.data)
			// Redirect to the exhibition details page or reset the form
			navigate(`/Exhibitions/${response.data.exhibition.id}`)
		} catch (error) {
			console.error('Error creating exhibition:', error.response.data)
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
		}
	}

	const handleArtistSelection = e => {
		const options = e.target.options
		const selectedIds = []
		for (const option of options) {
			if (option.selected) {
				selectedIds.push(parseInt(option.value))
			}
		}
		console.log('Selected Artist IDs:', selectedIds)
		setSelectedArtistIds(selectedIds)
	}

	const handleImageChange = e => {
		setImages([...e.target.files])
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
				<form
					onSubmit={handleSubmit}
					encType='multipart/form-data'
					className={styles.exhibitionForm}
				>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>{t('Назва виставки')}</label>
						<input
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							required
							className={styles.formInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Description:</label>
						<textarea
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
							className={styles.formTextarea}
						></textarea>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Start Date:</label>
						<input
							type='date'
							value={startDate}
							onChange={e => setStartDate(e.target.value)}
							required
							className={styles.formInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>End Date:</label>
						<input
							type='date'
							value={endDate}
							onChange={e => setEndDate(e.target.value)}
							required
							className={styles.formInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Time:</label>
						<input
							type='text'
							value={time}
							onChange={e => setTime(e.target.value)}
							required
							className={styles.formInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Location:</label>
						<input
							type='text'
							value={location}
							onChange={e => setLocation(e.target.value)}
							required
							className={styles.formInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Artists:</label>
						<select
							multiple
							value={selectedArtistIds}
							onChange={handleArtistSelection}
							required
							className={styles.formSelect}
						>
							{artists.map(artist => (
								// < className={styles.artistOption}>
								<option key={artist.id} value={String(artist.id)}>
									{artist.name || artist.title || artist.email}
								</option>
							))}
						</select>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Images:</label>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageChange}
							className={styles.formFileInput}
						/>
					</div>
					<button type='submit' className={styles.submitButton}>
						Create Exhibition
					</button>
				</form>
			</div>
		</div>
	)
}

export default ExhibitionForm
