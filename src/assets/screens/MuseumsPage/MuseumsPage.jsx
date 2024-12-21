import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import MuseumsPageTopSlider from '../../components/Sliders/MuseumsPageSliders/MuseumsPageTopSlider.jsx'
import styles from '../../../styles/layout/MuseumsPage.module.scss'

function MuseumsPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.MuseumsPageContainer}`}>

            <div className={`${styles.MuseumsPageTitleContainer}`}>
                <div className={`${styles.MuseumsPageTitle}`}>{t('Музеї')}</div>
            </div>            

            <MuseumsPageTopSlider />

        </div>
    )
}

export default MuseumsPage
