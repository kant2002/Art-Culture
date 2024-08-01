import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/Sliders/MainInstagramSlider/MainInstagramSlider.module.scss'

function MainInstagramSlider() {
    const { t } = useTranslation();
    return (
        <div className={`${styles.mainInstagramSliderContainer}`}>
            <div className={`${styles.mainInstagramSliderWrapper}`}>
                <div className={`${styles.mainInstagramSliderTopInnerWrapper}`}>
                    <div className={`${styles.mainInstagramSliderTitleWrapper}`}>
                        <p className={`${styles.mainInstagramSliderTitle}`}>{t('on instagram')}</p>
                    </div>
                    <div className={`${styles.mainInstagramSliderFollowUsWrapper}`}>
                        <div className={`${styles.mainInstagramSliderFollowUsButtonWrapper}`}>
                            <button className={`${styles.mainInstagramSliderFollowUsButton}`}>
                                <p className={`${styles.mainInstagramSliderFollowUsButtonText}`}>{t('Follow us')}</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${styles.mainInstagramSliderMiddleInnerWrapper}`}>
                    <div className={`${styles.mainInstagramSliderCardWrapper}`}>
                        <div className={`${styles.mainInstagramSliderCardTopInnerWrapper}`}>
                            <div className={`${styles.mainInstagramSliderCardUserPhotoWrapper}`}>
                                <img
                                    className={`${styles.mainInstagramSliderCardUserPhoto}`}
                                    src={'/Img/buttonArrow.svg'}
                                    alt={t('Фотографія автора')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/mainNewImg/buttonArrow.svg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.mainInstagramSliderCardUserNameWrapper}`}></div>
                            <p className={`${styles.mainInstagramSliderCardUserName}`}>@name</p>
                        </div>
                        <div className={`${styles.mainInstagramSliderCardDateWrapper}`}>
                            <p className={`${styles.mainInstagramSliderCardDate}`}>26.09.23</p>
                        </div>
                    </div>
                    <div className={`${styles.mainInstagramSliderCardMiddleInnerWrapper}`}>
                        <img
                            className={`${styles.mainInstagramSliderCardImg}`}
                            src={'/Img/buttonArrow.svg'}
                            alt={t('Світлина автора')}
                            onError={e => {
                                e.target.onerror = null
                                e.target.src = '/mainNewImg/buttonArrow.svg'
                            }}
                        />
                    </div>
                    <div className={`${styles.mainInstagramSliderCardBottomInnerWrapper}`}>
                        <div className={`${styles.mainInstagramSliderCardDescriptionWrapper}`}>
                            <p className={`${styles.mainInstagramSliderCardDescription}`}>{t('Lorem ipsum')}</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.mainInstagramSliderBottomInnerWrapper}`}>
                    <div className={`${styles.mainInstagramSliderButtonsWrapper}`}>
                        <button	className={`${styles.mainInstagramSliderPreviousButton} ${styles.bannerCircleButton}`}></button>
                        <div className={`${styles.mainInstagramSliderPaginationsWrapper}`}>
                            <p className={`${styles.mainInstagramSliderPaginationsCurrentItem}`}>1</p>
                            <p className={`${styles.mainInstagramSliderPaginationsSeparator}`}>&#47;</p>
                            <p className={`${styles.mainInstagramSliderPaginationsTotalItems}`}>997</p>
                        </div>
                        <button	className={`${styles.mainInstagramSliderNextArrowButton} ${styles.bannerCircleButton}`}></button>
                    </div>
                </div>    
            </div>
        </div>)
}
export default MainInstagramSlider;
