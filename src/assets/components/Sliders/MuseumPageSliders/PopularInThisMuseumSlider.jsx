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

import '/src/styles/components/Sliders/MuseumPageSliders/PopularInThisMuseumSlider.scss';

const Slide = () => {
	const { t } = useTranslation();
	return (
		<div className="popularInThisMuseumSliderCardContainer">

			<div className="popularInThisMuseumSliderCardImgWrapper">
				<img
					className="popularInThisMuseumSliderCardImg"
					src={'/Img/fullSizeRaven.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

            <div className="popularInThisMuseumSliderSoldSellIconWrapper">

                {/* <div className="popularInThisMuseumSliderSoldIcon">
                    <p className="popularInThisMuseumSliderSoldIconText">
                        Sold
                    </p>
                </div> */}

                {/* <div className="popularInThisMuseumSliderSellIcon">
                    <p className="popularInThisMuseumSliderSellIconText">
                        Sell
                    </p>
                </div> */}

            </div>

		</div>
	)
}

const Slide1 = () => {
	const { t } = useTranslation();
	return (
		<div className="popularInThisMuseumSliderCardContainer">

			<div className="popularInThisMuseumSliderCardImgWrapper">
				<img
					className="popularInThisMuseumSliderCardImg"
					src={'/Img/mainInstagramSliderIMG.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

            <div className="popularInThisMuseumSliderSoldSellIconWrapper">

                {/* <div className="popularInThisMuseumSliderSoldIcon">
                    <p className="popularInThisMuseumSliderSoldIconText">
                        Sold
                    </p>
                </div> */}

                <div className="popularInThisMuseumSliderSellIcon">
                    <p className="popularInThisMuseumSliderSellIconText">
                        Sell
                    </p>
                </div>

            </div>

		</div>
	)
}

const Slide2 = () => {
	const { t } = useTranslation();
	return (
		<div className="popularInThisMuseumSliderCardContainer">

			<div className="popularInThisMuseumSliderCardImgWrapper">
				<img
					className="popularInThisMuseumSliderCardImg"
					src={'/Img/newsCard1.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

            <div className="popularInThisMuseumSliderSoldSellIconWrapper">

                <div className="popularInThisMuseumSliderSoldIcon">
                    <p className="popularInThisMuseumSliderSoldIconText">
						Sold
                    </p>
                </div>

                {/* <div className="popularInThisMuseumSliderSellIcon">
                    <p className="popularInThisMuseumSliderSellIconText">
                        Sell
                    </p>
                </div> */}

            </div>

		</div>
	)
}

const Slide3 = () => {
	const { t } = useTranslation();
	return (
		<div className="popularInThisMuseumSliderCardContainer">

			<div className="popularInThisMuseumSliderCardImgWrapper">
				<img
					className="popularInThisMuseumSliderCardImg"
					src={'/Img/mainPopularArtistsSlide.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

            <div className="popularInThisMuseumSliderSoldSellIconWrapper">

                {/* <div className="popularInThisMuseumSliderSoldIcon">
                    <p className="popularInThisMuseumSliderSoldIconText">
                        Sold
                    </p>
                </div> */}

                <div className="popularInThisMuseumSliderSellIcon">
                    <p className="popularInThisMuseumSliderSellIconText">
						Sell
                    </p>
                </div>

            </div>

		</div>
	)
}

const PopularInThisMuseumSlider = () => {
	const { t } = useTranslation();
	return (
		<div className="popularInThisMuseumSliderContainer">
			<div className="popularInThisMuseumSliderWrapper">
				<div className="popularInThisMuseumSliderTopInnerWrapper">
					<div className="popularInThisMuseumSliderTitleWrapper">
						<p className="popularInThisMuseumSliderTitle">
							{t('Популярне цього митця')}
						</p>
					</div>
					<div className="popularInThisMuseumSliderLikeAndShareWrapper">
						<div className="popularInThisMuseumSliderLikeInnerWrapper">
							<button className="popularInThisMuseumSliderLikeButton">
								<img className="popularInThisMuseumSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className="popularInThisMuseumSliderShareInnerWrapper">
							<button className="popularInThisMuseumSliderShareButtonButton">
								<img className="popularInThisMuseumSliderShareButtonImg"
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
				<div className="popularInThisMuseumSliderBottomInnerWrapper">
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

export default PopularInThisMuseumSlider;
