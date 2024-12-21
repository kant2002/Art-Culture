import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/MuseumsPage.module.scss'
import { getImageUrl } from '../../../utils/helper.js'
import MuseumsPageTopSlider from '../../components/Sliders/MuseumsPageSliders/MuseumsPageTopSlider.jsx'

function MuseumsPage() {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [museums, setMuseums] = useState([])

	const [visibleMuseumsCount, setVisibleMuseumsCount] = useState(
		getMuseumsCount(window.innerWidth),
	)

	function getMuseumsCount(width) {
		if (width === null || width === undefined) {
			throw new Error('Width must be a number')
		}
		if (width >= 1920) {
			return 16
		}
		if (width >= 1441 && width < 1920) {
			return 12
		}
		if (width > 570 && width < 1440) {
			return 8
		}
		if (width <= 569) {
			return 4
		}
	}

	useEffect(() => {
		const handleResize = () => {
			const newMuseumCount = getMuseumsCount(window.innerWidth)
			console.log(
				`Window width: ${window.innerWidth}, New museum count: ${newMuseumCount}`,
			)
			if (newMuseumCount !== visibleMuseumsCount) {
				setVisibleMuseumsCount(newMuseumCount)
				console.log(`Updated visibleMuseumsCount to: ${newMuseumCount}`)
			}
		}

		window.addEventListener('resize', handleResize)

		// Initial check
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [visibleMuseumsCount])

	useEffect(() => {
		const fetchMuseums = async () => {
			try {
				const response = await axios.get('/api/users/museums')
				console.log('Fetch museums', response.data)
				setMuseums(response.data.museums || [])
				setLoading(false)
			} catch (error) {
				console.error('Error fetching museum:', error)
				setError(t('Не вдалося завантажити.'))
				setLoading(false)
			}
		}
		fetchMuseums()
	}, [])

	const handleMuseumClick = (id) => {
		navigate(`/museumpage/${id}`)
	}
	return (
		<div className={`${styles.MuseumsPageContainer}`}>
			<div className={`${styles.MuseumsPageTitleContainer}`}>
				<div className={`${styles.MuseumsPageTitle}`}>{t('Музеї')}</div>
			</div>

			<MuseumsPageTopSlider />

			<div className={`${styles.ArtistsPageGalleryContainer}`}>
				<div className={`${styles.ArtistsPageGalleryTitleWrapper}`}>
					<h2 className={`${styles.ArtistsPageGalleryTitle}`}>
						{t('Перегляд.')} &#8243;{t('ВИСТАВКИ')}&#8243;
					</h2>
				</div>

				<div className={`${styles.ArtistsPageGalleryButtonsWrapper}`}>
					<button className={`${styles.ArtistsPageGalleryButton}`}>
						<h3
							className={`${styles.ArtistsPageGalleryButtonTitle}`}
						>
							{t('Усі')}
						</h3>
					</button>

					<p
						className={`${styles.ArtistsPageGalleryButtonSeparator}`}
					>
						|
					</p>

					<button className={`${styles.ArtistsPageGalleryButton}`}>
						<h3
							className={`${styles.ArtistsPageGalleryButtonTitle}`}
						>
							{t('А-Я')}
						</h3>
					</button>

					<p
						className={`${styles.ArtistsPageGalleryButtonSeparator}`}
					>
						|
					</p>

					<button
						className={`${styles.ArtistsPageGalleryButtonWhithClock}`}
					>
						<h3
							className={`${styles.ArtistsPageGalleryButtonTitle}`}
						>
							{t('Час')}
						</h3>

						<img
							className={`${styles.ArtistsPageGalleryButtonClock}`}
							src={'/Img/clock.svg'}
							alt="Слідкуйте за мистецтвом!"
							onError={(e) => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</button>
				</div>

				<div className={`${styles.ArtistsPageGalleryCardsWrapper}`}>
					{loading ? (
						<div className={styles.loading}>
							{t('Завантаження...')}
						</div>
					) : error ? (
						<div className={styles.error}>{error}</div>
					) : museums.length === 0 ? (
						<div className={styles.noCreators}>
							{t('Немає виставок для відображення.')}
						</div>
					) : (
						<div
							className={`${styles.ArtistsPageGalleryInnerWrapper}`}
						>
							{museums
								.slice(0, visibleMuseumsCount)
								.map((museum) => {
									const featuredMediaUrl = getImageUrl(
										museum.images,
										'/Img/ArtistPhoto.jpg',
									)

									return (
										<div
											key={museum.id}
											className={`${styles.ArtistsPageGalleryCardWrapper}`}
										>
											<div
												className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}
												onClick={() =>
													handleMuseumClick(museum.id)
												}
												style={{ cursor: 'pointer' }}
											>
												<img
													className={`${styles.ArtistsPageGalleryCardPicture}`}
													src={featuredMediaUrl}
													alt={`Фото митця ${museum.title}`}
													loading="lazy"
													onError={(e) => {
														e.target.onerror = null
														e.target.src =
															'/Img/ArtistPhoto.jpg'
													}}
												/>
											</div>
											<div
												className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}
											>
												<p
													className={`${styles.ArtistsPageGalleryCardDescription}`}
												>
													{museum.title}
												</p>
											</div>
										</div>
									)
								})}
						</div>
					)}
				</div>

				<div
					className={`${styles.ArtistsPageGalleryAllArtistsButtonWrapper}`}
				>
					<button
						className={`${styles.ArtistsPageGalleryAllArtistsButton}`}
					>
						<p
							className={`${styles.ArtistsPageGalleryAllArtistsButtonText}`}
						>
							{t('Всі музеї')}
						</p>
						<img
							className={`${styles.ArtistsPageGalleryAllArtistsButtonArrow}`}
							src={'/Img/buttonArrow.svg'}
							alt="Слідкуйте за мистецтвом!"
							onError={(e) => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default MuseumsPage
