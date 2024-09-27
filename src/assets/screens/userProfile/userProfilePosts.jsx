// src/components/UserProfile/UserProfilePosts.jsx

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfilePosts.module.scss'

function UserProfilePosts() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAuth()

	const [posts, setPosts] = useState([]) // User's posts
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('') // Error state

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				if (!user) {
					setError('User not authenticated')
					navigate('/login')
					return
				}

				// Fetch posts by this user
				const response = await API.get('/posts', {
					params: { authorId: user.id }, // Assuming your API can filter by authorId
				})

				setPosts(Array.isArray(response.data) ? response.data : [])
			} catch (err) {
				console.error('Error fetching user posts:', err)
				setError('Failed to fetch posts')
			} finally {
				setLoading(false)
			}
		}

		fetchUserPosts()
	}, [user, navigate])

	// Handlers for navigation
	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}
	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={styles.profileAction}
					onClick={handleProfilePageClick}
				>
					{t('Профіль')}
				</button>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
				>
					{t('Публікації')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
				</button>
			</div>

			<div className={styles.userProfilePostsContainer}>
				{loading ? (
					<p>{t('Завантаження...')}</p>
				) : error ? (
					<p className={styles.ErrorMessage}>{error}</p>
				) : posts.length === 0 ? (
					<p>{t('Публікацій немає')}</p>
				) : (
					posts.map(post => (
						<div key={post.id} className={styles.userProfilePostsWrapper}>
							<div className={styles.userProfilePostsPicAndTextWrapper}>
								<div className={styles.userProfilePostsPicWrapper}>
									{post.images ? (
										<img
											className={styles.userProfilePostsPic}
											src={post.images}
											alt={t('Світлина публікації')}
											onError={e => {
												e.target.onerror = null
												e.target.src = '/Img/defaultPostImage.jpg' // Default image path
											}}
										/>
									) : (
										<img
											className={styles.userProfilePostsPic}
											src='/Img/defaultPostImage.jpg'
											alt={t('Світлина публікації')}
										/>
									)}
								</div>
								<div className={styles.userProfilePostsTextWrapper}>
									<h3 className={styles.userProfilePostsTitle}>{post.title}</h3>
									<p className={styles.userProfilePostsDescription}>
										{post.content.substring(0, 100)}...
									</p>
									<div className={styles.userProfilePostsClockAndDateWrapper}>
										<img
											className={styles.userProfilePostsClock}
											src='/Img/clock.svg'
											alt={t('Дата')}
										/>
										<p className={styles.userProfilePostsDate}>
											{new Date(post.createdAt).toLocaleDateString()}
										</p>
										<button
											className={styles.userProfilePostsButton}
											onClick={() => navigate(`/posts/${post.id}`)} // Navigate to post detail page
										>
											{t('До публікації')}
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default UserProfilePosts
