import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/AllArtistsPage.module.scss'

function AllArtistsPage() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const [creators, setCreators] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [language, setLanguage] = useState(i18n.language)
	const [selectedLetter, setSelectedLetter] = useState('')

	const ukrainianLetters = [
		'А',
		'Б',
		'В',
		'Г',
		'Ґ',
		'Д',
		'Е',
		'Є',
		'Ж',
		'З',
		'И',
		'І',
		'Ї',
		'Й',
		'К',
		'Л',
		'М',
		'Н',
		'О',
		'П',
		'Р',
		'С',
		'Т',
		'У',
		'Ф',
		'Х',
		'Ц',
		'Ч',
		'Ш',
		'Щ',
		'Ь',
		'Ю',
		'Я',
	]

	// Define English letters in alphabetical order
	const englishLetters = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	]

	useEffect(() => {
		const handleLanguageChange = () => setLanguage(i18n.language)
		i18n.on('languageChanged', () => setLanguage(i18n.language))
		return () =>
			i18n.off('languageChanged', () => setLanguage(i18n.language))
	}, [i18n])

	useEffect(() => {
		const fetchCreators = async () => {
			try {
				setLoading(true)
				setError(null) // Reset previous errors
				let url

				if (['uk', 'en'].includes(language)) {
					// Fetch by language
					url = selectedLetter
						? `/api/users/creators/language/${language}?letter=${selectedLetter}`
						: `/api/users/creators/language/${language}`
				} else {
					// Fetch by ID
					url = `/api/users/creators/id/${language}`
				}

				console.log('Requesting URL:', url)
				const response = await axios.get(url)
				console.log('Response Data:', response.data)

				if (['uk', 'en'].includes(language)) {
					// Organize creators by letter
					const groupedCreators = response.data.creators.reduce(
						(acc, creator) => {
							const letter = creator.title
								?.charAt(0)
								.toUpperCase()
							if (letter) {
								acc[letter] = acc[letter] || []
								acc[letter].push(creator)
							}
							return acc
						},
						{},
					)

					const sortedLetters = [
						...ukrainianLetters,
						...englishLetters,
					].filter((letter) =>
						Object.keys(groupedCreators).includes(letter),
					)

					const sortedGroupedCreators = {}
					sortedLetters.forEach((letter) => {
						if (groupedCreators[letter]) {
							sortedGroupedCreators[letter] =
								groupedCreators[letter]
						}
					})

					setCreators(sortedGroupedCreators)
				}

				setLoading(false)
			} catch (error) {
				console.error('Error fetching creators:', error)
				setLoading(false)
				setError(error.response?.data?.error || 'An error occurred')
			}
		}
		fetchCreators()
	}, [])

	const handleLetterSelected = (letter) => {
		setSelectedLetter(letter)
	}

	const handleAuthorPreviewClick = (id) => {
		navigate(`/artist/${id}`)
	}

	return (
		<div className={styles.ArtistsPageContainer}>
			<div className={styles.ArtistsPageTitleWrapper}>
				<h1>{t('Усі митці')}</h1>
			</div>
			<div className={styles.ArtistsPageSeparatorWrapper}>
				<div className={styles.ArtistsPageSeparator}></div>
			</div>
			<div className={styles.ArtistsPageArtistsSearchWrapper}>
				<input
					className={`${styles.ArtistsPageArtistsSearchInput}`}
					placeholder={t('Пошук митця')}
				/>
			</div>

			<div className={`${styles.ArtistsPageGalleryButtonsWrapper}`}>
				<button className={`${styles.ArtistsPageGalleryButton}`}>
					<h3 className={`${styles.ArtistsPageGalleryButtonTitle}`}>
						{t('Усі')}
					</h3>
				</button>

				<p className={`${styles.ArtistsPageGalleryButtonSeparator}`}>
					|
				</p>

				<button className={`${styles.ArtistsPageGalleryButton}`}>
					<h3 className={`${styles.ArtistsPageGalleryButtonTitle}`}>
						{t('А-Я')}
					</h3>
				</button>

				<p className={`${styles.ArtistsPageGalleryButtonSeparator}`}>
					|
				</p>

				<button
					className={`${styles.ArtistsPageGalleryButtonWhithClock}`}
				>
					<h3 className={`${styles.ArtistsPageGalleryButtonTitle}`}>
						{t('A-Z')}
					</h3>
				</button>
			</div>
			<div className={styles.ArtistsContainer}>
				{Object.keys(creators).map((letter) => (
					<div key={letter} className={styles.ArtistsWrapper}>
						<div className={styles.LetterWrapper}>
							{/* <Letters
								onLetterSelected={handleLetterSelected}
								selected={selectedLetter}
							/> */}
							<h2 className={styles.Letter}>{letter}</h2>
						</div>
						<div className={styles.ArtistsByLetterWrapper}>
							{creators[letter].map((creator) => (
								<div
									key={creator.id}
									className={styles.ArtistWrapper}
									onClick={() =>
										handleAuthorPreviewClick(creator.id)
									}
								>
									<div
										className={
											styles.ArtistInformationWrapper
										}
									>
										<div
											className={
												styles.ArtistTitleWrapper
											}
										>
											<p className={styles.ArtistTitle}>
												{creator.title}
											</p>
										</div>
										<div
											className={
												styles.ArtistPhotoWrapper
											}
										>
											<img
												className={`${styles.ArtistPhoto}`}
												src={
													creator.images ||
													'/Img/ArtistPhoto.jpg'
												}
												alt={creator.title}
												onError={(e) => {
													e.target.onerror = null
													e.target.src =
														'/Img/newsCardERROR.jpg'
												}}
											/>
										</div>
									</div>
									<div className={styles.SeparatorWrapper}>
										<div className={styles.Separator}></div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AllArtistsPage
