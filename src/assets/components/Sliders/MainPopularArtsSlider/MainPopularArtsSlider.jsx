import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import '@styles/components/Sliders/Base/PopularSlider.scss'
import { getBaseUrl } from '../../../../utils/helper'
import LikeAndShare from '@components/Blocks/LikeAndShare'
import sliderStyles from '@styles/components/Blocks/Slider.module.scss'

const Slide = ({ product, baseUrl }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	const handleProductClick = () => {
		navigate(`/products/${product.id}`) // Adjust the route as per your application
	}

	const title =
		currentLanguage === 'en' ? product.title_en : product.title_ru || ''
	const description =
		currentLanguage === 'en'
			? product.description_en
			: product.description_uk || ''
	const specs =
		currentLanguage === 'en' ? product.specs_en : product.specs_uk || ''

	const imageUrl =
		product.images && product.images.length > 0
			? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
			: '/Img/defaultProductImage.jpg' // Fallback image

	return (
		<div className='PopularSliderCardWrapper'>
			<div className='PopularSliderCardInnerWrapper'>
				<img
					className='PopularSliderCardImg'
					src={imageUrl}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/PopularSlide.jpg'
					}}
				/>
			</div>
			<div className='PopularSliderCardAbsoluteWrapper'>
				<div className='PopularSliderCardButtonWrapper'>
					<button className='PopularSliderCardButton'>
						{t('Огляд')}
					</button>
				</div>
				<div className='PopularSliderCardTitleWrapper'>
					<h3 className='PopularSliderCardTitle'>
						{''}
						{title.length > 50 ? `${title.substring(0, 50)}...` : title}
					</h3>
				</div>
				<div className='PopularSliderCardDescriptionWrapper'>
					<p className='PopularSliderCardDescription'>
						{''}
						{description.length > 100
							? `${description.substring(0, 100)}...`
							: description}
					</p>
				</div>
			</div>
		</div>
	)
}

const MainPopularArtistsSlider = () => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const baseUrl = getBaseUrl()

	useEffect(() => {
		const fetchCreatorProducts = async () => {
			try {
				const response = await axios.get('/api/products/creators-products')
				console.log('Received creator products:', response.data)
				setProducts(response.data.products || [])
				setLoading(false)
			} catch (err) {
				console.error('Error fetching creator products:', err)
				setError(t('Не вдалося завантажити продукти.'))
				setLoading(false)
			}
		}

		fetchCreatorProducts()
	}, [t])
	return (
		<div className='PopularSliderContainer'>
			<div className='PopularSliderWrapper'>
				<div className='PopularSliderTopInnerWrapper'>
					<div className='PopularSliderTitleWrapper'>
						<p className='PopularSliderTitle'>
							{t('Популярне.')} &#8243;{t('Мистецтво')}&#8243;
						</p>
					</div>					
					<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
				</div>
				<div className='PopularSliderBottomInnerWrapper'>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						slidesPerView={'auto'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={swiper => console.log(swiper)}
					>
						{loading ? (
							<SwiperSlide>
								<div className='loading'>{t('Завантаження...')}</div>
							</SwiperSlide>
						) : error ? (
							<SwiperSlide>
								<div className='error'>{error}</div>
							</SwiperSlide>
						) : products.length === 0 ? (
							<SwiperSlide>
								<div className='noProducts'>
									{t('Немає продуктів від митців.')}
								</div>
							</SwiperSlide>
						) : (
							products.map(product => (
								<SwiperSlide key={product.id}>
									<Slide product={product} baseUrl={baseUrl} />
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

export default MainPopularArtistsSlider
