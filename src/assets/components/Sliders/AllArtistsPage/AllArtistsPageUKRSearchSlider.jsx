// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "@styles/components/Sliders/AllArtistsPageSearchSlider/AllArtistsPageSearchSlider.scss";

function Slide1() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">А</h3>
		</div>
	);
}

function Slide2() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Б</h3>
		</div>
	);
}

function Slide3() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">В</h3>
		</div>
	);
}

function Slide4() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Г</h3>
		</div>
	);
}

function Slide5() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">ґ</h3>
		</div>
	);
}

function Slide6() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Д</h3>
		</div>
	);
}

function Slide7() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Е</h3>
		</div>
	);
}

function Slide8() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Є</h3>
		</div>
	);
}

function Slide9() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Ж</h3>
		</div>
	);
}

function Slide10() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">З</h3>
		</div>
	);
}

function Slide11() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">И</h3>
		</div>
	);
}

function Slide12() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">І</h3>
		</div>
	);
}

function Slide13() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Ї</h3>
		</div>
	);
}

function Slide14() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Й</h3>
		</div>
	);
}

function Slide15() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">К</h3>
		</div>
	);
}

function Slide16() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Л</h3>
		</div>
	);
}

function Slide17() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">М</h3>
		</div>
	);
}

function Slide18() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">Н</h3>
		</div>
	);
}

function Slide19() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">П</h3>
		</div>
	);
}

const AllArtistsPageUKRSearchSlider = () => {
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
				<SwiperSlide><Slide4 /></SwiperSlide>
				<SwiperSlide><Slide5 /></SwiperSlide>
				<SwiperSlide><Slide6 /></SwiperSlide>
				<SwiperSlide><Slide7 /></SwiperSlide>
				<SwiperSlide><Slide8 /></SwiperSlide>
				<SwiperSlide><Slide9 /></SwiperSlide>
				<SwiperSlide><Slide10 /></SwiperSlide>
				<SwiperSlide><Slide11 /></SwiperSlide>
				<SwiperSlide><Slide12 /></SwiperSlide>
				<SwiperSlide><Slide13 /></SwiperSlide>
				<SwiperSlide><Slide14 /></SwiperSlide>
				<SwiperSlide><Slide15 /></SwiperSlide>
				<SwiperSlide><Slide16 /></SwiperSlide>
				<SwiperSlide><Slide17 /></SwiperSlide>
				<SwiperSlide><Slide18 /></SwiperSlide>
				<SwiperSlide><Slide19 /></SwiperSlide>
			</Swiper>
		</div>
	);
};

export default AllArtistsPageUKRSearchSlider;