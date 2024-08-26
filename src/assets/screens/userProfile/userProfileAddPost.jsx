// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
// import {
// 	addNewPost,
// 	refreshJWT,
// 	validateJWT,
// } from '../../components/API/ApiFetcher' // Ensure validateJWT is imported
// import '/src/styles/components/UserProfile/userProfile.module.scss'
// import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'

// function UserProfileAddPost() {
// 	const { t } = useTranslation()
// 	const navigate = useNavigate()

// 	const [formData, setFormData] = useState({
// 		titleUa: '',
// 		descriptionUa: '',
// 		titleEn: '',
// 		descriptionEn: '',
// 		photo: null,
// 	})

// 	const [remainingTitleUa, setRemainingTitleUa] = useState(50)
// 	const [remainingTitleEn, setRemainingTitleEn] = useState(50)
// 	const [message, setMessage] = useState('')
// 	const [isLoggedIn, setIsLoggedIn] = useState(false)

// 	useEffect(() => {
// 		// Function to check if the user is logged in
// 		const checkIfLoggedIn = async () => {
// 			const jwt = localStorage.getItem('jwt')
// 			if (!jwt) {
// 				setIsLoggedIn(false)
// 				setMessage('User not authenticated. Please log in.')
// 				navigate('/login') // Redirect to login page if no JWT is found
// 				return
// 			}

// 			try {
// 				const validationResponse = await validateJWT(jwt)
// 				if (validationResponse.success) {
// 					setIsLoggedIn(true) // User is logged in
// 					console.log('User is logged in.')
// 				} else {
// 					// Try refreshing the JWT if it's expired
// 					const refreshResponse = await refreshJWT(jwt)
// 					if (refreshResponse.success) {
// 						localStorage.setItem('jwt', refreshResponse.data.new_jwt)
// 						setIsLoggedIn(true) // User is logged in after refreshing JWT
// 						console.log('JWT refreshed and user is logged in.')
// 					} else {
// 						setIsLoggedIn(false)
// 						setMessage('Session expired, please log in again.')
// 						navigate('/login')
// 					}
// 				}
// 			} catch (error) {
// 				setIsLoggedIn(false)
// 				setMessage('Failed to validate session. Please log in.')
// 				console.error('Error validating JWT:', error)
// 				navigate('/login')
// 			}
// 		}

// 		checkIfLoggedIn()
// 	}, [navigate])

// 	const handleProfilePageClick = () => {
// 		navigate('/userProfile')
// 	}

// 	const handlePostsClick = () => {
// 		navigate('/userProfilePosts')
// 	}

// 	const handleAddPostClick = () => {
// 		navigate('/userProfileAddPost')
// 	}

// 	const handleChange = e => {
// 		const { name, value, files } = e.target

// 		const latinRegex = /^[a-zA-Z\s]*$/
// 		const cyrillicRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ\s]*$/

// 		if (
// 			(name === 'titleUa' || name === 'descriptionUa') &&
// 			!cyrillicRegex.test(value)
// 		) {
// 			return
// 		} else if (
// 			(name === 'titleEn' || name === 'descriptionEn') &&
// 			!latinRegex.test(value)
// 		) {
// 			return
// 		}

// 		if (name === 'photo') {
// 			setFormData({ ...formData, photo: files[0] })
// 		} else {
// 			setFormData({ ...formData, [name]: value })

// 			if (name === 'titleUa') {
// 				setRemainingTitleUa(50 - value.length)
// 			} else if (name === 'titleEn') {
// 				setRemainingTitleEn(50 - value.length)
// 			}

// 			if (e.target.tagName.toLowerCase() === 'textarea') {
// 				e.target.style.height = 'auto'
// 				e.target.style.height = e.target.scrollHeight + 'px'
// 			}
// 		}
// 	}

// 	const handleSubmit = async e => {
// 		e.preventDefault()

// 		let jwt = localStorage.getItem('jwt') // Retrieve JWT from local storage
// 		console.log('JWT token:', jwt) // Log JWT token for inspection
// 		if (!jwt) {
// 			setMessage('User not authenticated')
// 			navigate('/login') // Redirect to login if JWT is not found
// 			return
// 		}

// 		let validationResponse

// 		try {
// 			// Validate JWT
// 			const validationResponse = await validateJWT(jwt)
// 			console.log('Validation response:', validationResponse)

