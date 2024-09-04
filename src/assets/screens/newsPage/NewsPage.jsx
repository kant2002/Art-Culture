import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import NewsPageAuthorsSlider from '../../components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.jsx'
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
                        <p className={`${styles.newsPageLikeButtonText}`}>Like</p>
                    </button>
                </div>
                <div className={`${styles.newsPageShareWrapper}`}>
                    <button className={`${styles.newsPageShareButton}`}>
                        <p className={`${styles.newsPageShareButtonText}`}>Share</p>
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

            <div className={`${styles.newsPageTopCardsContainer}`}>
                <div className={`${styles.newsPageTopCardsWrapper}`}>

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard1}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard2}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard3}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard4}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard5}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard6}`}>
                        <div className={`${styles.newsPageCardsWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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
            </div>

            <NewsPageAuthorsSlider />

            <div className={`${styles.newsPageBottomCardsContainer}`}>
                <div className={`${styles.newsPageBottomCardsWrapper}`}>

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard5}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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


                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard6}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard7}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard8}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard9}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard10}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard11}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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

                    <div className={`${styles.newsPageCardContainer} ${styles.newsPageCard12}`}>
                        <div className={`${styles.newsPageCardWrapper}`}>
                            <div className={`${styles.newsPageCardImageWrapper}`}>
                                <img className={`${styles.newsPageCardImage}`}
                                    src={'/Img/newsCard1.jpg'}
                                    alt={t('Зображення')}
                                    onError={e => {
                                        e.target.onerror = null
                                        e.target.src = '/Img/newsPageImg.jpeg'
                                    }}
                                />
                            </div>
                            <div className={`${styles.newsPageCardTitleWrapper}`}>
                                <p className={`${styles.newsPageCardTitle}`}>Заголовок состоящий из пятидесяти символов! (тест)</p>
                            </div>
                            <div className={`${styles.newsPageCardDescriptionWrapper}`}>
                                <p className={`${styles.newsPageCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis perferendis, distinctio nobis, ab ullam dolorem, laborum non accusantium totam porro eveniet omnis? Qui doloremque deleniti harum, tenetur expedita atque!
                                    Nihil veritatis eum quod delectus in beatae dolore qui voluptatem, pariatur voluptatum aperiam, nemo accusantium repellat non quibusdam ullam. Laudantium debitis nihil amet enim dolorem placeat sed quas dolores temporibus!
                                    Consectetur fugiat recusandae nisi pariatur itaque asperiores quos doloremque optio laborum ipsa, vero nam! Illo veritatis ut ipsa ullam iste corporis ducimus, distinctio fugiat in ex similique amet odit est.</p>
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
            </div>

            <div className={`${styles.newsPageMoreNewsButtonAndLikeAndShareWrapper}`}>
                <div className={`${styles.newsPageMoreNewsButtonWrapper}`}>
                    <button className={`${styles.newsPageMoreNewsButton}`}>
                        <p className={`${styles.newsPageNewsButtonTitle}`}>
                            {t('Більше новин')}
                        </p>
                        <img
                            className={`${styles.newsPageNewsButtonImg}`}
                            src={'/Img/buttonArrow.svg'}
                            alt={t('Стрілка')}
                            onError={e => {
                                e.target.onerror = null
                                e.target.src = '/mainNewImg/buttonArrow.svg'
                            }}
                        />
                    </button>
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
                            <p className={`${styles.newsPageLikeButtonText}`}>Like</p>
                        </button>
                    </div>
                    <div className={`${styles.newsPageShareWrapper}`}>
                        <button className={`${styles.newsPageShareButton}`}>
                            <p className={`${styles.newsPageShareButtonText}`}>Share</p>
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
                <p className={`${styles.newsPageInputMailTitle}`}>{t('Підписатися на розсилку')}</p>
                <input
                    className={`${styles.newsPageInputMail}`}
                    type="text"
                    placeholder={t('Введіть ваш email')}
                />
            </div>

            <div className={`${styles.newsPageSignUpButtonContainer}`}>
                <button className={`${styles.newsPageSignUpButton}`}>{t('Зареєструватися')}</button>
            </div>

        </div>
    )
}

export default NewsPage
