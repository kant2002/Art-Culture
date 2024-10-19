// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react'
// // Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

// // Import Swiper modules
// import { Navigation, Pagination } from 'swiper/modules'

// import '/src/styles/components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.scss'

// const Slide = ({ post }) => {
//     const { t } = useTranslation()
//     return (
//         <div className='newsPageAuthorsSliderCardContainer'>
//             <div className='newsPageAuthorsSliderCardWrapper'>
//                 <div className='newsPageAuthorsSliderCardUserPhotoWrapper'>
//                     <img
//                         className='newsPageAuthorsSliderCardUserPhoto'
//                         src={'/Img/mainInstagramSliderUserPhoto.png'}
//                         alt={t('Фотографія автора')}
//                         onError={e => {
//                             e.target.onerror = null
//                             e.target.src = '/Img/mainInstagramSliderUserPhoto.png'
//                         }}
//                     />
//                 </div>
//                 <div className='newsPageAuthorsSliderCardUserNameWrapper'>
//                     <p className='newsPageAuthorsSliderCardUserName'>Дмитро Рудченко</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const NewsPageAuthorsSlider = () => {
//     const { t } = useTranslation()
//     const [posts, setPosts] = useState([])
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchInstagramPosts = async () => {
//             try {
//                 const response = await axios.get(``)
//                 setPosts(response.data.data)
//             } catch (error) {
//                 console.error('Error fetching Instagram post data', error)
//                 setError(error)
//             }
//         }

//         fetchInstagramPosts()
//     }, [])

//     return (
//         <div className='newsPageAuthorsSliderContainer'>
//             <div className='newsPageAuthorsSliderWrapper'>
//                 <div className='newsPageAuthorsSliderTitleWrapper'>
//                     <p className='newsPageAuthorsSliderTitle'>{t('Автори')}</p>
//                 </div>

//                 <div className='newsPageAuthorsSliderInnerWrapper'>
//                     <Swiper
//                         modules={[Navigation, Pagination]}
//                         spaceBetween={0}
//                         slidesPerView={'auto'}
//                         navigation
//                         pagination={{ clickable: false, type: 'fraction' }}
//                         onSlideChange={() => console.log('slide change')}
//                         onSwiper={swiper => console.log(swiper)}
//                     >
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <Slide />
//                         </SwiperSlide>
//                     </Swiper>
//                     <div className={'${swiper-button-prev}'}></div>
//                     <div className={'${swiper-pagination}'}></div>
//                     <div className={'${swiper-button-next}'}></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NewsPageAuthorsSlider

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.scss'

const Slide = ({ creator, onClick }) => {
	const { t } = useTranslation()
	return (
		<div
			className='newsPageAuthorsSliderCardContainer'
			onClick={() => onClick(creator.id)}
		>
			<div className='newsPageAuthorsSliderCardWrapper'>
				<div className='newsPageAuthorsSliderCardUserPhotoWrapper'>
					<img
						className='newsPageAuthorsSliderCardUserPhoto'
						src={
							creator.images
								? // ? `http://localhost:5000${creator.images.replace('../../', '/')}`
									// : '/Img/mainInstagramSliderUserPhoto.png'

									`https://art.playukraine.com${creator.images.replace('../../', '/')}`
								: '/Img/halfNewsCard.jpg'
						}
						alt={t('Фотографія автора')}
						loading='lazy'
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/mainInstagramSliderUserPhoto.png'
						}}
					/>
				</div>
				<div className='newsPageAuthorsSliderCardUserNameWrapper'>
					<p className='newsPageAuthorsSliderCardUserName'>{creator.title}</p>
				</div>
			</div>
		</div>
	)
}

const NewsPageAuthorsSlider = () => {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [error, setError] = useState(null)
	const [creators, setCreators] = useState({})
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCreator = async () => {
			try {
				const response = await axios.get(`/api/users/creators`)
				console.log('Received author data ', response.data)
				setCreators(response.data.creators)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching author data', error)
				setLoading(false)
			}
		}

		fetchCreator()
	}, [])

	const handleSlideClick = creatorId => {
		navigate(`/creators/${creatorId}`)
	}

	return (
		<div className='newsPageAuthorsSliderContainer'>
			<div className='newsPageAuthorsSliderWrapper'>
				<div className='newsPageAuthorsSliderTitleWrapper'>
					<p className='newsPageAuthorsSliderTitle'>{t('Автори')}</p>
				</div>

				<div className='newsPageAuthorsSliderInnerWrapper'>
					{' '}
					{loading ? (
						<p>{t('Завантаження авторів...')}</p>
					) : error ? (
						<p>{error}</p>
					) : creators.length === 0 ? (
						<p>{t('Немає авторів для відображення.')}</p>
					) : (
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={0}
							slidesPerView={'auto'}
							navigation
							pagination={{ clickable: false, type: 'fraction' }}
							onSlideChange={() => console.log('slide change')}
							onSwiper={swiper => console.log(swiper)}
						>
							{creators.map(creator => (
								<SwiperSlide key={creator.id}>
									<Slide creator={creator} onClick={handleSlideClick} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default NewsPageAuthorsSlider
