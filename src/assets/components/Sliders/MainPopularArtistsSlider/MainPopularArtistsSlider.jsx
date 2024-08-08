import React from "react";
import { useTranslation } from "react-i18next";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSliderSwiper.scss";
import "/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSliderNavigation.scss";
import "/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSliderPagination.scss";

// Import Swiper modules
import { Navigation, Pagination } from "swiper/modules";

import styles from "/src/styles/components/Sliders/MainPopularArtistsSlider/MainPopularArtistsSlider.module.scss";

const Slide = () => {
	const { t } = useTranslation();

	return (
		<div className={`${styles.mainPopularArtistsSliderCardWrapper}`}>
			<div className={`${styles.mainPopularArtistsSliderCardInnerWrapper}`}>
				<img
					className={"${styles.mainPopularArtistsSliderCardImg}"}
					src="/public/Img/mainPopularArtistsSlide.jpg"
					alt="Slide photo"
				/>
			< className={`${styles.mainPopularArtistsSliderCardInnerWrapper}`}>
				<div className={`${styles.mainPopularArtistsSliderCardButtonWrapper}`}>
					<button className={`${styles.mainPopularArtistsSliderCardButton}`}>
						{t("Огляд")}
					</button>
				</div>
				
			</div>
		</div>
	);
};

const MainPopularArtistsSlider = () => {
	const { t } = useTranslation();
	return (
		<div className={"${styles.mainPopularArtistsSliderContainer}"}>
			<div className={"${styles.mainPopularArtistsSliderWrapper}"}>
				<div className={"${styles.mainPopularArtistsSliderTopInnerWrapper}"}>
					<div className={"${styles.mainPopularArtistsSliderTitleWrapper}"}>
						<p className={"${styles.mainPopularArtistsSliderTitle}"}>
							{t('Популярне. "Мистецтво"')}
						</p>
					</div>
					<div
						className={"${styles.mainPopularArtistsSliderLikeAndShareWrapper}"}
					>
						<div
							className={"${styles.mainPopularArtistsSliderLikeInnerWrapper}"}
						>
							<button
								className={"${styles.mainPopularArtistsSliderLikeButton}"}
							>
								<img
									className={"${styles.mainPopularArtistsSliderLikeButtonImg}"}
									src="/public/Img/likeHeart.svg"
									alt="Like"
								/>
							</button>
						</div>
						<div
							className={"${styles.mainPopularArtistsSliderShareInnerWrapper}"}
						>
							<button
								className={
									"${styles.mainPopularArtistsSliderShareButtonButton}"
								}
							>
								<img
									className={"${styles.mainPopularArtistsSliderShareButtonImg}"}
									src="/public/Img/shareArrow.svg"
									alt="Share"
								/>
							</button>
						</div>
					</div>
				</div>
				<div className={"${styles.mainPopularArtistsSliderBottomInnerWrapper}"}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						slidesPerView={"auto"}
						navigation
						pagination={{ clickable: false, type: "fraction" }}
						onSlideChange={() => console.log("slide change")}
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
					<div className={"${swiper-button-prev}"}></div>
					<div className={"${swiper-pagination}"}></div>
					<div className={"${swiper-button-next}"}></div>
				</div>
			</div>
		</div>
	);
};

export default MainPopularArtistsSlider;
