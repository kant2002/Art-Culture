import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/MuseumPage.module.scss'

function MuseumPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.museumPage}`}>

            <div className={`${styles.museumPageNavigationContainer}`}>
                <nav className={`${styles.museumPageNavigation}`}>
                    <ul className={`${styles.museumPageNavigationList}`}>
                        <li className={`${styles.museumPageNavigationItem}`}>{t('Музеї')}</li>
                        <p className={`${styles.museumPageNavigationItemSeparator}`}>&#8250;</p>
                        <li className={`${styles.museumPageNavigationItem}`}>{t('Назва цього музею')}</li>
                    </ul>
                </nav>
            </div>

            <div className={`${styles.museumPageAboutMuseumContainer}`}>

                <div className={`${styles.museumPageMuseumPhotoWrapper}`}>
                    <img
                        className={`${styles.museumPageMuseumPhoto}`}
                        src={'/public/Img/mainBanner.jpeg'}
                        alt={t('Фото митця')}
                        onError={e => {
                            e.target.onerror = null
                            e.target.src = '/public/Img/newsCardERROR.jpg'
                        }}
                    />
                </div>

                <div className={`${styles.museumPageMuseumLogoWrapper}`}>
                    <img
                        className={`${styles.museumPageMuseumLogo}`}
                        src={'/public/Img/MuseumLogo.png'}
                        alt={t('Фото митця')}
                        onError={e => {
                            e.target.onerror = null
                            e.target.src = '/public/Img/newsCardERROR.jpg'
                        }}
                    />
                </div>

                <div className={`${styles.museumPageMuseumTitleWrapper}`}>
                    <p className={`${styles.museumPageMuseumTitle}`}>{t('Назва цього музею')}</p>
                </div>

                <div className={`${styles.museumPageMuseumLocationWrapper}`}>
                    <p className={`${styles.museumPageMuseumLocation}`}>Київ, Україна</p>
                </div>

                

            </div>

        </div>

    )
}

export default MuseumPage
