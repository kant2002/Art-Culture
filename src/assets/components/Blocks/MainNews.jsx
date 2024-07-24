// import React from 'react'
// import styles from '../../../styles/components/Blocks/MainNews.module.scss'

// function MainNews() {
// 	return (
// 		<div className={`${styles.mainPageNewsContainer}`}>
// 			<div className={`${styles.mainPageNewsTitleWithButton}`}>
// 				<h3 className={`${styles.mainPageNewsTitle}`}>новини</h3>
// 				<div
// 					className={`${styles.mainPageNewsButtonWrapper} ${styles.desktopButtonWrapper}`}
// 				>
// 					<button className={`${styles.mainPageNewsButton}`}>
// 						<p className={`${styles.mainPageNewsButtonTitle}`}>Усi новини</p>
// 						<img
// 							className={`${styles.mainPageNewsButtonImg}`}
// 							src={'/src/img/buttonArrow.svg'}
// 							alt='Свiтлина музею'
// 							onError={e => {
// 								e.target.onerror = null
// 								e.target.src = '/src/img/buttonArrow.svg'
// 							}}
// 						></img>
// 					</button>
// 				</div>
// 			</div>
// 			<div className={`${styles.mainPageNewsCardsWrapper}`}>
// 				<div className={`${styles.mainPageNewsCard} ${styles.firstCard}`}>
// 					<div className={`${styles.cardImgWrapper}`}>
// 						<img
// 							className={`${styles.cardImg} ${styles.firstCardImg}`}
// 							src={'/src/img/halfNewsCard.jpg'}
// 							alt='Свiтлина музею'
// 							onError={e => {
// 								e.target.onerror = null
// 								e.target.src = '/src/img/newsCardERROR.jpg'
// 							}}
// 						/>
// 					</div>
// 					<div className={`${styles.cardTextWrapper}`}>
// 						<div className={`${styles.cardTitleWrapper}`}>
// 							<h3 className={`${styles.cardTitle} ${styles.firstCardTitle}`}>
// 								Lorem Ipsum - це текст-"риба", що використовується в дизайні.
// 							</h3>
// 						</div>
// 						<div className={`${styles.cardDescriptioneWrapper}`}>
// 							<p
// 								className={`${styles.cardDescription} ${styles.firstCardDescription}`}
// 							>
// 								Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя,
// 								коли невідомий друкар взяв шрифтову гранку та склав на ній
// 								підбірку зразків шрифтів. "Риба" не тільки успішно пережила
// 								п'ять століть, але й прижилася
// 							</p>
// 						</div>
// 					</div>
// 					<div className={`${styles.cardClockAndDateWrapper}`}>
// 						<div className={`${styles.cardClockAndDateInner}`}>
// 							<div className={`${styles.cardClockImgWrapper}`}>
// 								<img
// 									className={`${styles.cardClockImg}`}
// 									src={'/src/img/clock.svg'}
// 									alt='Свiтлина годинника'
// 									onError={e => {
// 										e.target.onerror = null
// 										e.target.src = '/src/img/clock.svg'
// 									}}
// 								/>
// 							</div>
// 							<div className={`${styles.cardDateWrapper}`}>
// 								<p className={`${styles.cardDate}`}>26.09.23</p>
// 							</div>
// 						</div>
// 						<div className={`${styles.cardReadMoreWrapper}`}>
// 							<a className={`${styles.cardReadMoreLink}`}>Читати далi</a>
// 						</div>
// 					</div>
// 				</div>
// 				<div className={`${styles.mainPageNewsCard} ${styles.secondCard}`}>
// 					<div className={`${styles.cardImgWrapper}`}>
// 						<img
// 							className={`${styles.cardImg} ${styles.thirdCardImg}`}
// 							src={'/src/img/halfNewsCard1.jpg'}
// 							alt='Свiтлина музею'
// 							onError={e => {
// 								e.target.onerror = null
// 								e.target.src = '/src/img/newsCardERROR.jpg'
// 							}}
// 						/>
// 					</div>
// 					<div className={`${styles.cardTextWrapper}`}>
// 						<div className={`${styles.cardTitleWrapper}`}>
// 							<h3 className={`${styles.cardTitle} ${styles.secondCardTitle}`}>
// 								Lorem Ipsum - це текст-"риба", що використовується в дизайні.
// 							</h3>
// 						</div>
// 						<div className={`${styles.cardDescriptioneWrapper}`}>
// 							<p
// 								className={`${styles.cardDescription} ${styles.secondCardDescription}`}
// 							>
// 								Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя,
// 								коли невідомий друкар взяв шрифтову гранку та склав на ній
// 								підбірку зразків шрифтів. "Риба" не тільки успішно пережила
// 								п'ять століть, але й прижилася
// 							</p>
// 						</div>
// 					</div>
// 					<div className={`${styles.cardClockAndDateWrapper}`}>
// 						<div className={`${styles.cardClockAndDateInner}`}>
// 							<div className={`${styles.cardClockImgWrapper}`}>
// 								<img
// 									className={`${styles.cardClockImg}`}
// 									src={'/src/img/clock.svg'}
// 									alt='Свiтлина годинника'
// 									onError={e => {
// 										e.target.onerror = null
// 										e.target.src = '/src/img/clock.svg'
// 									}}
// 								/>
// 							</div>
// 							<div className={`${styles.cardDateWrapper}`}>
// 								<p className={`${styles.cardDate}`}>26.09.23</p>
// 							</div>
// 						</div>
// 						<div className={`${styles.cardReadMoreWrapper}`}>
// 							<a className={`${styles.cardReadMoreLink}`}>Читати далi</a>
// 						</div>
// 					</div>
// 				</div>
// 				<div className={`${styles.mainPageNewsCard} ${styles.thirdCard}`}>
// 					<div className={`${styles.cardImgWrapper}`}>
// 						<img
// 							className={`${styles.cardImg} ${styles.thirdCardImg}`}
// 							src={'/src/img/newsCard3.jpg'}
// 							alt='Свiтлина музею'
// 							onError={e => {
// 								e.target.onerror = null
// 								e.target.src = '/src/img/newsCardERROR.jpg'
// 							}}
// 						/>
// 					</div>
// 					<div className={`${styles.cardTextWrapper}`}>
// 						<div className={`${styles.cardTitleWrapper}`}>
// 							<h3 className={`${styles.cardTitle} ${styles.thirdCardTitle}`}>
// 								Lorem Ipsum - це текст-"риба", що використовується в дизайні.
// 							</h3>
// 						</div>
// 						<div className={`${styles.cardDescriptioneWrapper}`}>
// 							<p
// 								className={`${styles.cardDescription} ${styles.thirdCardDescription}`}
// 							>
// 								Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя,
// 								коли невідомий друкар взяв шрифтову гранку та склав на ній
// 								підбірку зразків шрифтів. "Риба" не тільки успішно пережила
// 								п'ять століть, але й прижилася
// 							</p>
// 						</div>
// 					</div>
// 					<div className={`${styles.cardClockAndDateWrapper}`}>
// 						<div className={`${styles.cardClockAndDateInner}`}>
// 							<div className={`${styles.cardClockImgWrapper}`}>
// 								<img
// 									className={`${styles.cardClockImg}`}
// 									src={'/src/img/clock.svg'}
// 									alt='Свiтлина годинника'
// 									onError={e => {
// 										e.target.onerror = null
// 										e.target.src = '/src/img/clock.svg'
// 									}}
// 								/>
// 							</div>
// 							<div className={`${styles.cardDateWrapper}`}>
// 								<p className={`${styles.cardDate}`}>26.09.23</p>
// 							</div>
// 						</div>
// 						<div className={`${styles.cardReadMoreWrapper}`}>
// 							<a className={`${styles.cardReadMoreLink}`}>Читати далi</a>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div
// 				className={`${styles.mainPageNewsButtonWrapper} ${styles.mobileButtonWrapper}`}
// 			>
// 				<button className={`${styles.mainPageNewsButton}`}>
// 					<p className={`${styles.mainPageNewsButtonTitle}`}>Усi новини</p>
// 					<img
// 						className={`${styles.mainPageNewsButtonImg}`}
// 						src={'/src/img/buttonArrow.svg'}
// 						alt='Свiтлина музею'
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/src/img/buttonArrow.svg'
// 						}}
// 					></img>
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// export default MainNews

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '/src/styles/components/Blocks/MainNews.module.scss'

