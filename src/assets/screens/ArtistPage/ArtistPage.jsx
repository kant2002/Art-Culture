import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// import ArtistPageAuthorsSlider from '../../components/Sliders/ArtistPageAuthorsSlider/ArtistPageAuthorsSlider.jsx'
import styles from '../../../styles/layout/ArtistPage.module.scss' 

function ArtistPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.artistPage}`}>
            <p className={`${styles.artistPageTitle}`}>The page is under construction</p>

            {/* <NewsArtistsSlider /> */}

            {/* <PopularOfThisArtistSlider /> */}

            {/* <ArtsOfThisArtistSlider /> */}

            {/* <PopularArtsSlider /> */}

        </div>
    )
}

export default ArtistPage
