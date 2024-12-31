// src/assets/components/ExhibitionDetails.jsx
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '@styles/layout/MuseumPage.module.scss'
import API from '../../../utils/api.js'
import { getImageUrl } from '../../../utils/helper.js'
import Map from '@components/Blocks/Maps'
import ExhibitionPageMasonryGallery from '@components/Sliders/ExhibitionPageSlider/ExhibitionPageMasonryGallery'
import ExhibitionPageNewsPopularExhibition from '@components/Sliders/ExhibitionPageSlider/ExhibitionPageNewsPopularExhibition'

function ExhibitionDetails() {
	const { t, i18n } = useTranslation()
	const { id } = useParams() // Get exhibition ID from URL

	const [exhibition, setExhibition] = useState(null)
	const [museum, setMuseum] = useState(null) // <--- New state
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const currentLanguage = i18n.language
	const navigate = useNavigate()
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		// 1) Fetch the exhibition
		const fetchExhibition = async () => {
			try {
				const response = await API.get(`/exhibitions/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				console.log('Fetched Exhibition Data:', response.data)
				const fetchedExhibition = response.data

				setExhibition(fetchedExhibition)

				// 2) If we have a museum ID, fetch the museum
				// Depending on your backend, you might have "createdById" or "createdBy.id"
				if (fetchedExhibition?.createdById) {
					const museumResponse = await API.get(
						`/users/museums/${fetchedExhibition.createdById}`,
					)
					console.log('Fetched Museum Data:', museumResponse.data)
					setMuseum(museumResponse.data.museum) // or .data if shaped differently
				}

				setLoading(false)
			} catch (err) {
				console.error('Error fetching exhibition:', err)
				setError(t('Не вдалося завантажити деталі виставки.'))
				setLoading(false)
			}
		}

		fetchExhibition()
	}, [id, t])

	// --------------------------------------------------
	// Handle loading/error states
	// --------------------------------------------------
	if (loading) {
		return <div>{t('Loading exhibition details...')}</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!exhibition) {
		return <div>{t('No exhibition found.')}</div>
	}

	// --------------------------------------------------
	// Destructure exhibition data
	// --------------------------------------------------
	const {
		id: exhibitionId,
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

	// --------------------------------------------------
	// Optional: handle museum logo / data if museum is fetched
	// --------------------------------------------------
	let museumLogoUrl = '/Img/logoMuseum_3.png'
	if (museum?.museum_logo_image?.imageUrl) {
		museumLogoUrl = getImageUrl(
			museum.museum_logo_image.imageUrl,
			'/Img/logoMuseum_3.png',
		)
	}

	// Example: museum title or address if you want to display
	const museumTitle = museum?.title

	const handleExhibitionPageClick = () => {
		navigate('/ExhibitionsPage')
	}
	const toggleText = () => {
		setIsExpanded((prevState) => !prevState)
	}

	return (
		<div className={styles.museumPage}>
			<div className={`${styles.museumPageNavigationContainer}`}>
				<nav className={`${styles.museumPageNavigation}`}>
					<ul className={`${styles.museumPageNavigationList}`}>
						<li
							className={`${styles.museumPageNavigationItem}`}
							onClick={handleExhibitionPageClick}
						>
							{t('Виставки')}
						</li>
						<p
							className={`${styles.museumPageNavigationItemSeparator}`}
						>
							&#8250;
						</p>
						<li className={`${styles.museumPageNavigationItem}`}>
							{currentLanguage === 'en'
								? title_en || title_uk
								: title_uk || title_en}
						</li>
					</ul>
				</nav>
			</div>

			<div className={styles.exhibitionDetailsWrapper}>
				{/* <div className={styles.exhibitionHeadTitleWrapper}>
					<h2>{t('Деталі виставки')}</h2>
				</div> */}
				<div className={`${styles.museumPageAboutMuseumContainer}`}>
					{images && images.length > 0 ? (
						<div className={styles.museumPageMuseumPhotoWrapper}>
							{images.map((image) => (
								<img
									key={image.id}
									src={getImageUrl(
										image.imageUrl,
										'/Img/halfNewsCard.jpg',
									)}
									alt={title_en || title_uk || 'Exhibition Image'}
									className={styles.museumPageMuseumPhoto}
									loading="lazy"
								/>
							))}
						</div>
					) : (
						<div className={styles.noImages}>
							{t('No images available')}
						</div>
					)}
					<div className={`${styles.museumPageTopAdressWrapper}`}>
						<div className={`${styles.textWrapper}`}>
							<p className={styles.infoTextDescription}>{t('Назва виставки')}&#32;&#58;</p>
							<p className={styles.museumPageMuseumTitle}>
								{currentLanguage === 'en'
									? title_en || title_uk
									: title_uk || title_en}
							</p>
						</div>

						<div className={styles.textWrapper}>
							<p className={styles.infoTextDescription}>{t('Опис виставки')}&#58;</p>
							<p className={styles.infoText}>
								{currentLanguage === 'en'
									? description_en || description_uk
									: description_uk || description_en}
							</p>
						</div>

						<div className={styles.textWrapper}>
							<p className={styles.infoTextDescription}>{t('Митці')}&#58;</p>
							<p className={styles.infoText}>{artistNames}</p>
						</div>

						<div className={styles.textWrapper}>
							<p className={styles.infoTextDescription}>{t('Дата проведення')}&#58;</p>
							<p className={styles.infoText}>
								{new Date(startDate).toLocaleDateString()} -{' '}
								{new Date(endDate).toLocaleDateString()}
							</p>
						</div>

						<div className={styles.textWrapper}>
							<p className={styles.infoTextDescription}>{t('Час проведення виставки')}&#58;</p>
							<p className={styles.infoText}>
								{time} - {endTime}
							</p>
						</div>

						<div className={styles.textWrapper}>
							<p className={styles.infoTextDescription}>{t('Місце проведення')}&#58;</p>
							<p className={styles.infoText}>
								{address || t('Немає даних')}
							</p>
						</div>
					</div>

					<div className={`${styles.museumPageMuseumTopLogoWhithAdressWrapper}`}>
						<div className={`${styles.museumPageMuseumLogoWrapper}`}>
							{museum && (
								<img
									className={`${styles.museumPageMuseumLogo}`}
									src={museumLogoUrl}
									alt={museumTitle}
									onError={(e) => {
										e.target.onerror = null
										e.target.src = '/Img/newsCardERROR.jpg'
									}}
								/>
							)}
						</div>

						<div className={`${styles.museumPageMuseumTitleWrapper}`}>
							<p className={`${styles.museumPageMuseumTitle}`}>
								{museum.title}
							</p>
						</div>

						<div className={`${styles.museumPageMuseumBottomLocationWrapper}`}>
							<p className={`${styles.museumPageMuseumLocationCity}`}>
								{museum.country} {''}
								{museum.city}
							</p>

							<div className={`${styles.museumPageMuseumDescriptionWrapper} ${isExpanded ? styles.expanded : ''}`}>
								<p className={`${styles.museumPageMuseumDescription}`}>
									{museum.bio}
								</p>
							</div>
						</div>
					</div>
				</div>

				<ExhibitionPageNewsPopularExhibition />

				<ExhibitionPageMasonryGallery />

				<div className={styles.mapContainer}>
					<Map
						exhibitions={[
							{
								id: exhibitionId,
								title_en,
								title_uk,
								address,
								latitude,
								longitude,
							},
						]}
					/>
				</div>

				<div className={`${styles.museumPageMuseumBottomLogoWhithAdressWrapper}`}>
					<div className={`${styles.museumPageищеещьAdressWrapper}`}>
						<div className={`${styles.museumPageMuseumLogoWrapper}`}>
							{museum && (
								<img
									className={`${styles.museumPageMuseumLogo}`}
									src={museumLogoUrl}
									alt={museumTitle}
									onError={(e) => {
										e.target.onerror = null
										e.target.src = '/Img/newsCardERROR.jpg'
									}}
								/>
							)}
						</div>

						<div className={`${styles.museumPageMuseumTitleWrapper}`}>
							<p className={`${styles.museumPageMuseumTitle}`}>
								{museum.title}
							</p>
						</div>

						<div className={`${styles.museumPageMuseumBottomLocationWrapper}`}>
							<p className={`${styles.museumPageMuseumLocationStreet}`}>
								{museum.street} {','} {museum.house_number}
							</p>
							<p className={`${styles.museumPageMuseumLocationCity}`}>
								{museum.city}
							</p>
							<p className={`${styles.museumPageMuseumLocationCountry}`}>
								{museum.country}
							</p>
							<p className={`${styles.museumPageMuseumLocationIndex}`}>
								{museum.postcode}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExhibitionDetails
