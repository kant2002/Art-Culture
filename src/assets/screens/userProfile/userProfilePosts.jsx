import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/UserProfile/userProfilePosts.module.scss'
import '/src/styles/components/UserProfile/userProfile.module.scss'

const UserProfile = () => {

	const { t } = useTranslation()

	const navigate = useNavigate()

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handleAddPostClick = () => {
		navigate('/use.userProfilePosts')
	}
	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}
	return (
		<div className={`${styles.profile}`}>
			{/* Верхние кнопки */}
			<div className={`${styles.profileActions}`}>
				<button
					className={`${styles.profileAction}`}
					onClick={handleProfilePageClick}
				>
					Інформація
				</button>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handlePostsClick}
				>
					Публікації
				</button>
				<button
					className={`${styles.profileAction}`}
					onClick={handleAddPostClick}
				>
					Додати публікацію
				</button>
			</div>
			{/* Карточка публикации */}
			<div className={`${styles.userProfilePostsContainer}`}>
				<div className={`${styles.userProfilePostsWrapper}`}>
					<div className={`${styles.userProfilePostsPicAndTextWrapper}`}>
						<div className={`${styles.userProfilePostsPicWrapper}`}>
							<img
								className={`${styles.userProfilePostsPic}`}
								src={'/Img/mainPopularArtistsSliderIMG.jpg'}
								alt={t('Світлина мистецтва')}
								onError={e => {
									e.target.onerror = null
									e.target.src = '/Img/mainPopularArtistsSlide.jpg'
								}}
							/>
						</div>
						<div className={`${styles.userProfilePostsTextWrapper}`}>
							<div className={`${styles.userProfilePostsTitleWrapper}`}>
								<h3 className={`${styles.userProfilePostsTitle}`}>
									Нова публікація
								</h3>
							</div>
							<div className={`${styles.userProfilePostsDescriptionWrapper}`}>
								<p className={`${styles.userProfilePostsDescription}`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam maxime dolor ipsa. Ducimus, dignissimos. Fugit officia repellendus neque ducimus voluptate temporibus repudiandae quos doloribus ipsa consectetur modi, vitae, non minima!</p>
							</div>
							<div className={`${styles.userProfilePostsClockDateAndButtonWrapper}`}>
								<div className={`${styles.userProfilePostsClockAndDateWrapper}`}>
									<img className={`${styles.userProfilePostsClock}`}
										src={'/Img/clock.svg'}
										alt={t('Світлина мистецтва')}
										onError={e => {
											e.target.onerror = null
											e.target.src = '/Img/clock.svg'
										}}
									/>
									<p className={`${styles.userProfilePostsDate}`}>01.01.2022</p>
								</div>
								<button className={`${styles.userProfilePostsButton}`}>{t('До публікації')}</button>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.userProfilePostsWrapper}`}>
					<div className={`${styles.userProfilePostsPicAndTextWrapper}`}>
						<div className={`${styles.userProfilePostsPicWrapper}`}>
							<img
								className={`${styles.userProfilePostsPic}`}
								src={'/Img/mainBanner.jpeg'}
								alt={t('Світлина мистецтва')}
								onError={e => {
									e.target.onerror = null
									e.target.src = '/Img/mainPopularArtistsSlide.jpg'
								}}
							/>
						</div>
						<div className={`${styles.userProfilePostsTextWrapper}`}>
							<div className={`${styles.userProfilePostsTitleWrapper}`}>
								<h3 className={`${styles.userProfilePostsTitle}`}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius pariatur vero ducimus eveniet, aut adipisci at, eligendi magni perspiciatis facere saepe, sed architecto? Tenetur omnis aperiam harum tempore voluptas reiciendis.
								</h3>
							</div>
							<div className={`${styles.userProfilePostsDescriptionWrapper}`}>
								<p className={`${styles.userProfilePostsDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae id optio officiis. Nam, eius ipsam ea ipsum culpa veniam blanditiis nobis magni dignissimos a debitis, aut in iste distinctio obcaecati!
									Ad, soluta repellat rem, impedit commodi doloribus saepe maxime harum minima blanditiis, consectetur corporis dolore in quod doloremque eos perspiciatis. Vitae sequi nostrum a quasi neque hic aut, veniam provident.
									Vero voluptate, blanditiis provident quasi enim distinctio ipsa ducimus reiciendis laboriosam! Repudiandae minus, omnis, dolore incidunt officia hic doloremque sequi exercitationem natus, dolorem earum debitis nulla voluptas ullam quibusdam culpa.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eveniet modi numquam ipsam, ratione illo inventore voluptate veritatis ea, a omnis, eum consectetur ducimus. Optio voluptatibus perspiciatis corporis blanditiis nostrum?
									Quod placeat, repellat ipsum, aliquam commodi suscipit eos quia, distinctio rem neque esse debitis consequuntur laboriosam. Consequuntur excepturi dolor nisi ipsum voluptatum ea! Ab distinctio, nihil rem nesciunt tenetur nobis.
									Provident, veritatis. Ipsa sunt magnam rerum exercitationem illo aspernatur tenetur consequatur totam blanditiis ex repudiandae unde laboriosam ipsum fugiat minima fuga a error, facere ab ipsam ea necessitatibus architecto iure?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam maxime dolor ipsa. Ducimus, dignissimos. Fugit officia repellendus neque ducimus voluptate temporibus repudiandae quos doloribus ipsa consectetur modi, vitae, non minima!</p>
							</div>
							<div className={`${styles.userProfilePostsClockDateAndButtonWrapper}`}>
								<div className={`${styles.userProfilePostsClockAndDateWrapper}`}>
									<img className={`${styles.userProfilePostsClock}`}
										src={'/Img/clock.svg'}
										alt={t('Світлина мистецтва')}
										onError={e => {
											e.target.onerror = null
											e.target.src = '/Img/clock.svg'
										}}
									/>
									<p className={`${styles.userProfilePostsDate}`}>01.01.2022</p>
								</div>
								<button className={`${styles.userProfilePostsButton}`}>{t('До публікації')}</button>
							</div>
						</div>
					</div>
				</div><div className={`${styles.userProfilePostsWrapper}`}>
					<div className={`${styles.userProfilePostsPicAndTextWrapper}`}>
						<div className={`${styles.userProfilePostsPicWrapper}`}>
							<img
								className={`${styles.userProfilePostsPic}`}
								src={'/Img/mainInstagramSliderUserPhoto.png'}
								alt={t('Світлина мистецтва')}
								onError={e => {
									e.target.onerror = null
									e.target.src = '/Img/mainPopularArtistsSlide.jpg'
								}}
							/>
						</div>
						<div className={`${styles.userProfilePostsTextWrapper}`}>
							<div className={`${styles.userProfilePostsTitleWrapper}`}>
								<h3 className={`${styles.userProfilePostsTitle}`}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur omnis aperiam harum tempore voluptas reiciendis.
								</h3>
							</div>
							<div className={`${styles.userProfilePostsDescriptionWrapper}`}>
								<p className={`${styles.userProfilePostsDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae id optio officiis. Nam, eius ipsam ea ipsum culpa veniam blanditiis nobis magni dignissimos a debitis, aut in iste distinctio obcaecati!
									</p>
							</div>
							<div className={`${styles.userProfilePostsClockDateAndButtonWrapper}`}>
								<div className={`${styles.userProfilePostsClockAndDateWrapper}`}>
									<img className={`${styles.userProfilePostsClock}`}
										src={'/Img/clock.svg'}
										alt={t('Світлина мистецтва')}
										onError={e => {
											e.target.onerror = null
											e.target.src = '/Img/clock.svg'
										}}
									/>
									<p className={`${styles.userProfilePostsDate}`}>01.01.2022</p>
								</div>
								<button className={`${styles.userProfilePostsButton}`}>{t('До публікації')}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
