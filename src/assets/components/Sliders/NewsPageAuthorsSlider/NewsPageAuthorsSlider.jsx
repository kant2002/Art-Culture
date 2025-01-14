import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import { getBaseUrl } from '../../../../utils/helper'
import '/src/styles/components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.scss'

const Slide = ({ author, onClick }) => {
	const { t } = useTranslation()
	const baseUrl = getBaseUrl()
	return (
		<div className="newsPageAuthorsSliderCardContainer">
			<div className="newsPageAuthorsSliderCardWrapper">
				<div className="newsPageAuthorsSliderCardUserPhotoWrapper">
					<img
						className="newsPageAuthorsSliderCardUserPhoto"
						src={
							author.images
								? `${baseUrl}${author.images.replace('../../', '/')}`
								: '/Img/halfNewsCard.jpg'
						}
						alt={t('Фотографія автора')}
						loading="lazy"
						onClick={() => onClick(author.id)}
						onError={(e) => {
							e.target.onerror = null
							e.target.src =
								'/Img/mainInstagramSliderUserPhoto.png'
						}}
					/>
				</div>
				<div className="newsPageAuthorsSliderCardUserNameWrapper">
					<p className="newsPageAuthorsSliderCardUserName">
						{author.title}
					</p>
				</div>
			</div>
		</div>
	)
}

const NewsPageAuthorsSlider = () => {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [error, setError] = useState(null)
	const [authors, setAuthors] = useState({})
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCreator = async () => {
			try {
				const response = await axios.get(`/api/users/authors`)
				console.log('Received author data ', response.data)
				setAuthors(response.data.authors)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching author data', error)
				setLoading(false)
			}
		}

		fetchCreator()
	}, [])

	const handleAuthorPreviewClick = (author) => {
		navigate(`/all-author-posts/${author}`)
	}

	return (
		<div className="newsPageAuthorsSliderContainer">
			<div className="newsPageAuthorsSliderWrapper">
				<div className="newsPageAuthorsSliderTitleWrapper">
					<p className="newsPageAuthorsSliderTitle">{t('Автори')}</p>
				</div>

				<div className="newsPageAuthorsSliderInnerWrapper">
					{' '}
					{loading ? (
						<p>{t('Завантаження авторів...')}</p>
					) : error ? (
						<p>{error}</p>
					) : authors.length === 0 ? (
						<p>{t('Немає авторів для відображення.')}</p>
					) : (
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={0}
							slidesPerView={'auto'}
							navigation
							pagination={{ clickable: false, type: 'fraction' }}
							onSlideChange={() => console.log('slide change')}
							onSwiper={(swiper) => console.log(swiper)}
						>
							{authors.map((author) => (
								<SwiperSlide key={author.id}>
									<Slide
										author={author}
										onClick={handleAuthorPreviewClick}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					)}
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default NewsPageAuthorsSlider
