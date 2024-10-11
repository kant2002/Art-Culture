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

			<div className="MuseumsPageTopSliderCardWrapper">

				<div className="MuseumsPageTopSliderCardImgWrapper">

					<img
						className="MuseumsPageTopSliderCardImg"
						src={'/Img/mainBanner.jpeg'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
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
// 	)
// }

// const Slide2 = () => {
// 	const { t } = useTranslation();
// 	return (
// 	)
// }

// const Slide3 = () => {
// 	const { t } = useTranslation();
// 	return (
// 	)
// }

const MuseumsPageTopSlider = () => {
	// const { t } = useTranslation();
	return (
		<div className="MuseumsPageTopSliderContainer">

			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={0}
				slidesPerView={'1'}
				navigation
				pagination={{ clickable: false, type: 'fraction' }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				<SwiperSlide>
					<Slide />
					{/* </SwiperSlide>
				<SwiperSlide>
					<Slide1 />
				</SwiperSlide>
				<SwiperSlide>
					<Slide2 />
				</SwiperSlide>
				<SwiperSlide>
					<Slide3 /> */}
				</SwiperSlide>
			</Swiper>

			<div className={'${swiper-button-prev}'}></div>
			<div className={'${swiper-pagination}'}></div>
			<div className={'${swiper-button-next}'}></div>

		</div>
	)
}

export default MuseumsPageTopSlider;
