import React from "react";
import styles from "/src/styles/components/Sliders/MainBannerSlider/MainBannerSlider.module.scss";
function MainBannerSlider() {
	return (
		<div className={`${styles.mainPageBanner}`}>
			<div className={`${styles.bannerTitleWrapper}`}>
				<h2 className={`${styles.bannerTitle}`}>The great journey whith the</h2>
				<p className={`${styles.bannerSubTitle} ${styles.bannerSubTitleAndLinkTitle}`}>Odesa National Fine Arts Museum</p>
				<div className={`${styles.bannerTitleButtonWrapper}`}>
					<button className={`${styles.bannerTitleButton}`}>See more</button>
				</div>
			</div>
			<div className={`${styles.bannerButtonsWrapper}`}>
				<div className={`${styles.bannerLinkWrapper}`}>
					<button className={`${styles.bannerLinkButton}`}>
						<p className={`${styles.bannerLinkButtonTitleLeftBracket}`}>&#91;</p>
						<p className={`${styles.bannerLinkButtonTitle} ${styles.bannerSubTitleAndLinkTitle}`}>see more</p>
						<p className={`${styles.bannerLinkButtonTitleRightBracket}`}>&#93;</p>
						<p className={`${styles.bannerLinkButtonTitleArrow}`}>&#62;</p>
					</button>
				</div>
				<div className={`${styles.bannerArrowButtonsWrapper}`}>
					<button	className={`${styles.bannerPreviousArrowButton} ${styles.bannerCircleButton}`}></button>
					<div className={`${styles.bannerPaginationsWrapper}`}>
						<p className={`${styles.bannerPaginationsCurrentItem}`}>1</p>
						<p className={`${styles.bannerPaginationsSeparator}`}>&#47;</p>
						<p className={`${styles.bannerPaginationsTotalItems}`}>997</p>
					</div>
					<button	className={`${styles.bannerNextArrowButton} ${styles.bannerCircleButton}`}></button>
				</div>
			</div>
		</div>
	);
}
export default MainBannerSlider;

/* <button className={`${styles.mainPageButton} ${styles.mainPageModificatorButton1}`}>1</button>
   <button className={`${styles.mainPageButton} ${styles.mainPageModificatorButton2}`}>2</button> */
