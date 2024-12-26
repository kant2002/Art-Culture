import styles from '@/styles/layout/ArtistsPage.module.scss'
import ArtistsPageNewsArtistsSlider from '@components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../../utils/helper.js'
import MainPopularArtistsSlider from '../../components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.jsx'

function ArtistsPage() {
	const { t } = useTranslation()

	const [creators, setCreators] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [visibleCreatorsCount, setVisibleCreatorsCount] = useState(
		getCreatorsCount(window.innerWidth),
	)

	function getCreatorsCount(width) {
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
			const newCreatorCount = getCreatorsCount(window.innerWidth)
			console.log(
				`Window width: ${window.innerWidth}, New creator count: ${newCreatorCount}`,
			)
			if (newCreatorCount !== visibleCreatorsCount) {
				setVisibleCreatorsCount(newCreatorCount)
				console.log(
					`Updated visibleCreatorsCount to: ${newCreatorCount}`,
				)
			}
		}

		window.addEventListener('resize', handleResize)

		// Initial check
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [visibleCreatorsCount])
	useEffect(() => {
		const fetchCreator = async () => {
			try {
				const response = await axios.get('/api/users/creators')
				console.log('received author data', response.data)
				setCreators(response.data.creators)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching author data', error)
				setLoading(false)
			}
		}

		fetchCreator()
	}, [])

	const handleAuthorPreviewClick = (id) => {
		navigate(`/artist/${id}`)
	}

	const handleAllAuthorsClick = () => {
		navigate('/all-artists-page')
	}

	return (
		<div className={`${styles.ArtistsPageContainer}`}>
			<div className={`${styles.ArtistsPageTitleWrapper}`}>
				<h1 className={`${styles.ArtistsPageTitle}`}>{t('Митці')}</h1>
			</div>

			<div className={`${styles.ArtistsPageSeparatorWrapper}`}>
				<div className={`${styles.ArtistsPageSeparator}`}></div>
			</div>

			<div className={`${styles.ArtistsPageSubTitleWrapper}`}>
				<h3 className={`${styles.ArtistsPageSubTitle}`}>
					{t('Слідкуйте за мистецтвом!')}
				</h3>
			</div>

			<div className={`${styles.ArtistsPageArtistsDescriptionWrapper}`}>
				<p className={`${styles.ArtistsPageArtistsFirstDescription}`}>
					{t(
						'Отримуйте запрошення на перегляди виставок та будьте серед перших, хто дізнається про нагороди, призи, книги та виставки в публічних і комерційних галереях.',
					)}
				</p>

				<p className={`${styles.ArtistsPageArtistsSecondDescription}`}>
					{t('Просто шукайте поля для підписки')}&#8194;&#34;
					{t('СЛІДКУВАТИ ЗА ЦИМ МИТЦЕМ')}&#34;&#8194;
					{t(
						'у нижній частині новинних статей Art & Culture Online, профілів митців та попередніх переглядів виставок, або переглядайте сторінки митців нижче.',
					)}
				</p>
			</div>

			<div className={`${styles.ArtistsPageArtistsSearchWrapper}`}>
				<input
					className={`${styles.ArtistsPageArtistsSearchInput}`}
					placeholder={t('Пошук митця')}
				/>
			</div>

			<ArtistsPageNewsArtistsSlider />

			<div className={`${styles.ArtistsPageGalleryContainer}`}>
				<div className={`${styles.ArtistsPageGalleryTitleWrapper}`}>
					<h2 className={`${styles.ArtistsPageGalleryTitle}`}>
						{t('Перегляд.')} &#8243;{t('Митці')}&#8243;
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
					) : creators.length === 0 ? (
						<div className={styles.noCreators}>
							{t('Немає митців для відображення.')}
						</div>
					) : (
						<div
							className={`${styles.ArtistsPageGalleryInnerWrapper}`}
						>
							{creators
								.slice(0, visibleCreatorsCount)
								.map((creator) => {
									const featuredMediaUrl = getImageUrl(
										creator.images,
										'/Img/ArtistPhoto.jpg',
									)

									return (
										<div
											key={creator.id}
											className={`${styles.ArtistsPageGalleryCardWrapper}`}
										>
											<div
												className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}
												onClick={() =>
													handleAuthorPreviewClick(
														creator.id,
													)
												}
												style={{ cursor: 'pointer' }}
											>
												<img
													className={`${styles.ArtistsPageGalleryCardPicture}`}
													src={featuredMediaUrl}
													alt={`Фото митця ${creator.title}`}
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
													{creator.title}
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
							onClick={handleAllAuthorsClick}
						>
							{t('Всі митці')}
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
			<MainPopularArtistsSlider />
		</div>
	)
}

export default ArtistsPage
