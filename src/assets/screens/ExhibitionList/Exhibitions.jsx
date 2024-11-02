import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/Context/AuthContext'
import styles from '/src/styles/screen/ExhibitionList/Exhibitions.module.scss'
import API from '/src/utils/api.js'

function MuseumExhibitions() {
	const [exhibitions, setExhibitions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const { user, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchExhibitions = async () => {
			try {
				const response = await API.get('/exhibitions/my-exhibitions', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setExhibitions(response.data.exhibitions)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching exhibitions:', error)
				setError('Failed to load exhibitions.')
				setLoading(false)
			}
		}

		fetchExhibitions()
	}, [])

	if (loading) {
		return <div>Loading exhibitions...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	const handleProductCartCreateClick = () => {
		navigate('/ProductCardCreate')
	}

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleExhibitionCardCreateClick = () => {
		navigate('/ExhibitionCardCreate')
	}

	const handleExhibitionListClick = () => {
		navigate('/Exhibitions')
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleProfilePageClick}
				>
					{t('Профіль')}
				</button>
				<button className={styles.profileAction} onClick={handlePostsClick}>
					{t('Публікації')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
				</button>

				<button
					className={styles.profileAction}
					onClick={handleProductCartCreateClick}
				>
					{t('Додати картину')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handlePaintingCardListClick}
				>
					{t('Переглянути вироби/картини ')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionCardCreateClick}
				>
					{t('Додати виставку ')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionListClick}
				>
					{t('Переглянути виставки')}
				</button>
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>
			<div className={styles.exhibitionsContainer}>
				<h2>Your Exhibitions</h2>
				{exhibitions.length === 0 ? (
					<p>You have not created any exhibitions yet.</p>
				) : (
					<div className={styles.exhibitionList}>
						{exhibitions.map(exhibition => (
							<div key={exhibition.id} className={styles.exhibitionCard}>
								<h3>{exhibition.title}</h3>
								<p>{exhibition.description}</p>
								<p>
									Dates: {new Date(exhibition.startDate).toLocaleDateString()} -{' '}
									{new Date(exhibition.endDate).toLocaleDateString()}
								</p>
								<p>Location: {exhibition.location}</p>
								{/* Display images if available */}
								{exhibition.images && exhibition.images.length > 0 && (
									<div className={styles.imagesContainer}>
										{exhibition.images.map(image => (
											<img
												key={image.id}
												src={image.imageUrl}
												alt={exhibition.title}
												loading='lazy'
												className={styles.exhibitionImage}
											/>
										))}
									</div>
								)}
								<button
									onClick={() => navigate(`/exhibitions/${exhibition.id}`)}
									className={styles.detailsButton}
								>
									View Details
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default MuseumExhibitions
