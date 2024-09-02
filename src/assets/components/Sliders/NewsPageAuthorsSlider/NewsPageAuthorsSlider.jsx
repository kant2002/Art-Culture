import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.scss'

const Slide = ({ post }) => {
    const { t } = useTranslation()
    return (
        <div className='newsPageAuthorsSliderCardContainer'>
            <div className='newsPageAuthorsSliderCardWrapper'>
                <div className='newsPageAuthorsSliderCardUserPhotoWrapper'>
                    <img
                        className='newsPageAuthorsSliderCardUserPhoto'
                        src={'/Img/mainInstagramSliderUserPhoto.png'}
                        alt={t('Фотографія автора')}
                        onError={e => {
                            e.target.onerror = null
                            e.target.src = '/Img/mainInstagramSliderUserPhoto.png'
                        }}
                    />
                </div>
                <div className='newsPageAuthorsSliderCardUserNameWrapper'>
                    <p className='newsPageAuthorsSliderCardUserName'>ukr_art&culture</p>
                </div>
                <div className='newsPageAuthorsSliderCardDateWrapper'>
                    <p className='newsPageAuthorsSliderCardDate'>3 days ago</p>
                </div>
            </div>
            <div className='newsPageAuthorsSliderCardMiddleInnerWrapper'>
                <img
                    className='newsPageAuthorsSliderCardImg'
                    src={'/Img/mainInstagramSliderIMG.jpg'}
                    alt={t('Світлина автора')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/mainInstagramSliderIMG.jpg'
                    }}
                />
            </div>
            <div className='newsPageAuthorsSliderCardBottomInnerWrapper'>
                <div className='newsPageAuthorsSliderCardDescriptionWrapper'>
                    <p className='newsPageAuthorsSliderCardDescription'>
                        {t(
                            'Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів.'
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

const NewsPageAuthorsSlider = () => {
    const { t } = useTranslation()
    // const [posts, setPosts] = useState([])
    // const [error, setError] = useState(null)

    // useEffect(() => {
    // 	const fetchInstagramPosts = async () => {
    // 		try {
    // 			const response = await axios.get(``)
    // 			setPosts(response.data.data)
    // 		} catch (error) {
    // 			console.error('Error fetching Instagram post data', error)
    // 			setError(error)
    // 		}
    // 	}

    // 	fetchInstagramPosts()
    // }, [])

    return (
        <div className='newsPageAuthorsSliderContainer'>
            <div className='newsPageAuthorsSliderWrapper'>
                <div className='newsPageAuthorsSliderTitleWrapper'>
                    <p className='newsPageAuthorsSliderTitle'>{t('Автори')}</p>
                </div>

                <div className='newsPageAuthorsSliderMiddleInnerWrapper'>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={0}
                        slidesPerView={'auto'}
                        navigation
                        pagination={{ clickable: false, type: 'fraction' }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={swiper => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide />
                        </SwiperSlide>
                    </Swiper>
                    <div className={'${swiper-button-prev}'}></div>
                    <div className={'${swiper-pagination}'}></div>
                    <div className={'${swiper-button-next}'}></div>
                </div>
            </div>
        </div>
    )
}

export default NewsPageAuthorsSlider
