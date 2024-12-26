// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "@styles/components/Sliders/AllArtistsPageSearchSlider/AllArtistsPageSearchSlider.scss";

function Slide1() {
	return (
		<div className="LettersContainer">
			<div className="LettersWrapper">
				<h3 className="Letter">A</h3>
			</div>
		</div>
	);
}

function Slide2() {
	return (
		<div className="LettersContainer">
			<div className="LettersWrapper">
				<h3 className="Letter">B</h3>
			</div>
		</div>
	);
}

function Slide3() {
	return (
		<div className="LettersContainer">
			<div className="LettersWrapper">
				<h3 className="Letter">C</h3>
			</div>
		</div>
	);
}

const AllArtistsPageENGSearchSlider = () => {
	return (
		<div className="SliderContainer">
			<Swiper
				// install Swiper modules
				modules={[Navigation]}
				spaceBetween={10}
				slidesPerView={'auto'}
				navigation
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				<SwiperSlide><Slide1 /></SwiperSlide>
				<SwiperSlide><Slide2 /></SwiperSlide>
				<SwiperSlide><Slide3 /></SwiperSlide>
			</Swiper>
		</div>
	);
};

export default AllArtistsPageENGSearchSlider;