// 			if (!validationResponse.success) {
// 				// Try refreshing the JWT if it's expired
// 				const refreshResponse = await refreshJWT(jwt)
// 				if (refreshResponse.success) {
// 					jwt = refreshResponse.data.new_jwt
// 					localStorage.setItem('jwt', jwt)
// 					console.log('Refreshed JWT token:', jwt)

// 					// Re-validate with the new token
// 					validationResponse = await validateJWT(jwt)
// 					if (!validationResponse.success) {
// 						setMessage('Session expired, please log in again')
// 						navigate('/login')
// 						return
// 					}
// 				} else {
// 					setMessage('Session expired, please log in again')
// 					navigate('/login')
// 					return
// 				}
// 			}
// 		} catch (error) {
// 			setMessage('Failed to validate session')
// 			console.error('Error validating JWT:', error)
// 			return
// 		}

// 		console.log('User roles:', validationResponse.data.roles)
// 		if (
// 			!validationResponse.data.roles.includes('administrator') &&
// 			!validationResponse.data.roles.includes('editor') &&
// 			!validationResponse.data.roles.includes('author')
// 		) {
// 			setMessage('User does not have permission to create posts.')
// 			return
// 		}

// 		// 1. Upload media first (if photo exists)
// 		let mediaId = null
// 		if (formData.photo) {
// 			const mediaData = new FormData()
// 			mediaData.append('file', formData.photo)
// 			mediaData.append('title', formData.titleUa || formData.titleEn)
// 			mediaData.append(
// 				'description',
// 				formData.descriptionUa || formData.descriptionEn
// 			)
// 			mediaData.append('status', 'publish')

// 			try {
// 				console.log('Attempting to upload media...')
// 				const mediaResponse = await axios.post(
// 					'https://admin.playukraine.com/wp-json/wp/v2/media',
// 					mediaData,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${jwt}`, // JWT for authentication
// 							'Content-Type': 'multipart/form-data',
// 						},
// 					}
// 				)
// 				mediaId = mediaResponse.data.id
// 				console.log('Uploaded media ID:', mediaId)
// 			} catch (error) {
// 				console.error('Failed  uploading media', error.response || error)
// 				if (error.response) {
// 					console.error('Server response:', error.response.data)
// 				}
// 				setMessage('Error to upload media:', error)
// 				return
// 			}
// 		}

// 		// 2. Prepare post data
// 		const postData = {
// 			title: {
// 				uk: formData.titleUa,
// 				en: formData.titleEn,
// 			},
// 			content: {
// 				uk: formData.descriptionUa,
// 				en: formData.descriptionEn,
// 			},
// 			status: 'publish', // or 'draft'
// 			featured_media: mediaId, // Attach uploaded media ID if available
// 		}

// 		try {
// 			// 3. Submit post data
// 			const response = await addNewPost(postData, jwt)
// 			setMessage(`Post added successfully: ${response.id}`)
// 			navigate('/userProfilePosts') // Redirect after successful post creation
// 		} catch (error) {
// 			setMessage('Failed to add post')
// 			console.error('Error adding post:', error)
// 		}
// 	}

// 	return (
// 		<div className={`${styles.profile}`}>
// 			<div className={`${styles.profileActions}`}>
// 				<button
// 					className={`${styles.profileAction}`}
// 					onClick={handleProfilePageClick}
// 				>
// 					{t('Профіль')}
// 				</button>
// 				<button
// 					className={`${styles.profileAction}`}
// 					onClick={handlePostsClick}
// 				>
// 					{t('Публікації')}
// 				</button>
// 				<button
// 					className={`${styles.profileAction} ${styles.profileActionActive}`}
// 					onClick={handleAddPostClick}
// 				>
// 					{t('Додати публікацію')}
// 				</button>
// 			</div>

