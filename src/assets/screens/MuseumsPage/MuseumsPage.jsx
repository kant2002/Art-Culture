import AllMuseumsMap from '@components/Blocks/AllMuseumsMap.jsx'
import AllArtistsPageSearchSlider from '@components/Sliders/AllArtistsPageLettersSortSlider/AllArtistsPageSearchSlider'
import MuseumsPageNewsMuseum from '@components/Sliders/MuseumsPageSliders/MuseumsPageNewsMuseum.jsx'
import MuseumsPagePopularMuseums from '@components/Sliders/MuseumsPageSliders/MuseumsPagePopularMuseums.jsx'
import MuseumsPageTopSlider from '@components/Sliders/MuseumsPageSliders/MuseumsPageTopSlider.jsx'
import styles from '@styles/layout/MuseumsPage.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../../utils/helper.js'

import { englishLetters, ukrainianLetters } from '../../../utils/constants'

function MuseumsPage({ baseUrl }) {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [museums, setMuseums] = useState([])
	const [product, setProducts] = useState([])

	const [visibleMuseumsCount, setVisibleMuseumsCount] = useState(
		getMuseumsCount(window.innerWidth),
	)

	const [sortMode, setSortMode] = useState('ALL')
	const [selectedLetter, setSelectedLetter] = useState('')
	const [lettersMode, setLettersMode] = useState('uk')
	const [hoveringLettersButton, setHoveringLettersButton] = useState(false)

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
		navigate(`/museum-page/${id}`)
	}

	const handleAllMuseumsPageClick = () => {
		navigate('/all-museums-page')
	}

	const handleShowAll = () => {
		setSortMode('ALL')
		setSelectedLetter('')
	}
	const handleLettersButtonClick = () => {
		// If we were "ALL", switch to "LETTERS"
		if (sortMode === 'ALL') {
			setSortMode('LETTERS')
			setSelectedLetter('')
			// lettersMode is left as is, or toggled — depends on your preference.
			// Let's actually toggle between 'uk' and 'en' each time user clicks.
			// setLettersMode((prev) => (prev === 'uk' ? 'en' : 'uk'))
		}
		// If we were already "LETTERS", just toggle alphabets
		else {
			setLettersMode((prev) => (prev === 'uk' ? 'en' : 'uk'))
			setSelectedLetter('')
		}
	}

	// Called by the slider to pick a letter
	const handleLetterSelected = (letter) => {
		setSelectedLetter(letter)
	}

	// -----------------------
	// DERIVED array
	// -----------------------
	let displayedMuseums = [...museums]

	if (sortMode === 'LETTERS') {
		// Sort by the correct locale
		const locale = lettersMode === 'uk' ? 'uk' : 'en'
		displayedMuseums.sort((a, b) =>
			(a.title || '').localeCompare(b.title || '', locale),
		)

		// Filter by selected letter if any
		if (selectedLetter) {
			displayedMuseums = displayedMuseums.filter((museum) => {
				const firstChar = museum.title?.[0]?.toUpperCase() || ''
				return firstChar === selectedLetter
			})
		}
	}
	// If sortMode === 'ALL', no sorting/filtering

	// Limit to visible
	displayedMuseums = displayedMuseums.slice(0, visibleMuseumsCount)

	// Decide what letters to show
	const letters = lettersMode === 'uk' ? ukrainianLetters : englishLetters

	// Decide the letters button text
	//   - If lettersMode is 'uk', by default we show "А-Я", but on hover we show "A-Z".
	//   - If lettersMode is 'en', by default we show "A-Z", but on hover we show "А-Я".
	let lettersBtnText = ''
	if (lettersMode === 'uk') {
		lettersBtnText = hoveringLettersButton ? 'A-Z' : 'А-Я'
	} else {
		lettersBtnText = hoveringLettersButton ? 'А-Я' : 'A-Z'
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
						{t('Перегляд.')} &#8243;{t('МУЗЕЇ')}&#8243;
					</h2>
				</div>

				<div className={`${styles.ArtistsPageGalleryButtonsWrapper}`}>
					<button
						className={`${styles.ArtistsPageGalleryButton}`}
						onClick={handleShowAll}
					>
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
					<div
						onMouseEnter={() => setHoveringLettersButton(true)}
						onMouseLeave={() => setHoveringLettersButton(false)}
						style={{
							position: 'relative',
							display: 'inline-block',
						}}
					>
						<button
							className={`${styles.ArtistsPageGalleryButton}`}
							onClick={handleLettersButtonClick}
						>
							<h3
								className={`${styles.ArtistsPageGalleryButtonTitle}`}
							>
								{lettersBtnText}
							</h3>
						</button>
						{hoveringLettersButton && (
							<div
								style={{
									position: 'absolute',
									bottom: '105%', // place tooltip above the button
									left: '50%',
									transform: 'translateX(-50%)',
									backgroundColor: '#333',
									color: '#fff',
									padding: '4px 8px',
									borderRadius: '4px',
									whiteSpace: 'nowrap',
									fontSize: '0.85rem',
									zIndex: 9999,
								}}
							>
								{t('Натисніть, щоб вибрати мову')}
							</div>
						)}
					</div>
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

				{sortMode === 'LETTERS' && (
					<AllArtistsPageSearchSlider
						letters={letters}
						onLetterSelected={handleLetterSelected}
						selectedLetter={selectedLetter}
					/>
				)}

				<div className={`${styles.ArtistsPageGalleryCardsWrapper}`}>
					{loading ? (
						<div className={styles.loading}>
							{t('Завантаження...')}
						</div>
					) : error ? (
						<div className={styles.error}>{error}</div>
					) : displayedMuseums.length === 0 ? (
						<div className={styles.noCreators}>
							{t('Немає музеїв для відображення.')}
						</div>
					) : (
						<div
							className={`${styles.ArtistsPageGalleryInnerWrapper}`}
						>
							{displayedMuseums.map((museum) => {
								const featuredMediaUrl = getImageUrl(
									museum.images,
									'/Img/halfNewsCard.jpg',
								)

								return (
									<div
										key={museum.id}
										className={`${styles.ArtistsPageGalleryCardWrapper}`}
									>
										<div
											className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}
											style={{ cursor: 'pointer' }}
											onClick={() =>
												handleMuseumClick(museum.id)
											}
										>
											<img
												className={`${styles.ArtistsPageGalleryCardPicture}`}
												src={featuredMediaUrl}
												alt={'Фото музею'}
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
							onClick={handleAllMuseumsPageClick}
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
