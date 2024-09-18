import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/MuseumPage.module.scss'

function MuseumPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.museumPage}`}>


            <div className={`${styles.museumPageMuseumPhotoContainer}`}>
                <img
                    className={`${styles.museumPageMuseumPhoto}`}
                    src={'/Img/mainPopularArtistsSlide.jpg'}
                    alt={t('Фото митця')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/newsCardERROR.jpg'
                    }}
                />
            </div>


        </div>
    )
}

export default MuseumPage
