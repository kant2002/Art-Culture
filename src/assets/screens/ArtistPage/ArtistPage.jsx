import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import ArtistPageNewsArtistsSlider from '../../components/Sliders/ArtistPageSliders/ArtistPageNewsArtistsSlider.jsx'
import PopularOfThisArtistSlider from '../../components/Sliders/ArtistPageSliders/PopularOfThisArtistSlider.jsx'
import MainPopularArtsSlider from '../../components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.jsx'
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
                <div className={`${styles.artistPageArtisPhotoWhithDescriptionWrapper}`}>
                    <div className={`${styles.artistPageArtistPhotoWrapper}`}>
                        <img
                                className={`${styles.artistPageArtistPhoto}`}
                                src={'/public/Img/mainPopularArtistsSlide.jpg'}
                                alt={t('Фото митця')}
                                onError={e => {
                                    e.target.onerror = null
                                    e.target.src = '/public/Img/newsCardERROR.jpg'
                                }}
                        />
                    </div>
                    {/* <div className={`${styles.artistPageArtisPhotoDescriptionWrapper}`}>
                        <p className={`${styles.artistPageArtisPhotoDescription}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, tenetur debitis enim totam neque, laboriosam harum minima illo ducimus distinctio consequatur asperiores quaerat earum reiciendis. Quisquam impedit ut numquam vel.</p>
                    </div> */}
                </div>

                <div className={`${styles.artistPageArtisNameWrapper}`}>
                    <p className={`${styles.artistPageArtisName}`}>{t('Митець')} 1</p>
                </div>

                <div className={`${styles.artistPageArtisSeparatorWrapper}`}>
                    <div className={`${styles.artistPageArtisSeparator}`}></div>
                </div>

                <div className={`${styles.artistPageArtisDescriptionWrapper}`}>
                    <p className={`${styles.artistPageArtisDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, vero necessitatibus. Iste laboriosam, nisi neque labore molestiae beatae ea doloremque alias incidunt a eveniet ad odio voluptas nesciunt? Cupiditate, ipsam.
                    Sed, maiores! Ipsa nulla quasi est incidunt quo laboriosam cum facere! Iusto beatae modi et iste soluta blanditiis laboriosam neque, expedita dolore doloribus animi quisquam quod veniam cupiditate perferendis ipsum.
                    At quia, est perspiciatis sint consequuntur placeat fuga porro ducimus molestias incidunt ea minus, accusantium et, facere ipsa libero iusto ipsum. Distinctio placeat itaque doloribus ut. Odit in aspernatur doloremque!
                    Autem, nostrum veniam illum minima vel aliquam sapiente cum reprehenderit molestias, eaque error recusandae, optio in provident modi ratione quidem. Eius dignissimos pariatur ullam quis minus, corporis expedita nisi totam.
                    Quae, quos eligendi repellendus eius beatae mollitia dolores tempore aliquid corrupti recusandae aspernatur quisquam porro? Voluptate esse suscipit exercitationem nobis obcaecati repudiandae earum non id accusantium, expedita quo reprehenderit quasi.</p>
                </div>

                <div className={`${styles.artistPageArtisReadMoreButtonWrapper}`}>
                    <button className={`${styles.artistPageArtisReadMoreButton}`}>
                        <p className={`${styles.artistPageArtisReadMoreButtonText}`}>{t('Детальніше')}</p>
                        <p className={`${styles.artistPageArtisReadMoreButtonArrow}`}>&#160;&#10230;</p>
                    </button>
                </div>

            </div>

                

            <ArtistPageNewsArtistsSlider />

            <PopularOfThisArtistSlider />

            {/* <ArtsByArtistSlider /> */}

            <div className={`${styles.underDevelopmentContainer}`}>
                <p className={`${styles.underDevelopmentPreTitle}`}>{t('Цей контейнер')}</p>
                <p className={`${styles.underDevelopmentTitle}`}>{t('В розробці')}</p>
            </div>

            <div className={`${styles.artistPageFollowContainer}`}>
                <p className={`${styles.artistPageFollowTitle}`}>{t('Стежити за цим митцем')}</p>
                <div className={`${styles.artistPageFollowEmailWrapper}`}>
                    <input
                        type="email"
                        className={`${styles.artistPageFollowEmail}`}
                        placeholder={t('Введіть ваш email')}
                    />
                    <button className={`${styles.artistPageFollowButton}`}>{t('Зареєструватися')}</button>
                </div>
            </div>            

			<MainPopularArtsSlider />

        </div>
    )
}

export default ArtistPage
