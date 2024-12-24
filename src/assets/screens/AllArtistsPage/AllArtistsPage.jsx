import { useTranslation } from 'react-i18next'
import styles from '../../../styles/layout/AllArtistsPage.module.scss'

function AllArtistsPage() {
    const { t } = useTranslation()

    return (
        <div className={styles.ArtistsPageContainer}>
            <div className={styles.ArtistsPageTitleWrapper}>
                <h1>{t('Усі митці')}</h1>
            </div>
            <div className={styles.ArtistsPageSeparatorWrapper}>
                <div className={styles.ArtistsPageSeparator}></div>
            </div>
            <div className={styles.ArtistsPageArtistsSearchWrapper}>
                <input
                    className={`${styles.ArtistsPageArtistsSearchInput}`}
                    placeholder={t('Пошук митця')}
                />
            </div>


            <div className={`${styles.ArtistsPageGalleryButtonsWrapper}`}>
                <button className={`${styles.ArtistsPageGalleryButton}`}>
                    <h3
                        className={`${styles.ArtistsPageGalleryButtonTitle}`}
                    >
                        {t('Усі')}
                    </h3>
                </button>

                <p
                    className={`${styles.ArtistsPageGalleryButtonSeparator}`}
                >
                    |
                </p>

                <button className={`${styles.ArtistsPageGalleryButton}`}>
                    <h3
                        className={`${styles.ArtistsPageGalleryButtonTitle}`}
                    >
                        {t('А-Я')}
                    </h3>
                </button>

                <p
                    className={`${styles.ArtistsPageGalleryButtonSeparator}`}
                >
                    |
                </p>

                <button
                    className={`${styles.ArtistsPageGalleryButtonWhithClock}`}
                >
                    <h3
                        className={`${styles.ArtistsPageGalleryButtonTitle}`}
                    >
                        {t('Час')}
                    </h3>

                    <img
                        className={`${styles.ArtistsPageGalleryButtonClock}`}
                        src={'/Img/clock.svg'}
                        alt="Слідкуйте за мистецтвом!"
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/Img/newsCardERROR.jpg'
                        }}
                    />
                </button>
            </div>
        </div>
    )
}

export default AllArtistsPage