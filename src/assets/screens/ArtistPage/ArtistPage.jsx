import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// import ArtistPageAuthorsSlider from '../../components/Sliders/ArtistPageAuthorsSlider/ArtistPageAuthorsSlider.jsx'
import styles from '../../../styles/layout/ArtistPage.module.scss' 

function ArtistPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.artistPage}`}>

            <div className={`${styles.artistPageNavigationContainer}`}>
                <nav className={`${styles.artistPageNavigation}`}>
                    <ul className={`${styles.artistPageNavigationList}`}>
                        <li className={`${styles.artistPageNavigationItem}`}>{t('Митці')}</li>
                        <p className={`${styles.artistPageNavigationItemSeparator}`}>&#8250;</p>
                        <li className={`${styles.artistPageNavigationItem}`}>{t('Митець')}</li>
                    </ul>
                </nav>
            </div>

            <div className={`${styles.artistPageAboutArtistContainer}`}>
                <div className={`${styles.artistPageArtistPhotoWrapper}`}>
                    <img
							className={`${styles.artistPageArtistPhoto}`}
							src={'/public/Img/newsCard1.jpg'}
							alt={t('Фото митця')}
							onError={e => {
								e.target.onerror = null
								e.target.src = '/public/Img/newsCardERROR.jpg'
							}}
					/>
                </div>
            </div>

                

            {/* <NewsArtistsSlider /> */}

            {/* <PopularOfThisArtistSlider /> */}

            {/* <ArtsOfThisArtistSlider /> */}

            {/* <PopularArtsSlider /> */}

        </div>
    )
}

export default ArtistPage
