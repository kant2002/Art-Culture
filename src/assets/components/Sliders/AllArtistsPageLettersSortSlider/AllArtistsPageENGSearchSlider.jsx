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
			<h3 className="Letter">A</h3>
		</div>
	);
}

function Slide2() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">B</h3>
		</div>
	);
}

function Slide3() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">C</h3>
		</div>
	);
}

function Slide4() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">D</h3>
		</div>
	);
}

function Slide5() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">E</h3>
		</div>
	);
}

function Slide6() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">F</h3>
		</div>
	);
}

function Slide7() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">G</h3>
		</div>
	);
}

function Slide8() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">H</h3>
		</div>
	);
}

function Slide9() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">I</h3>
		</div>
	);
}

function Slide10() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">J</h3>
		</div>
	);
}

function Slide11() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">K</h3>
		</div>
	);
}

function Slide12() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">L</h3>
		</div>
	);
}

function Slide13() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">M</h3>
		</div>
	);
}

function Slide14() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">N</h3>
		</div>
	);
}

function Slide15() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">O</h3>
		</div>
	);
}

function Slide16() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">P</h3>
		</div>
	);
}

function Slide17() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">R</h3>
		</div>
	);
}

function Slide18() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">S</h3>
		</div>
	);
}

function Slide19() {
	return (
		<div className="LetterContainer">
			<h3 className="Letter">T</h3>
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

export default AllArtistsPageENGSearchSlider;