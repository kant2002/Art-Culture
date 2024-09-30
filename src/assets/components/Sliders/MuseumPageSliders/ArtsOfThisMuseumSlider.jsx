// GallerySlider.jsx
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Импорт собственного SCSS
import '../../../../styles/components/Sliders/MuseumPageSliders/ArtsOfThisMuseumSlider.scss';

// Пример данных (замените на реальные или передайте через пропсы)
const images = [
    {
        id: 1,
        url: '/Img/gallery/1.webp',
        timeAdded: '2024-04-01T10:00:00Z',
        rating: 4.5,
    },
    {
        id: 2,
        url: '/Img/gallery/2.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 3,
        url: '/Img/gallery/3.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 4,
        url: '/Img/gallery/4.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 5,
        url: '/Img/gallery/5.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 6,
        url: '/Img/gallery/6.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 7,
        url: '/Img/gallery/7.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 8,
        url: '/Img/gallery/8.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 9,
        url: '/Img/gallery/9.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 10,
        url: '/Img/gallery/10.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 11,
        url: '/Img/gallery/11.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 12,
        url: '/Img/gallery/12.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 13,
        url: '/Img/gallery/13.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 14,
        url: '/Img/gallery/14.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 3.8,
    },
    {
        id: 15,
        url: '/Img/gallery/15.webp',
        timeAdded: '2024-04-02T12:30:00Z',
        rating: 2.8,
    },
    // Добавьте остальные изображения
];

const GallerySlider = () => {
    const [sortBy, setSortBy] = useState('timeAdded'); // 'timeAdded' или 'rating'

    // Функция сортировки
    const sortedImages = [...images].sort((a, b) => {
        if (sortBy === 'timeAdded') {
            return new Date(b.timeAdded) - new Date(a.timeAdded); // Новые первыми
        } else if (sortBy === 'rating') {
            return b.rating - a.rating; // Высокий рейтинг первыми
        }
        return 0;
    });

    // Разделим изображения на группы для слайдов
    const imagesPerSlide = 10; // Количество изображений на одном слайде (настраиваемо)
    const slides = [];
    for (let i = 0; i < sortedImages.length; i += imagesPerSlide) {
        slides.push(sortedImages.slice(i, i + imagesPerSlide));
    }

    // Настройки для react-masonry-css
    const masonryBreakpoints = {
        default: 4, // Количество колонок по умолчанию
        1439: 3,
        700: 2,
        500: 1,
    };

    return (
        <div className="gallery-slider-container">
            {/* Контролы сортировки */}
            <div className="sort-controls">
                <button
                    onClick={() => setSortBy('timeAdded')}
                    className={`sort-button ${sortBy === 'timeAdded' ? 'active' : ''}`}
                >
                    Сортировать по времени
                </button>
                <button
                    onClick={() => setSortBy('rating')}
                    className={`sort-button ${sortBy === 'rating' ? 'active' : ''}`}
                >
                    Сортировать по рейтингу
                </button>
            </div>

            {/* Swiper слайдер */}
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: false, type: 'fraction' }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="gallery-swiper"
            >
                {slides.map((slideImages, index) => (
                    <SwiperSlide key={index}>
                        <Masonry
                            breakpointCols={masonryBreakpoints}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {slideImages.map((image) => (
                                <div key={image.id} className="masonry-item">
                                    <img
                                        src={image.url}
                                        alt={`Image ${image.id}`}
                                        className="masonry-image"
                                    />
                                </div>
                            ))}
                        </Masonry>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default GallerySlider;
