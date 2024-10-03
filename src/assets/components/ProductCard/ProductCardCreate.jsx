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
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [specs, setSpecs] = useState('')
	const [images, setImages] = useState([])
	const [imagePreviews, setImagePreviews] = useState([])
	const [serverMessage, setServerMessage] = useState('')

	const handleImageChange = e => {
		const files = Array.from(e.target.files)
		setImages(files)

		const previews = files.map(file => URL.createObjectURL(file))
		setImagePreviews(previews)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('specs', specs)

		images.forEach(image => {
			formData.append('productImages', image)
		})

		try {
			const response = await API.post('/products', formData, {
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

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
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
					onClick={handlePaintingCardListClick}
				>
					{t('Переглянути вироби/картини ')}
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
					<input
						type='text'
						placeholder={t('Заголовок')}
						name='Title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
					<textarea
						placeholder={t('Опис')}
						name='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>
					<textarea
						placeholder={t('Специфікація')}
						name='Specifications' // 'Специфікація'
						value={specs}
						onChange={e => setSpecs(e.target.value)}
					/>
					<input
						type='file'
						name='productImages'
						accept='image/*'
						multiple
						onChange={handleImageChange}
						required
					/>
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
