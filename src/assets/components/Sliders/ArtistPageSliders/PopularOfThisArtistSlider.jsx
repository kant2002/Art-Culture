// import React from 'react';
// import { useTranslation } from 'react-i18next'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react'
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // Import Swiper modules
// import { Navigation, Pagination } from 'swiper/modules'

// import '/src/styles/components/Sliders/ArtistPageSliders/PopularOfThisArtistSlider.scss';

// const Slide = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="popularOfThisArtistSliderCardContainer">

// 			<div className="popularOfThisArtistSliderCardImgWrapper">
// 				<img
// 					className="popularOfThisArtistSliderCardImg"
// 					src={'/Img/fullSizeRaven.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

//             <div className="popularOfThisArtistSliderSoldSellIconWrapper">

//                 {/* <div className="popularOfThisArtistSliderSoldIcon">
//                     <p className="popularOfThisArtistSliderSoldIconText">
//                         Sold
//                     </p>
//                 </div> */}

//                 {/* <div className="popularOfThisArtistSliderSellIcon">
//                     <p className="popularOfThisArtistSliderSellIconText">
//                         Sell
//                     </p>
//                 </div> */}

//             </div>

// 		</div>
// 	)
// }

// const Slide1 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="popularOfThisArtistSliderCardContainer">

// 			<div className="popularOfThisArtistSliderCardImgWrapper">
// 				<img
// 					className="popularOfThisArtistSliderCardImg"
// 					src={'/Img/mainInstagramSliderIMG.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

//             <div className="popularOfThisArtistSliderSoldSellIconWrapper">

//                 {/* <div className="popularOfThisArtistSliderSoldIcon">
//                     <p className="popularOfThisArtistSliderSoldIconText">
//                         Sold
//                     </p>
//                 </div> */}

//                 <div className="popularOfThisArtistSliderSellIcon">
//                     <p className="popularOfThisArtistSliderSellIconText">
//                         Sell
//                     </p>
//                 </div>

//             </div>

// 		</div>
// 	)
// }

// const Slide2 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="popularOfThisArtistSliderCardContainer">

// 			<div className="popularOfThisArtistSliderCardImgWrapper">
// 				<img
// 					className="popularOfThisArtistSliderCardImg"
// 					src={'/Img/newsCard1.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

//             <div className="popularOfThisArtistSliderSoldSellIconWrapper">

//                 <div className="popularOfThisArtistSliderSoldIcon">
//                     <p className="popularOfThisArtistSliderSoldIconText">
// 						Sold
//                     </p>
//                 </div>

//                 {/* <div className="popularOfThisArtistSliderSellIcon">
//                     <p className="popularOfThisArtistSliderSellIconText">
//                         Sell
//                     </p>
//                 </div> */}

//             </div>

// 		</div>
// 	)
// }

// const Slide3 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="popularOfThisArtistSliderCardContainer">

// 			<div className="popularOfThisArtistSliderCardImgWrapper">
// 				<img
// 					className="popularOfThisArtistSliderCardImg"
// 					src={'/Img/mainPopularArtistsSlide.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

//             <div className="popularOfThisArtistSliderSoldSellIconWrapper">

//                 {/* <div className="popularOfThisArtistSliderSoldIcon">
//                     <p className="popularOfThisArtistSliderSoldIconText">
//                         Sold
//                     </p>
//                 </div> */}

//                 <div className="popularOfThisArtistSliderSellIcon">
//                     <p className="popularOfThisArtistSliderSellIconText">
// 						Sell
//                     </p>
//                 </div>

//             </div>

// 		</div>
// 	)
// }

