import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MuseumPageNewsMuseumSlider from '../../components/Sliders/MuseumPageSliders/MuseumPageNewsMuseumSlider.jsx'
import PopularInThisMuseumSlider from '../../components/Sliders/MuseumPageSliders/PopularInThisMuseumSlider.jsx'
import ArtsOfThisMuseumSlider from '../../components/Sliders/MuseumPageSliders/ArtsOfThisMuseumSlider.jsx'
import styles from '../../../styles/layout/MuseumPage.module.scss'

function MuseumPage() {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <div className={`${styles.museumPage}`}>

            <div className={`${styles.museumPageNavigationContainer}`}>
                <nav className={`${styles.museumPageNavigation}`}>
                    <ul className={`${styles.museumPageNavigationList}`}>
                        <li className={`${styles.museumPageNavigationItem}`}>{t('Музеи')}</li>
                        <p className={`${styles.museumPageNavigationItemSeparator}`}>&#8250;</p>
                        <li className={`${styles.museumPageNavigationItem}`}>{t('Название этого музея')}</li>
                    </ul>
                </nav>
            </div>

            <div className={`${styles.museumPageAboutMuseumContainer}`}>

                <div className={`${styles.museumPageMuseumPhotoWrapper}`}>
                    <img
                        className={`${styles.museumPageMuseumPhoto}`}
                        src={'/public/Img/mainBanner.jpeg'}
                        alt={t('Фото музея')}
                        onError={e => {
                            e.target.onerror = null
                            e.target.src = '/public/Img/newsCardERROR.jpg'
                        }}
                    />
                </div>

                <div className={`${styles.museumPageMuseumTopLogoWhithAdressWrapper}`}>

                    <div className={`${styles.museumPageMuseumLogoWrapper}`}>
                        <img
                            className={`${styles.museumPageMuseumLogo}`}
                            src={'/public/Img/MuseumLogo.png'}
                            alt={t('Логотип музея')}
                            onError={e => {
                                e.target.onerror = null
                                e.target.src = '/public/Img/newsCardERROR.jpg'
                            }}
                        />
                    </div>

                    <div className={`${styles.museumPageTopAdressWrapper}`}>

                        <div className={`${styles.museumPageMuseumTitleWrapper}`}>
                            <p className={`${styles.museumPageMuseumTitle}`}>{t('Название этого музея')}</p>
                        </div>

                        <div className={`${styles.museumPageMuseumTopLocationWrapper}`}>
                            <p className={`${styles.museumPageMuseumLocationCity}`}>Київ</p>
                            <p>&#44;&#160;</p>
                            <p className={`${styles.museumPageMuseumLocationCountry}`}>Україна</p>
                        </div>

                    </div>

                </div>

                <div className={`${styles.museumPageMuseumDescriptionWrapper} ${isExpanded ? styles.expanded : ''}`}>
                    <p className={`${styles.museumPageMuseumDescription}`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti rem accusantium sapiente voluptatem quae necessitatibus, delectus officiis velit tempora animi est vero quas voluptas quo esse, facere ratione. Velit, deleniti!
                        Distinctio perspiciatis, in nam molestiae aperiam quos et aliquid, vero laborum voluptatibus iusto alias mollitia magnam doloremque quasi maiores optio nisi incidunt ipsam, similique dolor tempore provident? Repudiandae, porro nesciunt?
                        Quidem fuga aperiam laboriosam eum eos eveniet quam consequuntur expedita, dicta temporibus commodi necessitatibus fugiat deleniti nesciunt? Ab autem, fugiat laudantium veniam inventore velit quae incidunt doloremque eligendi tempora sapiente?
                        Laborum pariatur cumque nemo ratione! Pariatur, facere? Tempore dolorum provident minima, voluptates nulla at fugiat vel sit temporibus commodi consequatur nemo a debitis, autem quos laudantium atque assumenda dignissimos harum!
                        Laudantium optio reprehenderit molestias, dicta nostrum veritatis praesentium esse deserunt aperiam quod sint itaque culpa libero repellendus. Unde cum, architecto natus fugiat perspiciatis, facere dolor aut, ducimus eius repellendus doloremque.
                        Architecto enim fugiat odit fuga nemo sit? Iusto a laudantium, exercitationem ut dicta tempore excepturi, non temporibus ad impedit sit molestiae fugiat odio enim libero est cumque, tenetur nobis modi!
                        Quasi nesciunt delectus, cumque aspernatur sit et. Adipisci voluptates, veniam ad magnam commodi sunt magni quisquam facere, aliquid delectus quasi molestiae earum et repudiandae culpa possimus unde tenetur! Temporibus, culpa?
                        Vero, odit soluta veritatis esse similique debitis laudantium dolorem illo! Molestiae alias obcaecati ab minus distinctio architecto quaerat, dolorum deserunt magni exercitationem. Unde cumque est tenetur, delectus sunt rem quaerat!
                        Ea architecto autem voluptatum exercitationem! Cum culpa architecto rem totam mollitia, accusamus modi sunt doloremque commodi id corrupti eos dolores quisquam ullam quod repellat officia officiis suscipit repellendus cumque inventore.
                        Similique, explicabo modi! Aut harum culpa doloremque dolorum molestiae voluptas ex, modi incidunt commodi vel, omnis esse rem unde et quisquam ad error ipsa nesciunt perferendis voluptatem consequatur itaque deleniti.
                    </p>
                </div>

                <button
                    className={`${styles.museumPageMuseumDescriptionButton}`}
                    onClick={toggleText}
                >
                    {isExpanded ? t('Згорнути текст') : t('Читати далі')}
                </button>

            </div>

            <MuseumPageNewsMuseumSlider />

            <PopularInThisMuseumSlider />

            <ArtsOfThisMuseumSlider />

            <div className={`${styles.underDevelopmentContainer}`}>
                <p className={`${styles.underDevelopmentPreTitle}`}>{t('Цей контейнер')}</p>
                <p className={`${styles.underDevelopmentTitle}`}>{t('В розробці')}</p>
            </div>

            <div className={`${styles.underDevelopmentContainer}`}>
                <p className={`${styles.underDevelopmentPreTitle}`}>{t('Цей контейнер')}</p>
                <p className={`${styles.underDevelopmentTitle}`}>{t('В розробці')}</p>
            </div>

            <div className={`${styles.museumPageMuseumBottomLogoWhithAdressWrapper}`}>

                <div className={`${styles.museumPageищеещьAdressWrapper}`}>

                    <div className={`${styles.museumPageMuseumLogoWrapper}`}>
                        <img
                            className={`${styles.museumPageMuseumLogo}`}
                            src={'/public/Img/MuseumLogo.png'}
                            alt={t('Логотип музея')}
                            onError={e => {
                                e.target.onerror = null
                                e.target.src = '/public/Img/newsCardERROR.jpg'
                            }}
                        />
                    </div>

                    <div className={`${styles.museumPageMuseumTitleWrapper}`}>
                        <p className={`${styles.museumPageMuseumTitle}`}>{t('Название этого музея')}</p>
                    </div>

                    <div className={`${styles.museumPageMuseumBottomLocationWrapper}`}>
                        <p className={`${styles.museumPageMuseumLocationStreet}`}>вулиця Кирилівська, 41</p>
                        <p className={`${styles.museumPageMuseumLocationCity}`}>Київ</p>
                        <p className={`${styles.museumPageMuseumLocationCountry}`}>Україна</p>
                        <p className={`${styles.museumPageMuseumLocationIndex}`}>02000</p>
                    </div>

                    <div className={`${styles.museumPageMuseumToTheSiteButtonWrapper}`}>
                        <button className={`${styles.museumPageMuseumToTheSiteButton}`}>
                            {t('Перейти до сайту')}
                        </button>
                    </div>

                </div>

            </div>

        </div >
    );
}

export default MuseumPage;
