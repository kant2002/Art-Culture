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

import '/src/styles/components/Sliders/ArtistPageSliders/ArtistPageNewsArtistsSlider.scss';

const Slide = () => {
	const { t } = useTranslation();
	return (
		<div className="artistPageNewsArtistsSliderCardContainer">

			<div className="artistPageNewsArtistsSliderCardImgWrapper">
				<img
					className="artistPageNewsArtistsSliderCardImg"
					src={'/Img/fullSizeRaven.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>


			<div className="artistPageNewsArtistsSliderCardTitleWrapper">
				<h3 className="artistPageNewsArtistsSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="artistPageNewsArtistsSliderCardDescriptionWrapper">
				<p className="artistPageNewsArtistsSliderCardDescription">
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

const ArtistPageNewsArtistsSlider = () => {
	const { t } = useTranslation();
	return (
		<div className="artistPageNewsArtistsSliderContainer">
			<div className="artistPageNewsArtistsSliderWrapper">
				<div className="artistPageNewsArtistsSliderTopInnerWrapper">
					<div className="artistPageNewsArtistsSliderTitleWrapper">
						<p className="artistPageNewsArtistsSliderTitle">
							{t('Популярне.')} &#8243;{t('Мистецтво')}&#8243;
						</p>
					</div>
					<div className="artistPageNewsArtistsSliderLikeAndShareWrapper">
						<div className="artistPageNewsArtistsSliderLikeInnerWrapper">
							<button className="artistPageNewsArtistsSliderLikeButton">
								<img className="artistPageNewsArtistsSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className="artistPageNewsArtistsSliderShareInnerWrapper">
							<button className="artistPageNewsArtistsSliderShareButtonButton">
								<img className="artistPageNewsArtistsSliderShareButtonImg"
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
				<div className="artistPageNewsArtistsSliderBottomInnerWrapper">
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

export default ArtistPageNewsArtistsSlider;
