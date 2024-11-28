// src/components/PostDetail/PostDetail.jsx

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styles from '../../../styles/components/Post/PostDetail.module.scss'

function PostDetail() {
	const { t, i18n } = useTranslation()
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [error, setError] = useState(null)
	const currentLanguage = i18n.language

	useEffect(() => {
		axios
			.get(`/api/posts/${id}`)
			.then(response => {
				console.log('Received post data:', response.data)
				setPost(response.data)
			})
			.catch(error => {
				console.error('Error fetching post:', error)
				setError(error)
			})
	}, [id])

	const host = window.location.hostname
	const isLocalhost = host === 'localhost' || host === '127.0.0.1'
	const baseUrl = isLocalhost
		? 'http://localhost:5000'
		: 'https://art.playukraine.com'

	if (error) {
		return <div>{t('Error loading post')}</div>
	}

	if (!post) {
		return <div>{t('Loading...')}</div>
	}

	const featuredMediaUrl = post.images
		? `${baseUrl}${post.images.replace('../../', '/')}`
		: '/Img/halfNewsCard.jpg'

	const postDate = new Date(post.createdAt)
	const formattedDate = postDate.toLocaleDateString('uk-UA', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const formattedTime = postDate.toLocaleTimeString('uk-UA', {
		hour: 'numeric',
		minute: 'numeric',
	})

	const title = currentLanguage === 'en' ? post.title_en : post.title_uk
	const content = currentLanguage === 'en' ? post.content_en : post.content_uk

	return (
		<div className={styles.postDetailContainer}>
			<img
				src={featuredMediaUrl}
				alt={t('Світлина новини')}
				onError={e => {
					e.target.onerror = null
					e.target.src = '/Img/newsCardERROR.jpg'
				}}
			/>
			<h1>{title}</h1>
			<p>{content}</p>
			<p>
				{t('Автор')}: {post.author.title || post.author.email}
			</p>
			<p>
				{t('Дата')}: {`${formattedDate} ${formattedTime}`}
			</p>
		</div>
	)
}

export default PostDetail
