// src/components/PostDetail/PostDetail.jsx

import TranslatedContent from '@components/Blocks/TranslatedContent'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../../styles/components/Post/PostDetail.module.scss'
import {
	getFormattedDate,
	getFormattedTime,
	getImageUrl,
} from '../../../utils/helper'
import PostDetailPopularNewsSlider from '../../components/Sliders/PostDetailPopularNewsSlider/PostDetailPopularNewsSlider'

function PostDetail() {
	const { t } = useTranslation()
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(`/api/posts/${id}`)
			.then((response) => {
				console.log('Received post data:', response.data)
				setPost(response.data)
			})
			.catch((error) => {
				console.error('Error fetching post:', error)
				setError(error)
			})
	}, [id])

	if (error) {
		return <div>{t('Error loading post')}</div>
	}

	if (!post) {
		return <div>{t('Loading...')}</div>
	}

	const featuredMediaUrl = getImageUrl(post.images, '/Img/halfNewsCard.jpg')

	const formattedDate = getFormattedDate(post.createdAt)
	const formattedTime = getFormattedTime(post.createdAt)
	const handleNewsPageClick = () => {
		navigate('/NewsPage')
	}

	return (
		<div className={styles.postDetailContainer}>
			<div className={`${styles.postPageNavigationContainer}`}>
				<nav className={`${styles.postPageNavigation}`}>
					<ul className={`${styles.postPageNavigationList}`}>
						<li
							className={`${styles.postPageNavigationItem}`}
							onClick={handleNewsPageClick}
						>
							{t('Новини')}
						</li>
						<p
							className={`${styles.postPageNavigationItemSeparator}`}
						>
							&#8250;
						</p>
						<li className={`${styles.postPageNavigationItem}`}>
							<TranslatedContent
								en={post.title_en}
								uk={post.title_uk}
							/>
						</li>
					</ul>
				</nav>
			</div>

			<div className={styles.postPageAboutNewsContainer}>
				<div
					className={`${styles.postPagePhotoNewsWithDescriptionWrapper}`}
				>
					<div className={`${styles.postPageNewsPhotoWrapper}`}>
						<img
							className={`${styles.postPageNewsPhoto}`}
							src={featuredMediaUrl}
							alt={t('Світлина новини')}
							onError={(e) => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</div>
				</div>
				<div className={styles.postPageNewsTitleWrapper}>
					<h1 className={`${styles.postPageNewsTitle}`}>
						<TranslatedContent
							en={post.title_en}
							uk={post.title_uk}
						/>
					</h1>
				</div>

				<div className={`${styles.postPageNewsSeparatorWrapper}`}>
					<div className={`${styles.postPageNewsSeparator}`}></div>
				</div>

				<div className={`${styles.postPageNewsDescriptionWrapper}`}>
					<p className={`${styles.postPageNewsDescription}`}>
						<TranslatedContent
							en={post.content_en}
							uk={post.content_uk}
							html
						/>
					</p>
				</div>
				<div className={`${styles.postPageNewsAuthorNameWrapper}`}>
					<p className={`${styles.postPageNewsAuthorName}`}>
						{t('Автор')}: {post.author.title || post.author.email}
					</p>
				</div>
				<div className={`${styles.cardClockAndDateWrapper}`}>
					<div className={`${styles.cardClockAndDateInner}`}>
						<div className={`${styles.cardClockImgWrapper}`}>
							<img
								className={`${styles.cardClockImg}`}
								src={'/Img/clock.svg'}
								alt={t('Світлина годинника')}
								onError={(e) => {
									e.target.onerror = null
									e.target.src = '/Img/clock.svg'
								}}
							/>
						</div>
						<div
							className={`${styles.postPageNewsDataTimeWrapper}`}
						>
							<p className={`${styles.postPageNewsDataTime}`}>
								{t('Дата')}:{' '}
								{`${formattedDate} ${formattedTime}`}
							</p>
						</div>
					</div>
				</div>
				<div className={`${styles.postPageNewsReadMoreButtonWrapper}`}>
					<button className={`${styles.postPageNewsReadMoreButton}`}>
						<p
							className={`${styles.postPageNewsReadMoreButtonText}`}
						>
							{t('Інші статті автора')}
						</p>
						<p
							className={`${styles.postPageNewsReadMoreButtonArrow}`}
						>
							&#160;&#10230;
						</p>
					</button>
				</div>
			</div>

			<PostDetailPopularNewsSlider />
		</div>
	)
}

export default PostDetail
