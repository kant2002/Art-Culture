import React from 'react';
import { useTranslation } from 'react-i18next'
import '../../../../styles/components/Sliders/MuseumPageSliders/ArtsOfThisMuseumSlider.scss';

const GridWrapper = () => {    
	const { t } = useTranslation();
    return (
        <div className="grid-wrapper">
            <div>
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/1.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div>
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/2.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="tall">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/3.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="wide">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/4.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            {/* Add the rest of your divs and images here */}
            <div className="wide Last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/5.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/6.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/7.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/8.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/9.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/10.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/11.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/12.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/13.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/14.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
            <div className="last">
                <img className="popularInThisMuseumSliderShareButtonImg"
                    src={'/Img/gallery/15.webp'}
                    alt={t('Світлина поширити')}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = '/Img/shareArrow.svg'
                    }}
                />
            </div>
        </div>
    );
};

export default GridWrapper;
