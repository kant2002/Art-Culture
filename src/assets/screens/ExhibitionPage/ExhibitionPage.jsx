// src/assets/components/ExhibitionDetails.jsx
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styles from '../../../styles/layout/ExhibitionPage.module.scss'
import API from '../../../utils/api.js'
import { getImageUrl } from '../../../utils/helper.js'
import Map from '../../components/Blocks/Maps'

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
				console.log('Fetched Exhibition Data:', response.data) // Debug log
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

	// Destructure exhibition data
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
		exhibitionArtists,
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
		<div className={styles.exhibitionDetailsContainer}>
			<div className={styles.exhibitionDetailsWrapper}>
				<div className={styles.exhibitionHeadTitleWrapper}>
					<h2>{t('Деталі виставки')}</h2>
				</div>
				{/* Exhibition Images */}
				{images && images.length > 0 ? (
					<div className={styles.exhibitionImageWrapper}>
						{images.map((image) => (
							<img
								key={image.id}
								src={getImageUrl(
									image.imageUrl,
									'/Img/halfNewsCard.jpg',
								)}
								alt={title_en || title_uk || 'Exhibition Image'}
								className={styles.exhibitionImage}
								loading="lazy"
							/>
						))}
					</div>
				) : (
					<div className={styles.noImages}>
						{t('No images available')}
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
							{address || t('Немає даних')}
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
		</div>
	)
}

export default ExhibitionDetails
