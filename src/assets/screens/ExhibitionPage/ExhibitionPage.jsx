// src/components/ExhibitionDetails.jsx
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Map from '/src/assets/components/Blocks/Maps'
import ProfilePageContainer from '/src/assets/components/Blocks/ProfilePageContainer'
import styles from '/src/styles/layout/ExhibitionPage.module.scss'
import API from '/src/utils/api.js'

function ExhibitionDetails() {
	const { t, i18n } = useTranslation()
	const { id } = useParams() // Get exhibition ID from URL
	const [exhibition, setExhibition] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const currentLanguage = i18n.language

	useEffect(() => {
		const fetchExhibition = async () => {
			try {
				const response = await API.get(`/exhibitions/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setExhibition(response.data)
				setLoading(false)
			} catch (err) {
				console.error('Error fetching exhibition:', err)
				setError('Failed to load exhibition details.')
				setLoading(false)
			}
		}

		fetchExhibition()
	}, [id])

	if (loading) {
		return <div>Loading exhibition details...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!exhibition) {
		return <div>No exhibition found.</div>
	}

	// Extract necessary data
	const {
		title_en,
		title_uk,
		description_en,
		description_uk,
		time,
		endTime,
		address,
		startDate,
		endDate,
		latitude,
		longitude,
		images,
		artists: [], // Assuming this is an array of artist objects
		// Add other fields if necessary
	} = exhibition

	// Prepare artist names
	const artistNames =
		exhibitionArtists && exhibitionArtists.length > 0
			? exhibitionArtists
					.map(
						(ea) =>
							ea.artist.name ||
							ea.artist.title ||
							ea.artist.email,
					)
					.join(', ')
			: t('Немає митців')

	return (
		<ProfilePageContainer>
			<h2>{t('Деталі виставки')}</h2>
			<div className={styles.exhibitionDetails}>
				{/* Exhibition Images */}
				{images && images.length > 0 && (
					<div className={styles.imagesContainer}>
						{images.map((image) => (
							<img
								key={image.id}
								src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
								alt={title_en || title_uk || 'Exhibition Image'}
								className={styles.exhibitionImage}
								loading="lazy"
							/>
						))}
					</div>
				)}

				{/* Exhibition Information */}
				<div className={styles.infoContainer}>
					<h3>
						{t('Назва виставки')}:
						<p className={styles.infoText}>
							{currentLanguage === 'en'
								? title_en || title_uk
								: title_uk || title_en}
						</p>
					</h3>

					<h4>
						{t('Опис виставки')}:
						<p className={styles.infoText}>
							{currentLanguage === 'en'
								? description_en || description_uk
								: description_uk || description_en}
						</p>
					</h4>

					<h4>
						{t('Митці')}:
						<p className={styles.infoText}>{artistNames}</p>
					</h4>

					<h4>
						{t('Дата проведення')}:
						<p className={styles.infoText}>
							{new Date(startDate).toLocaleDateString()} -{' '}
							{new Date(endDate).toLocaleDateString()}
						</p>
					</h4>

					<h4>
						{t('Час проведення виставки')}:
						<p className={styles.infoText}>
							{time} - {endTime}
						</p>
					</h4>

					<h4>
						{t('Місце проведення')}:
						<p className={styles.infoText}>
							{address || 'Немає даних'}
						</p>
					</h4>
				</div>

				{/* Map Rendering */}
				<div className={styles.mapContainer}>
					<Map
						exhibitions={[
							{
								id: exhibition.id,
								title_en,
								title_uk,
								address,
								latitude,
								longitude,
							},
						]}
					/>
				</div>
			</div>
		</ProfilePageContainer>
	)
}

export default ExhibitionDetails