// 			<div className={`${styles.profileAddPostContainer}`}>
// 				<h2 className={`${styles.profileAddPostTitle}`}>
// 					Додати нову публікацію
// 				</h2>
// 				<form
// 					onSubmit={handleSubmit}
// 					className={`${styles.profileAddPostForm}`}
// 				>
// 					<div className={`${styles.profileAddPostField}`}>
// 						<label className={`${styles.profileAddPostLabel}`}>
// 							Введіть назву публікації українською мовою:
// 							<input
// 								type='text'
// 								name='titleUa'
// 								value={formData.titleUa}
// 								onChange={handleChange}
// 								maxLength='50'
// 								// required
// 								className={`${styles.profileAddPostInput}`}
// 								placeholder='Наприклад: Моя перша публікація'
// 							/>
// 						</label>
// 						<small className={styles.remainingChars}>
// 							{remainingTitleUa} {t('символів залишилось')}
// 						</small>
// 					</div>
// 					<div className={`${styles.profileAddPostField}`}>
// 						<label className={`${styles.profileAddPostLabel}`}>
// 							{t('Введіть опис публікації українською мовою:')}
// 							<textarea
// 								name='descriptionUa'
// 								value={formData.descriptionUa}
// 								onChange={handleChange}
// 								//required
// 								className={`${styles.profileAddPostTextarea}`}
// 								placeholder='Введіть детальний опис публікації'
// 							/>
// 						</label>
// 					</div>
// 					{/* <div className={`${styles.profileAddPostField}`}>
// 						<label className={`${styles.profileAddPostLabel}`}>
// 							Введіть назву публікації англійською мовою:
// 							<input
// 								type='text'
// 								name='titleEn'
// 								value={formData.titleEn}
// 								onChange={handleChange}
// 								maxLength='50'
// 								required
// 								className={`${styles.profileAddPostInput}`}
// 								placeholder='For example: My first post'
// 							/>
// 						</label>
// 						<small className={styles.remainingChars}>
// 							{remainingTitleEn} {t('символів залишилось')}
// 						</small>
// 					</div>
// 					<div className={`${styles.profileAddPostField}`}>
// 						<label className={`${styles.profileAddPostLabel}`}>
// 							Введіть опис публікації англійською мовою:
// 							<textarea
// 								name='descriptionEn'
// 								value={formData.descriptionEn}
// 								onChange={handleChange}
// 								required
// 								className={`${styles.profileAddPostTextarea}`}
// 								placeholder='Enter a detailed description of the post'
// 							/>
// 						</label>
// 					</div> */}
// 					{/* <div className={`${styles.profileAddPostField}`}>
// 						<label className={`${styles.profileAddPostLabel}`}>
// 							Завантажте фото для публікації:
// 							<input
// 								type='file'
// 								name='photo'
// 								accept='image/*'
// 								onChange={handleChange}
// 								required
// 								className={`${styles.profileAddPostFileInput}`}
// 							/>
// 						</label>
// 					</div> */}
// 					<button type='submit' className={`${styles.profileAddPostButton}`}>
// 						Зберегти
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	)
// }

// export default UserProfileAddPost
// userProfileAddPost.jsx (React Component)

import apiFetch from '@wordpress/api-fetch'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { refreshJWT, validateJWT } from '../../components/API/ApiFetcher' // Import wp.apiFetch version
import '/src/styles/components/UserProfile/userProfile.module.scss'
import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'

