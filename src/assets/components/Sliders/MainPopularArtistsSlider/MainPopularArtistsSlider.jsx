import React from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import '/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSliderSwiper.scss';
import '/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSliderNavigation.scss';
import '/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSliderPagination.scss';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import styles from '/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSlider.module.scss'

const Slide = () => {
	const { t } = useTranslation()

	return (
		<div className={'${styles.mainPopularArtistsSliderContainer}'}>
			<div className={'${styles.mainPopularArtistsSliderWrapper}'}>
				<div className={'${styles.mainPopularArtistsSliderTopInnerWrapper}'}>
					<div className={'${styles.mainPopularArtistsSliderTitleWrapper}'}>
						<p className={'${styles.mainPopularArtistsSliderTitle}'}>{t('Популярне. "Мистецтво"')}</p>
					</div>
					<div className={'${styles.mainPopularArtistsSliderLikeAndShareWrapper>
						< button className='socialLikeAndShareInner__likeButton circleButton'>
						<img
							className='likeButtonImg'
							src='/Img/likeHeart.svg'
							alt='Like' />
					</>
					<button className='socialLikeAndShareInner__shareButton circleButton'>
						<img
							className='shareButtonImg'
							src='/Img/shareArrow.svg'
							alt='Share' />
					</button>
				</div>
			</div>

			<div className={'${styles.mainPopularArtistsSliderBottomInnerWrapper}'}>

			</div>
	)
}

const MainPopularArtistsSlider = () => {
	const { t } = useTranslation()
	return (
		<div className={`${styles.mainPopularArtistsSliderContainer}`}>




			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={0}
				slidesPerView={'auto'}
				navigation
				pagination={{ clickable: false, type: 'fraction' }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={swiper => console.log(swiper)}
			>
				<SwiperSlide>
					<Slide />
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
	)
}

export default MainPopularArtistsSlider
