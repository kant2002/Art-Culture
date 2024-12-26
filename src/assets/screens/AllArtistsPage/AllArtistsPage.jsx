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
				const response = await axios.get(
					'/api/users/creators/' + language,
				)

				setCreators(response.data.creators || [])
				setLoading(false)
				setError(false)
			} catch (error) {
				console.error('Error fetching creators:', error)
				setLoading(false)
				setError(true)
			}
		}
		fetchCreators()
	}, [language])

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
				<div className={styles.ArtistsWrapper}>
					<div className={styles.LetterWrapper}>
						<h2 className={styles.Letter}>{t('A')}</h2>
					</div>
					<div className={styles.ArtistsByLetterWrapper}>
						<div className={styles.ArtistWrapper}>
							<div className={styles.ArtistInformationWrapper}>
								<div className={styles.ArtistTitleWrapper}>
									<p className={styles.ArtistTitle}>
										Андрій Шевченко
									</p>
								</div>
								<div className={styles.ArtistPhotoWrapper}>
									<img
										className={`${styles.ArtistPhoto}`}
										src={'/Img/ArtistPhoto.jpg'}
										alt="Слідкуйте за мистецтвом!"
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

						<div className={styles.ArtistWrapper}>
							<div className={styles.ArtistInformationWrapper}>
								<div className={styles.ArtistTitleWrapper}>
									<p className={styles.ArtistTitle}>
										Олександр Сергійович Білокінь
									</p>
								</div>
								<div className={styles.ArtistPhotoWrapper}>
									<img
										className={`${styles.ArtistPhoto}`}
										src={'/Img/ArtistPhoto.jpg'}
										alt="Слідкуйте за мистецтвом!"
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

						<div className={styles.ArtistWrapper}>
							<div className={styles.ArtistInformationWrapper}>
								<div className={styles.ArtistTitleWrapper}>
									<p className={styles.ArtistTitle}>
										Марія Задорожна
									</p>
								</div>
								<div className={styles.ArtistPhotoWrapper}>
									<img
										className={`${styles.ArtistPhoto}`}
										src={'/Img/ArtistPhoto.jpg'}
										alt="Слідкуйте за мистецтвом!"
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
					</div>
				</div>

				<div className={styles.ArtistsWrapper}>
					<div className={styles.LetterWrapper}>
						<h2 className={styles.Letter}>{t('Б')}</h2>
					</div>
					<div className={styles.ArtistsByLetterWrapper}>
						<div className={styles.ArtistWrapper}>
							<div className={styles.ArtistInformationWrapper}>
								<div className={styles.ArtistTitleWrapper}>
									<p className={styles.ArtistTitle}>
										Андрій Васильович Літвиненко
									</p>
								</div>
								<div className={styles.ArtistPhotoWrapper}>
									<img
										className={`${styles.ArtistPhoto}`}
										src={'/Img/ArtistPhoto.jpg'}
										alt="Слідкуйте за мистецтвом!"
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

						<div className={styles.ArtistWrapper}>
							<div className={styles.ArtistInformationWrapper}>
								<div className={styles.ArtistTitleWrapper}>
									<p className={styles.ArtistTitle}>
										Катерина Малевич
									</p>
								</div>
								<div className={styles.ArtistPhotoWrapper}>
									<img
										className={`${styles.ArtistPhoto}`}
										src={'/Img/ArtistPhoto.jpg'}
										alt="Слідкуйте за мистецтвом!"
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

						<div className={styles.ArtistWrapper}>
							<div className={styles.ArtistInformationWrapper}>
								<div className={styles.ArtistTitleWrapper}>
									<p className={styles.ArtistTitle}>
										Тарас Дмитрович Горобець
									</p>
								</div>
								<div className={styles.ArtistPhotoWrapper}>
									<img
										className={`${styles.ArtistPhoto}`}
										src={'/Img/ArtistPhoto.jpg'}
										alt="Слідкуйте за мистецтвом!"
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default AllArtistsPage
