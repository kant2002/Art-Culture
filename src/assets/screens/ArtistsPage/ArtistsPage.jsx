import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ArtistsPageNewsArtistsSlider from '../../components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.jsx'
import PopularArtsSlider from '../../components/Sliders/ArtistsPageSliders/PopularArtsSlider.jsx'
// import MainPopularArtsSlider from '../../components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.jsx'
import styles from '../../../styles/layout/ArtistsPage.module.scss'

function ArtistsPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.ArtistsPageContainer}`}>

            <div className={`${styles.ArtistsPageTitleWrapper}`}>

                <h2 className={`${styles.ArtistsPageTitle}`}>{t('Митці')}</h2>

            </div>

            <div className={`${styles.ArtistsPageSeparatorWrapper}`}>

                <div className={`${styles.ArtistsPageSeparator}`}></div>

            </div>

            <div className={`${styles.ArtistsPageSubTitleWrapper}`}>

                <p className={`${styles.ArtistsPageSubTitle}`}>{t('Слідкуйте за мистецтвом!')}</p>

            </div>

            <div className={`${styles.ArtistsPageArtistsDescriptionWrapper}`}>

                <p className={`${styles.ArtistsPageArtistsFirstDescription}`}>{t('Отримуйте запрошення на перегляди виставок та будьте серед перших, хто дізнається про нагороди, призи, книги та виставки в публічних і комерційних галереях.')}</p>

                <p className={`${styles.ArtistsPageArtistsSecondDescription}`}>{t('Просто шукайте поля для підписки')}&#8194;&#34;{t('СЛІДКУВАТИ ЗА ЦИМ МИТЦЕМ')}&#34;&#8194;{t('у нижній частині новинних статей Art & Culture Online, профілів митців та попередніх переглядів виставок, або переглядайте сторінки митців нижче.')}</p>

            </div>

            <div className={`${styles.ArtistsPageArtistsSearchWrapper}`}>

                <input className={`${styles.ArtistsPageArtistsSearchInput}`} placeholder={t('Пошук митця')} />

            </div>

            <ArtistsPageNewsArtistsSlider />

            <div className={`${styles.ArtistsPageGalleryContainer}`}>

                <div className={`${styles.ArtistsPageGalleryButtonsWrapper}`}>

                    <button className={`${styles.ArtistsPageGalleryButton}`}></button>
                    <button className={`${styles.ArtistsPageGalleryButton}`}></button>
                    <button className={`${styles.ArtistsPageGalleryButtonWhithClock}`}></button>

                </div>

                <div className={`${styles.ArtistsPageGalleryCardsWrapper}`}>

                    <div className={`${styles.ArtistsPageGalleryInnerWrapper}`}>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                        <div className={`${styles.ArtistsPageGalleryCardWrapper}`}>

                            <div className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}>

                                <img
                                    className={`${styles.ArtistsPageGalleryCardPicture}`}
                                    src={'/Img/ArtistPhoto.jpg'}
                                    alt='Слідкуйте за мистецтвом!'
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsCardERROR.jpg'
                                    }}
                                />

                            </div>

                            <div className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}>

                                <p className={`${styles.ArtistsPageGalleryCardDescription}`}>{t('Слідкуйте за мистецтвом!')}</p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className={`${styles.ArtistsPageGalleryAllArtistsButtonWrapper}`}>

                    <button className={`${styles.ArtistsPageGalleryAllArtistsButton}`}>{t('Всі митці')}</button>

                </div>

            </div>

            <PopularArtsSlider />

        </div >
    )
}

export default ArtistsPage
