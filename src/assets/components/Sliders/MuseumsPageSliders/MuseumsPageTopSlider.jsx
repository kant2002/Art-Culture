import React from 'react';
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/MuseumsPageSliders/MuseumsPageTopSlider.scss';

const Slide = () => {
	const { t } = useTranslation();
	return (
		<div className="MuseumsPageTopSliderCardContainer">

			<div className="MuseumsPageTopSliderCardImgWrapper">
				<img
					className="MuseumsPageTopSliderCardImg"
					src={'/Img/fullSizeRaven.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="MuseumsPageTopSliderCardTitleWrapper">
				<h3 className="MuseumsPageTopSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="MuseumsPageTopSliderCardDescriptionWrapper">
				<p className="MuseumsPageTopSliderCardDescription">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Libero vero numquam cum excepturi enim iste quis
					doloribus cupiditate? Temporibus, laboriosam quis?
					Reprehenderit velit sequi, inventore nostrum odit illum?
					Doloremque, veniam.
				</p>
			</div>

		</div>
	)
}

const Slide1 = () => {
	const { t } = useTranslation();
	return (
		<div className="MuseumsPageTopSliderCardContainer">

			<div className="MuseumsPageTopSliderCardImgWrapper">
				<img
					className="MuseumsPageTopSliderCardImg"
					src={'/Img/mainInstagramSliderIMG.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="MuseumsPageTopSliderCardTitleWrapper">
				<h3 className="MuseumsPageTopSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="MuseumsPageTopSliderCardDescriptionWrapper">
				<p className="MuseumsPageTopSliderCardDescription">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Libero vero numquam cum excepturi enim iste quis
					doloribus cupiditate? Temporibus, laboriosam quis?
					Reprehenderit velit sequi, inventore nostrum odit illum?
					Doloremque, veniam.
				</p>
			</div>

		</div>
	)
}

const Slide2 = () => {
	const { t } = useTranslation();
	return (
		<div className="MuseumsPageTopSliderCardContainer">

			<div className="MuseumsPageTopSliderCardImgWrapper">
				<img
					className="MuseumsPageTopSliderCardImg"
					src={'/Img/mainPopularArtistsSlide.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="MuseumsPageTopSliderCardTitleWrapper">
				<h3 className="MuseumsPageTopSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="MuseumsPageTopSliderCardDescriptionWrapper">
				<p className="MuseumsPageTopSliderCardDescription">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Libero vero numquam cum excepturi enim iste quis
					doloribus cupiditate? Temporibus, laboriosam quis?
					Reprehenderit velit sequi, inventore nostrum odit illum?
					Doloremque, veniam.
				</p>
			</div>

		</div>
	)
}

const Slide3 = () => {
	const { t } = useTranslation();
	return (
		<div className="MuseumsPageTopSliderCardContainer">

			<div className="MuseumsPageTopSliderCardImgWrapper">
				<img
					className="MuseumsPageTopSliderCardImg"
					src={'/Img/newsCard1.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="MuseumsPageTopSliderCardTitleWrapper">
				<h3 className="MuseumsPageTopSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="MuseumsPageTopSliderCardDescriptionWrapper">
				<p className="MuseumsPageTopSliderCardDescription">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Libero vero numquam cum excepturi enim iste quis
					doloribus cupiditate? Temporibus, laboriosam quis?
					Reprehenderit velit sequi, inventore nostrum odit illum?
					Doloremque, veniam.
				</p>
			</div>

		</div>
	)
}

const MuseumsPageTopSlider = () => {
	const { t } = useTranslation();
	return (
		<div className="MuseumsPageTopSliderContainer">
			<div className="MuseumsPageTopSliderWrapper">
				<div className="MuseumsPageTopSliderTopInnerWrapper">
					<div className="MuseumsPageTopSliderTitleWrapper">
						<p className="MuseumsPageTopSliderTitle">
							{t('Останні новини. Музей')}
						</p>
					</div>
					<div className="MuseumsPageTopSliderLikeAndShareWrapper">
						<div className="MuseumsPageTopSliderLikeInnerWrapper">
							<button className="MuseumsPageTopSliderLikeButton">
								<img className="MuseumsPageTopSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className="MuseumsPageTopSliderShareInnerWrapper">
							<button className="MuseumsPageTopSliderShareButtonButton">
								<img className="MuseumsPageTopSliderShareButtonImg"
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
				<div className="MuseumsPageTopSliderBottomInnerWrapper">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						slidesPerView={'auto'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
					>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide1 />
						</SwiperSlide>
						<SwiperSlide>
							<Slide2 />
						</SwiperSlide>
						<SwiperSlide>
							<Slide3 />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
					</Swiper>
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default MuseumsPageTopSlider;