function MainNews() {
	const [posts, setPosts] = useState([])
	const [media, setMedia] = useState({})

	useEffect(() => {
		// Запит на отримання постів з медіа-даними
		axios
			.get('https://zimbabaluba.pp.ua/wp-json/wp/v2/posts?_embed')
			.then(response => {
				console.log('Отримані дані постів:', response.data)
				setPosts(response.data)
			})
			.catch(error => {
				console.error('Помилка при завантаженні постів', error)
			})

		// Запит на отримання медіа
		axios
			.get('https://zimbabaluba.pp.ua/wp-json/wp/v2/media')
			.then(response => {
				const mediaMap = response.data.reduce((acc, mediaItem) => {
					acc[mediaItem.id] = mediaItem.source_url
					return acc
				}, {})
				console.log('Отримані медіа-дані:', mediaMap)
				setMedia(mediaMap)
			})
			.catch(error => {
				console.error('Помилка при завантаженні медіа', error)
			})
	}, [])

	return (
		<div className={`${styles.mainPageNewsContainer}`}>
			<div className={`${styles.mainPageNewsTitleWithButton}`}>
				<h3 className={`${styles.mainPageNewsTitle}`}>новини</h3>
				<div
					className={`${styles.mainPageNewsButtonWrapper} ${styles.desktopButtonWrapper}`}
				>
					<button className={`${styles.mainPageNewsButton}`}>
						<p className={`${styles.mainPageNewsButtonTitle}`}>Усi новини</p>
						<img
							className={`${styles.mainPageNewsButtonImg}`}
							src={'/src/img/halfNewsCard.jpg'}
							alt='Свiтлина музею'
							onError={e => {
								e.target.onerror = null
								e.target.src = '/img/buttonArrow.svg'
							}}
						></img>
					</button>
				</div>
			</div>
			<div className={`${styles.mainPageNewsCardsWrapper}`}>
				{posts.map((post, index) => {
					// Логування даних для перевірки
					console.log('Пост:', post)

					const featuredMediaId = post.featured_media
					const featuredMediaUrl =
						media[featuredMediaId] || '/src/img/halfNewsCard.jpg'

					console.log('Витягнуте медіа:', featuredMediaUrl)

					return (
						<div
							key={post.id}
							className={`${styles.mainPageNewsCard} ${index === 0 ? styles.firstCard : index === 1 ? styles.secondCard : styles.thirdCard}`}
						>
							<div className={`${styles.cardImgWrapper}`}>
								<img
									className={`${styles.cardImg} ${index === 0 ? styles.firstCardImg : index === 1 ? styles.secondCardImg : index === 2 ? styles.thirdCardImg : styles.fourthCardImg}`}
									src={featuredMediaUrl}
									alt='Свiтлина музею'
									onError={e => {
										e.target.onerror = null
										e.target.src = '/src/img/newsCardERROR.jpg'
									}}
								/>
							</div>
							<div className={`${styles.cardTextWrapper}`}>
								<div className={`${styles.cardTitleWrapper}`}>
									<h3
										className={`${styles.cardTitle} ${index === 0 ? styles.firstCardTitle : index === 1 ? styles.secondCardTitle : index === 2 ? styles.thirdCardTitle : styles.fourthCardTitle}`}
										dangerouslySetInnerHTML={{ __html: post.title.rendered }}
									/>
								</div>
								<div className={`${styles.cardDescriptioneWrapper}`}>
									<p
										className={`${styles.cardDescription} ${index === 0 ? styles.firstCardDescription : index === 1 ? styles.secondCardDescription : styles.thirdCardDescription}`}
										dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
									/>
								</div>
							</div>
							<div className={`${styles.cardClockAndDateWrapper}`}>
								<div className={`${styles.cardClockAndDateInner}`}>
									<div className={`${styles.cardClockImgWrapper}`}>
										<img
											className={`${styles.cardClockImg}`}
											src={'/img/clock.svg'}
											alt='Свiтлина годинника'
											onError={e => {
												e.target.onerror = null
												e.target.src = '/src/img/clock.svg'
											}}
										/>
									</div>
									<div className={`${styles.cardDateWrapper}`}>
										<p className={`${styles.cardDate}`}>
											{new Date(post.date).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className={`${styles.cardReadMoreWrapper}`}>
									<a href={post.link} className={`${styles.cardReadMoreLink}`}>
										Читати далi
									</a>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			<div
				className={`${styles.mainPageNewsButtonWrapper} ${styles.mobileButtonWrapper}`}
			>
				<button className={`${styles.mainPageNewsButton}`}>
					<p className={`${styles.mainPageNewsButtonTitle}`}>Усi новини</p>
					<img
						className={`${styles.mainPageNewsButtonImg}`}
						src={'/img/buttonArrow.svg'}
						alt='Свiтлина музею'
						onError={e => {
							e.target.onerror = null
							e.target.src = '/img/buttonArrow.svg'
						}}
					></img>
				</button>
			</div>
		</div>
	)
}

export default MainNews