// const PopularOfThisArtistSlider = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="popularOfThisArtistSliderContainer">
// 			<div className="popularOfThisArtistSliderWrapper">
// 				<div className="popularOfThisArtistSliderTopInnerWrapper">
// 					<div className="popularOfThisArtistSliderTitleWrapper">
// 						<p className="popularOfThisArtistSliderTitle">
// 							{t('Популярне цього митця')}
// 						</p>
// 					</div>
// 					<div className="popularOfThisArtistSliderLikeAndShareWrapper">
// 						<div className="popularOfThisArtistSliderLikeInnerWrapper">
// 							<button className="popularOfThisArtistSliderLikeButton">
// 								<img className="popularOfThisArtistSliderLikeButtonImg"
// 									src={'/Img/likeHeart.svg'}
// 									alt={t('Світлина вподобайки')}
// 									onError={e => {
// 										e.target.onerror = null
// 										e.target.src = '/Img/likeHeart.svg'
// 									}}
// 								/>
// 							</button>
// 						</div>
// 						<div className="popularOfThisArtistSliderShareInnerWrapper">
// 							<button className="popularOfThisArtistSliderShareButtonButton">
// 								<img className="popularOfThisArtistSliderShareButtonImg"
// 									src={'/Img/shareArrow.svg'}
// 									alt={t('Світлина поширити')}
// 									onError={e => {
// 										e.target.onerror = null
// 										e.target.src = '/Img/shareArrow.svg'
// 									}}
// 								/>
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="popularOfThisArtistSliderBottomInnerWrapper">
// 					<Swiper
// 						modules={[Navigation, Pagination]}
// 						spaceBetween={0}
// 						slidesPerView={'auto'}
// 						navigation
// 						pagination={{ clickable: false, type: 'fraction' }}
// 						onSlideChange={() => console.log('slide change')}
// 						onSwiper={(swiper) => console.log(swiper)}
// 					>
// 						<SwiperSlide>
// 							<Slide />
// 						</SwiperSlide>
// 						<SwiperSlide>
// 							<Slide1 />
// 						</SwiperSlide>
// 						<SwiperSlide>
// 							<Slide2 />
// 						</SwiperSlide>
// 						<SwiperSlide>
// 							<Slide3 />
// 						</SwiperSlide>
// 						<SwiperSlide>
// 							<Slide />
// 						</SwiperSlide>
// 						<SwiperSlide>
// 							<Slide />
// 						</SwiperSlide>
// 						<SwiperSlide>
// 							<Slide />
// 						</SwiperSlide>
// 					</Swiper>
// 					<div className={'${swiper-button-prev}'}></div>
// 					<div className={'${swiper-pagination}'}></div>
// 					<div className={'${swiper-button-next}'}></div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default PopularOfThisArtistSlider;


import React from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// Import Swiper modules
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import '/src/styles/components/Sliders/ArtistPageSliders/PopularOfThisArtistSlider.scss'
const PopularOfThisArtistSlider = ({ products, baseUrl }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	const handleProductPreviewClick = productId => {
		navigate(`/products/${productId}`)

		// If no products are available, display a message
		if (!products || products.length === 0) {
			return (
				<div className='popular-of-this-artist-slider-container'>
					<p>{t('У цього митця немає продуктів для відображення.')}</p>
				</div>
			)
		}
	}
	return (
		<div className='popularOfThisArtistSliderContainer'>
			<div className='popularOfThisArtistSliderWrapper'>
				<div className='popularOfThisArtistSliderTopInnerWrapper'>
					<div className='popularOfThisArtistSliderTitleWrapper'>
						<p className='popularOfThisArtistSliderTitle'>
							{t('Популярне цього митця')}
						</p>
					</div>
					<div className='popularOfThisArtistSliderLikeAndShareWrapper'>
						<div className='popularOfThisArtistSliderLikeInnerWrapper'>
							<button className='popularOfThisArtistSliderLikeButton'>
								<img
									className='popularOfThisArtistSliderLikeButtonImg'
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className='popularOfThisArtistSliderShareInnerWrapper'>
							<button className='popularOfThisArtistSliderShareButtonButton'>
								<img
									className='popularOfThisArtistSliderShareButtonImg'
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
				<div className='popularOfThisArtistSliderBottomInnerWrapper'>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={'auto'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={swiper => console.log(swiper)}
					>
						{products.map(product => {
							const title =
								currentLanguage === 'en'
									? product.title_en || product.title
									: product.title_uk || product.title
							const description =
								currentLanguage === 'en'
									? product.description_en || product.description
									: product.description_uk || product.description

							const imageUrl =
								product.images && product.images.length > 0
									? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
									: '/Img/defaultProductImage.jpg' // Fallback imageide>
							return (
								<SwiperSlide key={product.id}>
									<div className='product-slide-card-wrapper'>
										<div className='product-slide-card-inner-wrapper'>
											<img
												className='product-slide-card-img'
												src={imageUrl}
												alt={title}
												onClick={() => handleProductPreviewClick(product.id)}
												onError={e => {
													e.target.onerror = null
													e.target.src = '/Img/defaultProductImage.jpg'
												}}
											/>
										</div>
										<div className='product-slide-card-absolute-wrapper'>
											<div className='product-slide-card-button-wrapper'>
												<button
													className='product-slide-card-button'
													onClick={() => handleProductPreviewClick(product.id)}
												>
													{t('Огляд')}
												</button>
											</div>
											<div className='product-slide-card-title-wrapper'>
												<h3 className='product-slide-card-title'>
													{title.length > 50
														? `${title.substring(0, 50)}...`
														: title}
												</h3>
											</div>
											<div className='product-slide-card-description-wrapper'>
												<p className='product-slide-card-description'>
													{description.length > 100
														? `${description.substring(0, 100)}...`
														: description}
												</p>
											</div>
										</div>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
					{/* <div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div> */}
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}
PopularOfThisArtistSlider.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title_en: PropTypes.string,
			title_uk: PropTypes.string,
			description_en: PropTypes.string,
			description_uk: PropTypes.string,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired,
					imageUrl: PropTypes.string.isRequired,
				})
			),
		})
	).isRequired,
	baseUrl: PropTypes.string.isRequired,
}
export default PopularOfThisArtistSlider