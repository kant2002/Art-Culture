import AllMuseumsMap from '@components/Blocks/AllMuseumsMap.jsx'
import TranslatedContent from '@components/Blocks/TranslatedContent.jsx'
import MuseumsPageNewsMuseum from '@components/Sliders/MuseumsPageSliders/MuseumsPageNewsMuseum.jsx'
import MuseumsPagePopularMuseums from '@components/Sliders/MuseumsPageSliders/MuseumsPagePopularMuseums.jsx'
import MuseumsPageTopSlider from '@components/Sliders/MuseumsPageSliders/MuseumsPageTopSlider.jsx'
import styles from '@styles/layout/MuseumsPage.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../../utils/helper.js'

function MuseumsPage() {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [museums, setMuseums] = useState([])
	const [products, setProducts] = useState([])

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
				console.log(`Updated visibleMuseumCount to: ${newMuseumCount}`)
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
		/**
		 * Fetches a list of museums from the API and updates the state with the retrieved data.
		 * Sets loading state to false after the data is fetched or an error occurs.
		 * Logs the fetched data or error to the console.
		 * Displays an error message if the fetch operation fails.
		 */

		const fetchMuseums = async () => {
			try {
				const response = await axios.get(`/api/users/museums`)
				console.log('Fetched museum', response.data)
				setMuseums(response.data.museums)
				setLoading(false)
			} catch (error) {
				console.error('Error fetch museum', error)
				setError(t('Не вдалося завантажити дані.'))
				setLoading(false)
			}
		}
		fetchMuseums()
	}, [])

	useEffect(() => {
		const fetchMUseumsProducts = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					'/api/products/museum-products',
				)
				console.log('Fetch Products Maps', response.data)
				setProducts(response.data.products)
			} catch (error) {
				console.error('Error fetching Museums:', error)
				setError(t('Не вдалося завантажити.'))
			} finally {
				setLoading(false)
			}
		}
		fetchMUseumsProducts()
	}, [])

	const handleMuseumClick = (id) => {
		navigate(`/Museums/${id}`)
	}

	const handleShowAllExhibits = () => {
		navigate('/all-exhibits-product-page')
	}
	return (
		<div className={`${styles.MuseumsPageContainer}`}>
			<div className={`${styles.MuseumsPageTitleContainer}`}>
				<h1 className={`${styles.MuseumsPageTitle}`}>{t('Музеї')}</h1>
			</div>

			<MuseumsPageTopSlider />

			<MuseumsPageNewsMuseum />

			<div className={`${styles.ArtistsPageGalleryContainer}`}>
				<div className={`${styles.ArtistsPageGalleryTitleWrapper}`}>
					<h2 className={`${styles.ArtistsPageGalleryTitle}`}>
						{t('Перегляд.')} &#8243;{t('ЕКСПОНАТИ')}&#8243;
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
					) : !products || products.length === 0 ? (
						<div className={styles.noCreators}>
							{t('Немає експонатів для відображення.')}
						</div>
					) : (
						<div
							className={`${styles.ArtistsPageGalleryInnerWrapper}`}
						>
							{products
								.slice(0, visibleMuseumsCount)
								.map((product) => {
									const featuredMediaUrl =
										product.images &&
										product.images.length > 0
											? getImageUrl(
													product.images[0].imageUrl,
													'/Img/halfNewsCard.jpg',
												)
											: '/Img/halfNewsCard.jpg'
									console.log(
										'Витягнуте медіа:',
										featuredMediaUrl,
									)

									return (
										<div
											key={product.id}
											className={`${styles.ArtistsPageGalleryCardWrapper}`}
										>
											<div
												className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}
												onClick={() =>
													handleMuseumClick(
														product.id,
													)
												}
												style={{ cursor: 'pointer' }}
											>
												<img
													className={`${styles.ArtistsPageGalleryCardPicture}`}
													src={featuredMediaUrl}
													alt={`Фото митця ${(<TranslatedContent en={product.title_en} uk={product.title_uk} maxLength={150} />)}`}
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
														en={product.title_en}
														uk={product.title_uk}
														maxLength={150}
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
							onClick={handleShowAllExhibits}
						>
							{t('Всі експонати')}
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

			<MuseumsPagePopularMuseums />

			<div className={`${styles.MuseumsPageMapTitleContainer}`}>
				<h2 className={`${styles.MuseumsPageMapTitle}`}>
					{t('Мапа знаходження  Музеїв')}
				</h2>

				<AllMuseumsMap
					className={styles.MuseumsMapWrapper}
					museums={museums}
				/>
			</div>
		</div>
	)
}

export default MuseumsPage
