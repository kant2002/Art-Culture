import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '@styles/layout/MuseumsPage.module.scss'
import { getImageUrl } from '../../../utils/helper.js'
import ExhibitionsMap from '@components/Blocks/ExhibitionsMap.jsx'
import TranslatedContent from '@components/Blocks/TranslatedContent.jsx'
import ExhibitionsPageNewsSlider from '@components/Sliders/ExhibitionsPageSlider/ExhibitionsPageNewsSlider.jsx'
import ExhibitionsPagePopularExhibitions from '@components/Sliders/ExhibitionsPageSlider/ExhibitionsPagePopularExhibitions.jsx'
import ExhibitionsPageTopSlider from '@components/Sliders/ExhibitionsPageSlider/ExhibitionsPageTopSlider.jsx'

function MuseumsPage() {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [museums, setMuseums] = useState([])
	const [exhibitions, setExhibitions] = useState([])

	const [visibleExhibitionsCount, setVisibleExhibitionsCount] = useState(
		getExhibitionsCount(window.innerWidth),
	)

	function getExhibitionsCount(width) {
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
			const newExhibitionCount = getExhibitionsCount(window.innerWidth)
			console.log(
				`Window width: ${window.innerWidth}, New exhibition count: ${newExhibitionCount}`,
			)
			if (newExhibitionCount !== visibleExhibitionsCount) {
				setVisibleExhibitionsCount(newExhibitionCount)
				console.log(
					`Updated visibleExhibitionCount to: ${newExhibitionCount}`,
				)
			}
		}

		window.addEventListener('resize', handleResize)

		// Initial check
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [visibleExhibitionsCount])

	useEffect(() => {
		const fetchExhibition = async () => {
			try {
				const response = await axios.get('/api/exhibitions')
				console.log('Fetch exhibitions', response.data)
				setExhibitions(response.data.exhibitions || [])
				setLoading(false)
			} catch (error) {
				console.error('Error fetching exhibitions:', error)
				setError(t('Не вдалося завантажити.'))
				setLoading(false)
			}
		}
		fetchExhibition()
	}, [])

	const handleExhibitionClick = (id) => {
		navigate(`/exhibitions/${id}`)
	}
	return (
		<div className={`${styles.MuseumsPageContainer}`}>
			<div className={`${styles.MuseumsPageTitleContainer}`}>
				<h1 className={`${styles.MuseumsPageTitle}`}>
					{t('Виставки')}
				</h1>
			</div>

			<ExhibitionsPageTopSlider />

			<ExhibitionsPageNewsSlider />

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
					) : exhibitions.length === 0 ? (
						<div className={styles.noCreators}>
							{t('Немає виставок для відображення.')}
						</div>
					) : (
						<div
							className={`${styles.ArtistsPageGalleryInnerWrapper}`}
						>
							{exhibitions
								.slice(0, visibleExhibitionsCount)
								.map((exhibition, index) => {
									const featuredMediaUrl =
										exhibition.images &&
										exhibition.images.length > 0
											? getImageUrl(
													exhibition.images[0]
														.imageUrl,
													'/Img/halfNewsCard.jpg',
												)
											: '/Img/halfNewsCard.jpg'
									console.log(
										'Витягнуте медіа:',
										featuredMediaUrl,
									)

									return (
										<div
											key={exhibition.id}
											className={`${styles.ArtistsPageGalleryCardWrapper}`}
										>
											<div
												className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}
												onClick={() =>
													handleExhibitionClick(
														exhibition.id,
													)
												}
												style={{ cursor: 'pointer' }}
											>
												<img
													className={`${styles.ArtistsPageGalleryCardPicture}`}
													src={featuredMediaUrl}
													alt={`Фото митця ${(<TranslatedContent en={exhibition.title_en} uk={exhibition.title_uk} maxLength={50} />)}`}
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
													<TranslatedContent
														en={exhibition.title_en}
														uk={exhibition.title_uk}
														maxLength={50}
													/>
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
			<ExhibitionsPagePopularExhibitions />
			<div className={styles.ExhibitionsMapWrapper}>
				<ExhibitionsMap exhibitions={exhibitions} />
			</div>
		</div>
	)
}

export default MuseumsPage
