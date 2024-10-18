import React from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.scss';

const Slide = () => {
	const { t } = useTranslation();
	
	const navigate = useNavigate()

	const handleArtistPageClick = () => {
		navigate('/ArtistPage')
	}

	return (
		<div className="ArtistsPageNewsArtistsSliderCardContainer">

			<a className="ArtistsPageNewsArtistsSliderCardLink" onClick={handleArtistPageClick}>

				<div className="ArtistsPageNewsArtistsSliderCardImgWrapper">
					<img
						className="ArtistsPageNewsArtistsSliderCardImg"
						src={'/Img/fullSizeRaven.jpg'}
						alt={t('Світлина мистецтва')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>
				</div>

				<div className="ArtistsPageNewsArtistsSliderCardTitleWrapper">
					<h3 className="ArtistsPageNewsArtistsSliderCardTitle">
						Lorem Ipsum
					</h3>
				</div>

				<div className="ArtistsPageNewsArtistsSliderCardDescriptionWrapper">
					<p className="ArtistsPageNewsArtistsSliderCardDescription">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Libero vero numquam cum excepturi enim iste quis
						doloribus cupiditate? Temporibus, laboriosam quis?
						Reprehenderit velit sequi, inventore nostrum odit illum?
						Doloremque, veniam.
					</p>
				</div>

			</a>

		</div>
	)
}

const Slide1 = () => {
	const { t } = useTranslation();
	return (
		<div className="ArtistsPageNewsArtistsSliderCardContainer">

			<div className="ArtistsPageNewsArtistsSliderCardImgWrapper">
				<img
					className="ArtistsPageNewsArtistsSliderCardImg"
					src={'/Img/mainInstagramSliderIMG.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="ArtistsPageNewsArtistsSliderCardTitleWrapper">
				<h3 className="ArtistsPageNewsArtistsSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="ArtistsPageNewsArtistsSliderCardDescriptionWrapper">
				<p className="ArtistsPageNewsArtistsSliderCardDescription">
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
		<div className="ArtistsPageNewsArtistsSliderCardContainer">

			<div className="ArtistsPageNewsArtistsSliderCardImgWrapper">
				<img
					className="ArtistsPageNewsArtistsSliderCardImg"
					src={'/Img/mainPopularArtistsSlide.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="ArtistsPageNewsArtistsSliderCardTitleWrapper">
				<h3 className="ArtistsPageNewsArtistsSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="ArtistsPageNewsArtistsSliderCardDescriptionWrapper">
				<p className="ArtistsPageNewsArtistsSliderCardDescription">
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
		<div className="ArtistsPageNewsArtistsSliderCardContainer">

			<div className="ArtistsPageNewsArtistsSliderCardImgWrapper">
				<img
					className="ArtistsPageNewsArtistsSliderCardImg"
					src={'/Img/newsCard1.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/public/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className="ArtistsPageNewsArtistsSliderCardTitleWrapper">
				<h3 className="ArtistsPageNewsArtistsSliderCardTitle">
					Lorem Ipsum
				</h3>
			</div>

			<div className="ArtistsPageNewsArtistsSliderCardDescriptionWrapper">
				<p className="ArtistsPageNewsArtistsSliderCardDescription">
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

const ArtistsPageNewsArtistsSlider = () => {
	const { t } = useTranslation();
	return (
		<div className="ArtistsPageNewsArtistsSliderContainer">
			<div className="ArtistsPageNewsArtistsSliderWrapper">
				<div className="ArtistsPageNewsArtistsSliderTopInnerWrapper">
					<div className="ArtistsPageNewsArtistsSliderTitleWrapper">
						<p className="ArtistsPageNewsArtistsSliderTitle">
							{t('Новини.')} &#8243;{t('Митці')}&#8243;
						</p>
					</div>
					<div className="ArtistsPageNewsArtistsSliderLikeAndShareWrapper">
						<div className="ArtistsPageNewsArtistsSliderLikeInnerWrapper">
							<button className="ArtistsPageNewsArtistsSliderLikeButton">
								<img className="ArtistsPageNewsArtistsSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className="ArtistsPageNewsArtistsSliderShareInnerWrapper">
							<button className="ArtistsPageNewsArtistsSliderShareButtonButton">
								<img className="ArtistsPageNewsArtistsSliderShareButtonImg"
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
				<div className="ArtistsPageNewsArtistsSliderBottomInnerWrapper">
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

export default ArtistsPageNewsArtistsSlider;
