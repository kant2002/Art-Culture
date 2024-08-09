import React from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import '/src/styles/components/Sliders/MainInstagramSlider/MainInstagramSliderSwiper.scss';
import '/src/styles/components/Sliders/MainInstagramSlider/MainInstagramSliderNavigation.scss';
import '/src/styles/components/Sliders/MainInstagramSlider/MainInstagramSliderPagination.scss';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import styles from '/src/styles/components/Sliders/MainInstagramSlider/MainInstagramSlider.module.scss'

const Slide = () => {
	const { t } = useTranslation()
	return (
		<div className={`${styles.mainInstagramSliderCardWrapper}`}>
			<div className={`${styles.mainInstagramSliderCardTopInnerWrapper}`}>
				<div className={`${styles.mainInstagramSliderCardUserPhotoWrapper}`}>
					<img
						className={`${styles.mainInstagramSliderCardUserPhoto}`}
						src={'/Img/mainInstagramSliderUserPhoto.png'}
						alt={t('Фотографія автора')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/mainInstagramSliderUserPhoto.png'
						}}
					/>
				</div>
				<div className={`${styles.mainInstagramSliderCardUserNameWrapper}`}>
					<p className={`${styles.mainInstagramSliderCardUserName}`}>
						ukr_art&culture
					</p>
				</div>
				<div className={`${styles.mainInstagramSliderCardDateWrapper}`}>
					<p className={`${styles.mainInstagramSliderCardDate}`}>3 days ago</p>
				</div>
			</div>
			<div className={`${styles.mainInstagramSliderCardMiddleInnerWrapper}`}>
				<img
					className={`${styles.mainInstagramSliderCardImg}`}
					src={'/Img/mainInstagramSliderIMG.jpg'}
					alt={t('Світлина автора')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/mainInstagramSliderIMG.jpg'
					}}
				/>
			</div>
			<div className={`${styles.mainInstagramSliderCardBottomInnerWrapper}`}>
				<div className={`${styles.mainInstagramSliderCardDescriptionWrapper}`}>
					<p className={`${styles.mainInstagramSliderCardDescription}`}>
						{t(
							'Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів.'
						)}
					</p>
				</div>
			</div>
		</div>
	)
}

const MainInstagramSlider = () => {
	const { t } = useTranslation()
	return (
		<div className={`${styles.mainInstagramSliderContainer}`}>
			<div className={`${styles.mainInstagramSliderWrapper}`}>
				<div className={`${styles.mainInstagramSliderTopInnerWrapper}`}>
					<div className={`${styles.mainInstagramSliderTitleWrapper}`}>
						<p className={`${styles.mainInstagramSliderTitle}`}>
							{t('on instagram')}
						</p>
					</div>
					<div className={`${styles.mainInstagramSliderFollowUsWrapper}`}>
						<div
							className={`${styles.mainInstagramSliderFollowUsButtonWrapper}`}
						>
							<button className={`${styles.mainInstagramSliderFollowUsButton}`}>
								<p
									className={`${styles.mainInstagramSliderFollowUsButtonText}`}
								>
									{t('Follow us')}
								</p>
							</button>
						</div>
					</div>
				</div>
				<div className={`${styles.mainInstagramSliderMiddleInnerWrapper}`}>
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
			</div>
		</div>
	)
}

export default MainInstagramSlider
