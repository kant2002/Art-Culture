import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { fetchUserPosts, validateJWT } from '../../components/API/ApiFetcher'
import styles from '/src/styles/components/UserProfile/userProfilePosts.module.scss'

function UserProfilePosts() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [posts, setPosts] = useState([]) // Posts state
	const [loading, setLoading] = useState(true)
	const [media, setMedia] = useState({})
	const [error, setError] = useState('') // Error state
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jwt = localStorage.getItem('jwt') // Retrieve JWT from localStorage
				console.log('JWT token', jwt)

				if (!jwt) {
					setError('User not authenticated')
					setLoading(false)
					return
				}

				// Validate JWT and get user ID
				const validationResponse = await validateJWT(jwt)
				console.log('Validation response:', validationResponse)
				if (validationResponse.success) {
					const userId = validationResponse.data.user.ID
					setUserId(userId) // Set user ID in state

					// Fetch posts by this user
					console.log('Fetched user ID:', userId)
					const userPosts = await fetchUserPosts(userId)
					console.log('Fetched User posts:', userPosts)
					setPosts(Array.isArray(userPosts) ? userPosts : [])

					const mediaResponse = await axios.get(
						'https://admin.playukraine.com/wp-json/wp/v2/media',
						{
							headers: {
								Authorization: `Bearer ${jwt}`,
							},
						}
					)

					const mediaMap = mediaResponse.data.reduce((acc, mediaItem) => {
						acc[mediaItem.id] = mediaItem.source_url
						return acc
					}, {})

					console.log('Fetched Media data:', mediaMap)
					setMedia(mediaMap)
				} else {
					setError('Failed to validate user')
					navigate('/login') // Redirect to login if JWT validation fails
				}
			} catch (error) {
				console.error('Error fetching data:', error)
				setError('Failed to fetch posts')
			} finally {
				setLoading(false)
			}
		}

		fetchUserData() // Fetch data on component mount
	}, [navigate])

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
					<p>{error}</p>
				) : posts.length === 0 ? (
					<p>{t('Публікацій немає')}</p>
				) : (
					posts.map(post => {
						const mediaUrl =
							media[post.featured_media] ||
							'/Img/mainPopularArtistsSliderIMG.jpg'
						return (
							<div key={post.id} className={styles.userProfilePostsWrapper}>
								<div className={styles.userProfilePostsPicAndTextWrapper}>
									<div className={styles.userProfilePostsPicWrapper}>
										<img
											className={styles.userProfilePostsPic}
											src={mediaUrl}
											alt={t('Світлина мистецтва')}
											onError={e => {
												e.target.onerror = null
												e.target.src = '/Img/mainPopularArtistsSlide.jpg'
											}}
										/>
									</div>
									<div className={styles.userProfilePostsTextWrapper}>
										<h3 className={styles.userProfilePostsTitle}>
											{post.title.rendered || t('Нова публікація')}
										</h3>
										<p className={styles.userProfilePostsDescription}>
											{post.excerpt.rendered || t('Опис публікації')}
										</p>
										<div className={styles.userProfilePostsClockAndDateWrapper}>
											<img
												className={styles.userProfilePostsClock}
												src='/Img/clock.svg'
												alt={t('Дата')}
											/>
											<p className={styles.userProfilePostsDate}>
												{new Date(post.date).toLocaleDateString()}
											</p>
										</div>
										<button className={styles.userProfilePostsButton}>
											{t('До публікації')}
										</button>
									</div>
								</div>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default UserProfilePosts
