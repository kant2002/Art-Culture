import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/MuseumsPage.module.scss'

function MuseumsPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.MuseumsPageContainer}`}>
            <div className={`${styles.MuseumsPageTitleContainer}`}>
                <div className={`${styles.MuseumsPageTitle}`}>{t('Музеї')}</div>
            </div>

        </div>
    )
}

export default MuseumsPage
