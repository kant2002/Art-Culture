import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.scss'

const Slide = ({ post, baseUrl }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()
	// TODO:Rewrite component to use navigate for post
	// const handleArtistPageClick = () => {
	// 	navigate('/ArtistPage')
	// }

	const title = currentLanguage === 'en' ? post.title_en : post.title_uk
	const content =
		(currentLanguage === 'en' ? post.content_en : post.content_uk) || ''

	const featuredMediaUrl = post.images
		? `${baseUrl}${post.images.replace('../../', '/')}`
		: '/Img/halfNewsCard.jpg'

	return (
		<div className="ArtistsPageNewsArtistsSliderCardContainer">
			<a
				className="ArtistsPageNewsArtistsSliderCardLink"
			// TODO:Rewrite component to use navigate for post	onClick={handleArtistPageClick}
			>
				<div className="ArtistsPageNewsArtistsSliderCardImgWrapper">
					<img
						className="ArtistsPageNewsArtistsSliderCardImg"
						src={featuredMediaUrl}
						alt={t('Світлина мистецтва')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>
				</div>

				<div className="ArtistsPageNewsArtistsSliderCardTitleWrapper">
					<h3 className="ArtistsPageNewsArtistsSliderCardTitle">
						{title.length > 50 ? `${title.substring(0, 50)}...` : title}
					</h3>
				</div>

				<div
					className="ArtistsPageNewsArtistsSliderCardDescriptionWrapper"
				>
					<p className="ArtistsPageNewsArtistsSliderCardDescription">
						{content.length > 100 ? `${content.substring(0, 100)}...` : content}
					</p>
				</div>
			</a>
		</div>
	)
}

const ArtistsPageNewsArtistsSlider = () => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()
	const [creatorPosts, setCreatorPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const host = window.location.hostname
	const isLocalhost = host === 'localhost' || host === '127.0.0.1'
	const baseUrl = isLocalhost
		? 'http://localhost:5000'
		: 'https://art.playukraine.com'

	useEffect(() => {
		const fetchCreatorPosts = async () => {
			try {
				const response = await axios.get('/api/posts/creators')
				console.log('Received creator posts:', response.data)
				setCreatorPosts(response.data.posts || [])
				setLoading(false)
			} catch (err) {
				console.error('Error fetching creator posts:', err)
				setError(t('Не вдалося завантажити публікації.'))
				setLoading(false)
			}
		}

		fetchCreatorPosts()
	}, [t])

	return (
		<div className="ArtistsPageNewsArtistsSliderContainer">
			<div className="ArtistsPageNewsArtistsSliderWrapper">
				<div className="ArtistsPageNewsArtistsSliderTopInnerWrapper">
					<div className="ArtistsPageNewsArtistsSliderTitleWrapper">
						<p className="ArtistsPageNewsArtistsSliderTitle">
							{t('Новини.')} &#8243;{t('Митці')}&#8243;
						</p>
					</div>
					<div
						className="ArtistsPageNewsArtistsSliderLikeAndShareWrapper"
					>
						<div
							className="ArtistsPageNewsArtistsSliderLikeInnerWrapper"
						>
							<button className="ArtistsPageNewsArtistsSliderLikeButton">
								<img
									className="ArtistsPageNewsArtistsSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div
							className="ArtistsPageNewsArtistsSliderShareInnerWrapper"
						>
							<button
								className="ArtistsPageNewsArtistsSliderShareButtonButton"
							>
								<img
									className="ArtistsPageNewsArtistsSliderShareButtonImg"
									src={'/Img/shareArrow.svg'}
									alt={t('Світлина поширити')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/shareArrow.svg'
									}}
								/>
							</button>
						</div>
					</div>
				</div>
				<div className="ArtistsPageNewsArtistsSliderBottomInnerWrapper">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						slidesPerView={'4'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={swiper => console.log(swiper)}
					>
						{loading ? (
							<SwiperSlide>
								<div className="loading">{t('Завантаження...')}</div>
							</SwiperSlide>
						) : error ? (
							<SwiperSlide>
								<div className="error">{error}</div>
							</SwiperSlide>
						) : creatorPosts.length === 0 ? (
							<SwiperSlide>
								<div className="noPosts">
									{t('Немає публікацій від митців.')}
								</div>
							</SwiperSlide>
						) : (
							creatorPosts.map(post => (
								<SwiperSlide key={post.id}>
									<Slide post={post} baseUrl={baseUrl} />
								</SwiperSlide>
							))
						)}
					</Swiper>
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default ArtistsPageNewsArtistsSlider