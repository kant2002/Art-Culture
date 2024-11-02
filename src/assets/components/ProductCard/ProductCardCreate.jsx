import { t } from 'i18next'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/ProductCard/ProductCardCreate.module.scss'

const ProductCardCreate = () => {
	const { user, logout } = useAuth()
	console.log('CurrentUser:', user)
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		title_en: '',
		title_uk: '',
		description_en: '',
		description_uk: '',
		specs_en: '',
		specs_uk: '',
		images: [],
	})

	const [imagePreviews, setImagePreviews] = useState([])
	const [serverMessage, setServerMessage] = useState('')

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images') {
			const filesArray = Array.from(files)
			setFormData(prevData => ({ ...prevData, images: filesArray }))
			const previews = filesArray.map(file => URL.createObjectURL(file))
			setImagePreviews(previews)
		} else {
			setFormData(prevData => ({ ...prevData, [name]: value }))
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		const formDataToSend = new FormData()
		formDataToSend.append('title_en', formData.title_en)
		formDataToSend.append('title_uk', formData.title_uk)
		formDataToSend.append('description_en', formData.description_en)
		formDataToSend.append('description_uk', formData.description_uk)
		formDataToSend.append('specs_en', formData.specs_en)
		formDataToSend.append('specs_uk', formData.specs_uk)

		formData.images.forEach(image => {
			formDataToSend.append('productImages', image)
		})

		try {
			const response = await API.post('/products', formDataToSend, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})

			if (response.status === 201) {
				setServerMessage('Product created successfully')
				console.log('Navigating to /paintings')
				navigate('/paintings')
			}
		} catch (error) {
			console.error('product create error', error)
			if (error.response && error.response.data) {
				setServerMessage(
					error.response.data.error || 'Product could not be created'
				)
			} else {
				setServerMessage('Product could not be created during action')
			}
		}
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

			<div className={styles.productCreate}>
				<h2>{t('Додати картину')}</h2>
				{serverMessage && (
					<p className={styles.serverMessage}>{serverMessage}</p>
				)}
				<form onSubmit={handleSubmit}>
					{/* Title in Ukrainian */}
					<input
						type='text'
						placeholder={t('Заголовок українською')}
						name='title_uk'
						value={formData.title_uk}
						onChange={handleChange}
						required
					/>
					{/* Title in English */}
					<input
						type='text'
						placeholder={t('Title in English')}
						name='title_en'
						value={formData.title_en}
						onChange={handleChange}
						required
					/>
					{/* Description in Ukrainian */}
					<textarea
						placeholder={t('Опис українською')}
						name='description_uk'
						value={formData.description_uk}
						onChange={handleChange}
						required
					/>
					{/* Description in English */}
					<textarea
						placeholder={t('Description in English')}
						name='description_en'
						value={formData.description_en}
						onChange={handleChange}
						required
					/>
					{/* Specs on Ukrainian */}
					<textarea
						placeholder={t('Специфікація')}
						name='specs_uk'
						value={formData.specs_uk}
						onChange={handleChange}
					/>
					{/* Specs on English */}
					<textarea
						placeholder={t('Specifications')}
						name='specs_en'
						value={formData.specs_en}
						onChange={handleChange}
					/>
					{/* Images */}
					<input
						type='file'
						name='images'
						accept='image/*'
						multiple
						onChange={handleChange}
						required
					/>
					{/* Image Previews */}
					<div className={styles.imagePreviews}>
						{imagePreviews.map((preview, index) => (
							<img
								key={index}
								src={preview}
								alt={`Preview ${index}`}
								className={styles.previewImage}
							/>
						))}
					</div>
					<button type='submit'>{t('Створити')}</button>
				</form>
			</div>
		</div>
	)
}

export default ProductCardCreate
