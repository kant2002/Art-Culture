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

import '/src/styles/components/Sliders/ArtistsPageSliders/PopularArtsSlider.scss';

const Slide = () => {
	const { t } = useTranslation();
	return (
		<div className="PopularArtsSliderCardWrapper">
			<div className="PopularArtsSliderCardInnerWrapper">
				<img
					className="PopularArtsSliderCardImg"
					src={'/Img/PopularArtsSliderIMG.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/mainPopularArtistsSlide.jpg'
					}}
				/>
			</div>
			<div className="PopularArtsSliderCardAbsoluteWrapper">
				<div className="PopularArtsSliderCardButtonWrapper">
					<button className="PopularArtsSliderCardButton">
						{t('Огляд')}
					</button>
				</div>
				<div className="PopularArtsSliderCardTitleWrapper">
					<h3 className="PopularArtsSliderCardTitle">
						Lorem Ipsum
					</h3>
				</div>
				<div className="PopularArtsSliderCardDescriptionWrapper">
					<p className="PopularArtsSliderCardDescription">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Libero vero numquam cum excepturi enim iste quis
						doloribus cupiditate? Temporibus, laboriosam quis?
						Reprehenderit velit sequi, inventore nostrum odit illum?
						Doloremque, veniam.
					</p>
				</div>
			</div>
		</div>
	)
}

const PopularArtsSlider = () => {
	const { t } = useTranslation();
	return (
		<div className="PopularArtsSliderContainer">
			<div className="PopularArtsSliderWrapper">
				<div className="PopularArtsSliderTopInnerWrapper">
					<div className="PopularArtsSliderTitleWrapper">
						<p className="PopularArtsSliderTitle">
							{t('Популярне.')} &#8243;{t('Мистецтво')}&#8243;
						</p>
					</div>
					<div className="PopularArtsSliderLikeAndShareWrapper">
						<div className="PopularArtsSliderLikeInnerWrapper">
							<button className="PopularArtsSliderLikeButton">
								<img className="PopularArtsSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className="PopularArtsSliderShareInnerWrapper">
							<button className="PopularArtsSliderShareButtonButton">
								<img className="PopularArtsSliderShareButtonImg"
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
				<div className="PopularArtsSliderBottomInnerWrapper">
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

export default PopularArtsSlider;
