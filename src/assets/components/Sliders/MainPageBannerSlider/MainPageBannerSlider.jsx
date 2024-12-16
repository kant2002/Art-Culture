import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getBaseUrl, getImageUrl } from '../../../../utils/helper'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/MainPageBannerSlider/MainPageBannerSlider.scss'

const Slide = ({ museum, baseUrl, onClick }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const featuredMediaUrl = getImageUrl(museum.images, '/Img/halfNewsCard.jpg')
	console.log('Витягнуте медіа:', featuredMediaUrl)

	return (
		<div className="MainPageBannerSliderCardContainer">
			<div className="MainPageBannerSliderCardWrapper">
				<div className="MainPageBannerSliderCardLogoWrapper">
					<img
						className="MainPageBannerSliderCardLogo"
						src={'/Img/logoMuseum_3.png'}
						alt={t('Фото музея')}
						onError={(e) => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</div>

				<div className="MainPageBannerSliderCardTitleWrapper">
					<p className="MainPageBannerSliderCardTitle">
						{museum.title}
					</p>
				</div>

				<div className="MainPageBannerSliderCardDescriptionWrapper">
					<p className="MainPageBannerSliderCardDescription">
						{museum.bio}
					</p>
				</div>

				<div className="MainPageBannerSliderCardReadMoreButtonWrapper">
					<button
						className="MainPageBannerSliderCardReadMoreButton"
						onClick={() => onClick(museum.id)}
					>
						{t('Читати далі')}
					</button>
				</div>

				<div className="MainPageBannerSliderCardImgWrapper">
					<img
						className="MainPageBannerSliderCardImg"
						src={featuredMediaUrl}
						alt={t('Фото музея')}
						onError={(e) => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</div>
			</div>
		</div>
	)
}

// const Slide1 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="MainPageBannerSliderCardContainer">

// 			<div className="MainPageBannerSliderCardWrapper">

// 				<div className="MainPageBannerSliderCardLogoWrapper">

// 					<img
// 						className="MainPageBannerSliderCardLogo"
// 						src={'/Img/logoMuseum_1.png'}
// 						alt={t('Фото музея')}
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/Img/newsCardERROR.jpg'
// 						}}
// 					/>

// 				</div>

// 				<div className="MainPageBannerSliderCardTitleWrapper">

// 					<p className="MainPageBannerSliderCardTitle">
// 						{t('Назва другого музею')}
// 					</p>

// 				</div>

// 				<div className="MainPageBannerSliderCardDescriptionWrapper">

// 					<p className="MainPageBannerSliderCardDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam deleniti odit nesciunt consequatur modi at totam impedit harum natus ratione! Aliquam illo quos, deleniti sunt sapiente molestiae aperiam dolore consequuntur?
// 						Dignissimos saepe maxime totam magnam libero at tempora. Corporis laborum, consequatur quasi reiciendis necessitatibus sapiente ipsum nobis doloremque omnis temporibus incidunt deleniti! Autem cupiditate ut veritatis, aliquid nisi iste cumque!
// 						Neque aliquam nemo accusantium saepe debitis praesentium dolor officiis in doloremque, tempora blanditiis totam impedit modi iure. Iste, impedit reiciendis. Vel fugiat asperiores reiciendis sint nisi odit accusamus sunt eius!
// 						Eum, ipsam, consequatur ex deserunt ut vitae, necessitatibus iure tempora numquam eius incidunt debitis voluptatem ea odit? Magnam, enim iure, vitae eius officiis magni fugit qui, corporis ratione illo sint!
// 						Doloribus sint architecto dicta repellat repellendus consequatur impedit deserunt ipsa laboriosam, nemo amet dolorum voluptatum quam velit aliquam incidunt exercitationem id facilis magnam vero enim tenetur animi minus. Ab, deleniti.
// 					</p>

// 				</div>

// 				<div className="MainPageBannerSliderCardReadMoreButtonWrapper">

// 					<button className="MainPageBannerSliderCardReadMoreButton">
// 						{t('Читати далі')}
// 					</button>

// 				</div>

// 				<div className="MainPageBannerSliderCardImgWrapper">

// 					<img
// 						className="MainPageBannerSliderCardImg"
// 						src={'/Img/museumPhoto_1.jpg'}
// 						alt={t('Фото музея')}
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/Img/newsCardERROR.jpg'
// 						}}
// 					/>

// 				</div>

// 			</div>

// 		</div>
// 	)
// }

// const Slide2 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="MainPageBannerSliderCardContainer">

// 			<div className="MainPageBannerSliderCardWrapper">

// 				<div className="MainPageBannerSliderCardLogoWrapper">

// 					<img
// 						className="MainPageBannerSliderCardLogo"
// 						src={'/Img/logoMuseum_2.png'}
// 						alt={t('Фото музея')}
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/Img/newsCardERROR.jpg'
// 						}}
// 					/>

// 				</div>

// 				<div className="MainPageBannerSliderCardTitleWrapper">

// 					<p className="MainPageBannerSliderCardTitle">
// 						{t('Назва третього музею')}
// 					</p>

// 				</div>

// 				<div className="MainPageBannerSliderCardDescriptionWrapper">

// 					<p className="MainPageBannerSliderCardDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam deleniti odit nesciunt consequatur modi at totam impedit harum natus ratione! Aliquam illo quos, deleniti sunt sapiente molestiae aperiam dolore consequuntur?
// 						Dignissimos saepe maxime totam magnam libero at tempora. Corporis laborum, consequatur quasi reiciendis necessitatibus sapiente ipsum nobis doloremque omnis temporibus incidunt deleniti! Autem cupiditate ut veritatis, aliquid nisi iste cumque!
// 						Neque aliquam nemo accusantium saepe debitis praesentium dolor officiis in doloremque, tempora blanditiis totam impedit modi iure. Iste, impedit reiciendis. Vel fugiat asperiores reiciendis sint nisi odit accusamus sunt eius!
// 						Eum, ipsam, consequatur ex deserunt ut vitae, necessitatibus iure tempora numquam eius incidunt debitis voluptatem ea odit? Magnam, enim iure, vitae eius officiis magni fugit qui, corporis ratione illo sint!
// 						Doloribus sint architecto dicta repellat repellendus consequatur impedit deserunt ipsa laboriosam, nemo amet dolorum voluptatum quam velit aliquam incidunt exercitationem id facilis magnam vero enim tenetur animi minus. Ab, deleniti.
// 					</p>

// 				</div>

// 				<div className="MainPageBannerSliderCardReadMoreButtonWrapper">

// 					<button className="MainPageBannerSliderCardReadMoreButton">
// 						{t('Читати далі')}
// 					</button>

// 				</div>

// 				<div className="MainPageBannerSliderCardImgWrapper">

// 					<img
// 						className="MainPageBannerSliderCardImg"
// 						src={'/Img/museumPhoto_2.jpg'}
// 						alt={t('Фото музея')}
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/Img/newsCardERROR.jpg'
// 						}}
// 					/>

// 				</div>

// 			</div>

// 		</div>
// 	)
// }

const MainPageBannerSlider = () => {
	const { t } = useTranslation()
	const [museums, setMuseums] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const baseUrl = getBaseUrl()
	useEffect(() => {
		const fetchMuseums = async () => {
			try {
				const response = await axios.get('/api/users/museums')
				console.log('Fetch museums', response.data)
				setMuseums(response.data.museums || [])
				setLoading(false)
			} catch (err) {
				console.error('Error fetching museum:', err)
				setError(t('Не вдалося завантажити.'))
				setLoading(false)
			}
		}
		fetchMuseums()
	}, [t])
	const handleMuseumPageClick = (id) => {
		console.log('Navigating to museum with id:', id)
		navigate(`/museumpage/${id}`)
	}
	return (
		<div className="MainPageBannerSliderContainer">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={0}
				slidesPerView={'1'}
				navigation
				pagination={{ clickable: false, type: 'fraction' }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{loading ? (
					<SwiperSlide>
						<div className="loading">{t('Завантаження...')}</div>
					</SwiperSlide>
				) : error ? (
					<SwiperSlide>
						<div className="error">{error}</div>
					</SwiperSlide>
				) : museums.length === 0 ? (
					<SwiperSlide>
						<div className="noProducts">{t('Немає музеїв.')}</div>
					</SwiperSlide>
				) : (
					museums.map((museum) => (
						<SwiperSlide key={museum.id}>
							<Slide
								museum={museum}
								baseUrl={baseUrl}
								onClick={handleMuseumPageClick}
							/>
						</SwiperSlide>
					))
				)}
			</Swiper>

			<div className={'${swiper-button-prev}'}></div>
			<div className={'${swiper-pagination}'}></div>
			<div className={'${swiper-button-next}'}></div>
		</div>
	)
}

export default MainPageBannerSlider