function UserProfileAddPost() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		titleUa: '',
		descriptionUa: '',
		titleEn: '',
		descriptionEn: '',
		photo: null,
	})

	const [remainingTitleUa, setRemainingTitleUa] = useState(50)
	const [remainingTitleEn, setRemainingTitleEn] = useState(50)
	const [message, setMessage] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const checkIfLoggedIn = async () => {
			let jwt = localStorage.getItem('jwt')
			if (!jwt) {
				setIsLoggedIn(false)
				setMessage('User not authenticated. Please log in.')
				navigate('/login')
				return
			}

			try {
				const validationResponse = await validateJWT(jwt)
				if (validationResponse.success) {
					setIsLoggedIn(true)
				} else {
					const refreshResponse = await refreshJWT(jwt)
					if (refreshResponse.success) {
						jwt = refreshResponse.new_jwt
						localStorage.setItem('jwt', jwt)
						setIsLoggedIn(true)
					} else {
						setIsLoggedIn(false)
						setMessage('Session expired, please log in again.')
						navigate('/login')
					}
				}
			} catch (error) {
				setIsLoggedIn(false)
				setMessage('Failed to validate session. Please log in.')
				console.error('Error validating JWT:', error)
				navigate('/login')
			}
		}

		checkIfLoggedIn()
	}, [navigate])

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'photo') {
			setFormData({ ...formData, photo: files[0] })
		} else {
			setFormData({ ...formData, [name]: value })

			if (name === 'titleUa') {
				setRemainingTitleUa(50 - value.length)
			} else if (name === 'titleEn') {
				setRemainingTitleEn(50 - value.length)
			}

			if (e.target.tagName.toLowerCase() === 'textarea') {
				e.target.style.height = 'auto'
				e.target.style.height = `${e.target.scrollHeight}px`
			}
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		let jwt = localStorage.getItem('jwt')
		const nonce = window.my_ajax_object?.nonce // Get nonce from localized script

		if (!jwt) {
			setMessage('User not authenticated')
			navigate('/login')
			return
		}

		if (!nonce) {
			console.error('Nonce is missing')
			setMessage('Failed to get nonce. Please try again.')
			return
		}

		try {
			// Validate JWT
			const validationResponse = await validateJWT(jwt)
			if (!validationResponse.success) {
				const refreshResponse = await refreshJWT(jwt)
				if (refreshResponse.success) {
					jwt = refreshResponse.new_jwt
					localStorage.setItem('jwt', jwt)
				} else {
					setMessage('Session expired, please log in again')
					navigate('/login')
					return
				}
			}
		} catch (error) {
			setMessage('Failed to validate session')
			console.error('Error validating JWT:', error)
			return
		}

		let mediaId = null
		if (formData.photo) {
			const mediaData = new FormData()
			mediaData.append('file', formData.photo)
			mediaData.append('title', formData.titleUa || formData.titleEn)
			mediaData.append(
				'description',
				formData.descriptionUa || formData.descriptionEn
			)
			mediaData.append('status', 'publish')

			try {
				const mediaResponse = await apiFetch({
					path: '/wp/v2/media',
					method: 'POST',
					headers: {
						'X-WP-Nonce': nonce,
						Authorization: `Bearer ${jwt}`,
					},
					body: mediaData,
				})
				mediaId = mediaResponse.id
			} catch (error) {
				console.error('Failed uploading media', error.response || error)
				setMessage('Error uploading media')
				return
			}
		}

		const postData = {
			title: {
				uk: formData.titleUa,
				en: formData.titleEn,
			},
			content: {
				uk: formData.descriptionUa,
				en: formData.descriptionEn,
			},
			status: 'publish',
			featured_media: mediaId,
		}

		try {
			const postResponse = await apiFetch({
				path: '/wp/v2/posts',
				method: 'POST',
				headers: {
					'X-WP-Nonce': nonce,
					Authorization: `Bearer ${jwt}`,
				},
				data: postData,
			})
			setMessage(`Post added successfully: ${postResponse.id}`)
			navigate('/userProfilePosts')
		} catch (error) {
			setMessage('Failed to add post')
			console.error('Error adding post:', error)
		}
	}

	return (
		<div className={`${styles.profile}`}>
			<div className={`${styles.profileActions}`}>
				<button
					className={`${styles.profileAction}`}
					onClick={() => navigate('/userProfile')}
				>
					{t('Профіль')}
				</button>
				<button
					className={`${styles.profileAction}`}
					onClick={() => navigate('/userProfilePosts')}
				>
					{t('Публікації')}
				</button>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={() => navigate('/userProfileAddPost')}
				>
					{t('Додати публікацію')}
				</button>
			</div>

			<div className={`${styles.profileAddPostContainer}`}>
				<h2 className={`${styles.profileAddPostTitle}`}>
					{t('Додати нову публікацію')}
				</h2>
				<form
					onSubmit={handleSubmit}
					className={`${styles.profileAddPostForm}`}
				>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							{t('Введіть назву публікації українською мовою:')}
							<input
								type='text'
								name='titleUa'
								value={formData.titleUa}
								onChange={handleChange}
								maxLength='50'
								className={`${styles.profileAddPostInput}`}
								placeholder='Наприклад: Моя перша публікація'
							/>
						</label>
						<small className={styles.remainingChars}>
							{remainingTitleUa} {t('символів залишилось')}
						</small>
					</div>
					<div className={`${styles.profileAddPostField}`}>
						<label className={`${styles.profileAddPostLabel}`}>
							{t('Введіть опис публікації українською мовою:')}
							<textarea
								name='descriptionUa'
								value={formData.descriptionUa}
								onChange={handleChange}
								className={`${styles.profileAddPostTextarea}`}
								placeholder='Введіть детальний опис публікації'
							/>
						</label>
					</div>
					<button type='submit' className={`${styles.profileAddPostButton}`}>
						{t('Зберегти')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default UserProfileAddPost
