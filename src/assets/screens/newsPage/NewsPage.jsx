import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/newsPage.module.scss'

function NewsPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.newsPageContainer}`}>
            <div className={`${styles.newsPageTitleContainer}`}>
                <div className={`${styles.newsPageTitle}`}>{t('Новини')}</div>
            </div>
            <div className={`${styles.newsPageHorizontalSeparatorContainer}`}>
                <img className={`${styles.newsPageHorizontalSeparator}`}></img>
            </div>
            <div className={`${styles.newsPageSearchContainer}`}>
                <input
                    className={`${styles.newsPageSearchInput}`}
                    type="text"
                    placeholder={t('Пошук авторів')}
                />
            </div>
            <div className={`${styles.newsPageLikeAndShareContainer}`}>
                <div className={`${styles.newsPageLikeWrapper}`}>
                    <button className={`${styles.newsPageLikeButton}`}>
                        <img className={`${styles.newsPageLikeButtonImg}`}
                            src={'/Img/likeHeart.svg'}
                            alt={t('Світлина вподобайки')}
                            onError={e => {
                                e.target.onerror = null
                                e.target.src = '/Img/likeHeart.svg'
                            }}
                        />
                    </button>
                </div>
                <div className={`${styles.newsPageShareWrapper}`}>
                    <button className={`${styles.newsPageShareButton}`}>
                        <img className={`${styles.newsPageShareButtonImg}`}
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

            <div className={`${styles.newsPageTopCardContainer}`}>
                <div className={`${styles.newsPageCardContainer}`}>
                    <div className={`${styles.newsPageCardWrapper}`}>
                        <div className={`${styles.newsPageCardImageWrapper}`}>
                            <img className={`${styles.newsPageCardImage}`}
                                src={'/Img/newsPageImg.jpeg'}
                                alt={t('Зображення')}
                                onError={e => {
                                    e.target.onerror = null
                                    e.target.src = '/Img/newsPageImg.jpeg'
                                }}
                            />
                        </div>
                        <div className={`${styles.newsPageCardTitleWrapper}`}>
                            <p className={`${styles.newsPageCardTitle}`}>{t('Новина')}</p>
                        </div>
                        <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                            <p className={`${styles.newsPageCardDescription}`}>{t('Опис новини')}</p>
                        </div>
                        <div className={`${styles.newsPageCardClockDateAndReadMoreButtonWrapper}`}>
                            <div className={`${styles.newsPageCardClockWrapper}`}>
                                <img className={`${styles.newsPageCardClockImg}`}
                                    src={'/Img/clock.svg'}
                                    alt={t('Час')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/clock.svg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardDateWrapper}`}>
                                <p className={`${styles.newsPageCardDate}`}>01.01.2022</p>
                            </div>
                            <div className={`${styles.newsPageCardReadMoreButtonWrapper}`}>
                                <button className={`${styles.newsPageCardReadMoreButton}`}>{t('Читати далі')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.newsPageSlider}`}>

            </div>

            <div className={`${styles.newsPageBottomCardContainer}`}>

            </div>

            <div className={`${styles.newsPageMoreNewsButtonAndLikeAndShareWrapper}`}>
                <div className={`${styles.newsPageMoreNewsButtonWrapper}`}>
                    <button className={`${styles.newsPageMoreNewsButton}`}>{t('Усi новини')}</button>
                </div>
                <div className={`${styles.newsPageLikeAndShareContainer}`}>
                    <div className={`${styles.newsPageLikeWrapper}`}>
                        <button className={`${styles.newsPageLikeButton}`}>
                            <img className={`${styles.newsPageLikeButtonImg}`}
                                src={'/Img/likeHeart.svg'}
                                alt={t('Світлина вподобайки')}
                                onError={e => {
                                    e.target.onerror = null
                                    e.target.src = '/Img/likeHeart.svg'
                                }}
                            />
                        </button>
                    </div>
                    <div className={`${styles.newsPageShareWrapper}`}>
                        <button className={`${styles.newsPageShareButton}`}>
                            <img className={`${styles.newsPageShareButtonImg}`}
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

            <div className={`${styles.newsPageInputMailContainer}`}>
                <input
                    className={`${styles.newsPageInputMail}`}
                    type="text"
                    placeholder={t('Введіть ваш email')}
                />
                <button className={`${styles.newsPageInputMailButton}`}>{t('Підписатися')}</button>
            </div>

            <div className={`${styles.newsPageSignUpButtonContainer}`}>
                <button className={`${styles.newsPageSignUpButton}`}>{t('Зареєструватися')}</button>
            </div>

        </div>
    )
}

export default NewsPage
