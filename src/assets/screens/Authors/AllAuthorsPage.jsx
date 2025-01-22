import LoadingError from '@components/Blocks/LoadingError'
import AllArtistsPageSearchSlider from '@components/Sliders/AllArtistsPageLettersSortSlider/AllArtistsPageSearchSlider'
import styles from '@styles/layout/AllArtistsPage.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { englishLetters, ukrainianLetters } from '../../../utils/constants'

function AllAuthorsPage() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()

	const [authorsAndCreators, setAuthorsAndCreators] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [language, setLanguage] = useState(i18n.language)
	const [selectedLetter, setSelectedLetter] = useState('')
	const [sortMode, setSortMode] = useState('ALL')

	useEffect(() => {
		const handleLanguageChange = () => setLanguage(i18n.language)
		i18n.on('languageChanged', handleLanguageChange)

		return () => {
			i18n.off('languageChanged', handleLanguageChange)
		}
	}, [i18n])

	const groupByLetter = (authorsAndCreatorsArray) => {
		const grouped = authorsAndCreatorsArray.reduce(
			(acc, authorOrCreator) => {
				const letter =
					authorOrCreator.title?.charAt(0).toUpperCase() || ''
				if (!acc[letter]) {
					acc[letter] = []
				}
				acc[letter].push(authorOrCreator)
				return acc
			},
			{},
		)

		let lettersInUse = Object.keys(grouped)

		if (sortMode === 'UK') {
			lettersInUse = ukrainianLetters.filter((l) =>
				lettersInUse.includes(l),
			)
		} else if (sortMode === 'EN') {
			lettersInUse = englishLetters.filter((l) =>
				lettersInUse.includes(l),
			)
		} else {
			const merged = [...ukrainianLetters, ...englishLetters]
			lettersInUse = merged.filter((l) => lettersInUse.includes(l))
		}

		const sortedObj = {}
		lettersInUse.forEach((letter) => {
			sortedObj[letter] = grouped[letter]
		})
		return sortedObj
	}

	useEffect(() => {
		const fetchAuthorsAndCreators = async () => {
			try {
				setLoading(true)
				setError(null)

				// Fetch Authors
				const authorsResponse = await axios.get('/api/users/authors')
				const authorsWithPosts = await Promise.all(
					authorsResponse.data.authors.map(async (author) => {
						try {
							const postsResponse = await axios.get(
								`/api/posts/author/${author.id}`,
							)
							if (postsResponse.data.posts.length > 0) {
								author.posts = postsResponse.data.posts
								author.type = 'author' // Mark the type
								return author
							}
							return null
						} catch (error) {
							console.error(
								`Error fetching posts for author ${author.id}`,
								error,
							)
							return null
						}
					}),
				)

				// Fetch Creators
				const creatorsResponse = await axios.get('/api/users/creators')
				const creatorsWithPosts = await Promise.all(
					creatorsResponse.data.creators.map(async (creator) => {
						try {
							const postsResponse = await axios.get(
								`/api/posts/author/${creator.id}`,
							)
							if (postsResponse.data.posts.length > 0) {
								creator.posts = postsResponse.data.posts
								creator.type = 'creator' // Mark the type
								return creator
							}
							return null
						} catch (error) {
							console.error(
								`Error fetching posts for creator ${creator.id}`,
								error,
							)
							return null
						}
					}),
				)

				// Combine authors and creators, and filter out those without posts
				const combined = [
					...authorsWithPosts,
					...creatorsWithPosts,
				].filter((item) => item !== null)
				setAuthorsAndCreators(groupByLetter(combined))
			} catch (error) {
				console.error('Error fetching authors and creators', error)
				setError(t('Не вдалося завантажити дані авторів та творців.'))
			} finally {
				setLoading(false)
			}
		}

		fetchAuthorsAndCreators()
	}, [sortMode, selectedLetter, t])

	const handleLetterSelected = (letter) => {
		setSelectedLetter(letter)
	}

	const handleShowAll = () => {
		setSortMode('ALL')
		setSelectedLetter('')
	}
	const handleShowUkrainian = () => {
		setSortMode('UK')
		setSelectedLetter('')
	}
	const handleShowEnglish = () => {
		setSortMode('EN')
		setSelectedLetter('')
	}

	const handleAuthorPreviewClick = (id) => {
		navigate(`/all-author-posts/${id}`)
	}

	const renderedLetters = Object.keys(authorsAndCreators).filter(
		(letter) => !selectedLetter || letter === selectedLetter,
	)

	return (
		<div className={styles.ArtistsPageContainer}>
			<div className={styles.ArtistsPageTitleWrapper}>
				<h1>{t('Усі автори')}</h1>
			</div>
			<div className={styles.ArtistsPageSeparatorWrapper}>
				<div className={styles.ArtistsPageSeparator}></div>
			</div>
			<div className={styles.ArtistsPageArtistsSearchWrapper}>
				<input
					className={styles.ArtistsPageArtistsSearchInput}
					placeholder={t('Пошук автора')}
				/>
			</div>

			{/* Buttons to toggle sort mode */}
			<div className={styles.ArtistsPageGalleryButtonsWrapper}>
				<button
					className={styles.ArtistsPageGalleryButton}
					onClick={handleShowAll}
				>
					<h3 className={styles.ArtistsPageGalleryButtonTitle}>
						{t('Усі')}
					</h3>
				</button>

				<p className={styles.ArtistsPageGalleryButtonSeparator}>|</p>

				<button
					className={styles.ArtistsPageGalleryButton}
					onClick={handleShowUkrainian}
				>
					<h3 className={styles.ArtistsPageGalleryButtonTitle}>
						{t('А-Я')}
					</h3>
				</button>

				<p className={styles.ArtistsPageGalleryButtonSeparator}>|</p>

				<button
					className={styles.ArtistsPageGalleryButtonWhithClock}
					onClick={handleShowEnglish}
				>
					<h3 className={styles.ArtistsPageGalleryButtonTitle}>
						{t('A-Z')}
					</h3>
				</button>
			</div>

			{/* Letter selection slider */}
			{sortMode === 'UK' && (
				<AllArtistsPageSearchSlider
					letters={ukrainianLetters}
					onLetterSelected={handleLetterSelected}
					selectedLetter={selectedLetter}
				/>
			)}
			{sortMode === 'EN' && (
				<AllArtistsPageSearchSlider
					letters={englishLetters}
					onLetterSelected={handleLetterSelected}
					selectedLetter={selectedLetter}
				/>
			)}

			{/* Render Authors and Creators */}
			<div className={styles.ArtistsContainer}>
				{!loading && renderedLetters.length === 0 && (
					<LoadingError
						message={t(
							'Відсутні автори та творці для відображення',
						)}
					/>
				)}

				{/* Render Authors and Creators grouped together */}
				{Object.keys(authorsAndCreators)
					// If selectedLetter is empty, show all letters;
					// otherwise show only the letter the user clicked
					.filter(
						(letter) =>
							!selectedLetter || letter === selectedLetter,
					)
					.map((letter) => (
						<div key={letter} className={styles.ArtistsWrapper}>
							<div className={styles.LetterWrapper}>
								<h2 className={styles.Letter}>{letter}</h2>
							</div>
							<div className={styles.ArtistsByLetterWrapper}>
								{authorsAndCreators[letter].map(
									(authorOrCreator) => (
										<div
											key={authorOrCreator.id}
											className={styles.ArtistWrapper}
											onClick={() =>
												handleAuthorPreviewClick(
													authorOrCreator.id,
												)
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
													<p
														className={
															styles.ArtistTitle
														}
													>
														{authorOrCreator.title}

														{/* (
													{authorOrCreator.type ===
													'author'
														? 'Автор'
														: 'Творець'}
													) */}
													</p>
												</div>
												<div
													className={
														styles.ArtistPhotoWrapper
													}
												>
													<img
														className={
															styles.ArtistPhoto
														}
														src={
															authorOrCreator.images ||
															'/Img/ArtistPhoto.jpg'
														}
														alt={
															authorOrCreator.title
														}
														onError={(e) => {
															e.target.onerror =
																null
															e.target.src =
																'/Img/newsCardERROR.jpg'
														}}
													/>
												</div>
											</div>
											<div
												className={
													styles.SeparatorWrapper
												}
											>
												<div
													className={styles.Separator}
												></div>
											</div>
										</div>
									),
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default AllAuthorsPage
