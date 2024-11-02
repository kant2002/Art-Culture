// src/components/ProductList/ProductList.jsx

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/Context/AuthContext'
import styles from '/src/styles/screen/ProductList/Paintings.module.scss'
import API from '/src/utils/api.js'

const Paintings = () => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const [products, setProducts] = useState([])
	const [serverMessage, setServerMessage] = useState('')
	const navigate = useNavigate()
	const { logout, user } = useAuth()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProductImages, setSelectedProductImages] = useState([])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await API.get('/products/my-products', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setProducts(response.data.products)
			} catch (error) {
				console.error('Error fetching products:', error)
				setServerMessage('Failed to load products.')
			}
		}

		fetchProducts()
	}, [])

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
			<div className={styles.productList}>
				<h2>{t('Картини')}</h2>
				{serverMessage && (
					<p className={styles.serverMessage}>{serverMessage}</p>
				)}
				<div className={styles.products}>
					{products.map(product => {
						const title =
							currentLanguage === 'en'
								? product.title_en || product.title_uk
								: product.title_uk || product.title_en

						const description =
							currentLanguage === 'en'
								? product.description_en || product.description_uk
								: product.description_uk || product.description_en

						const specs =
							currentLanguage === 'en'
								? product.specs_en || product.specs_uk
								: product.specs_uk || product.specs_en
						return (
							<div key={product.id} className={styles.productCard}>
								{product.images.length > 0 && (
									<img
										src={`${process.env.REACT_APP_API_URL}${product.images[0].imageUrl}`}
										alt={title}
										className={styles.productImage}
										onClick={() => handleImageClick(product.images)}
									/>
								)}
								<h3>{title}</h3>
								<p>{description}</p>
								<p>{specs}</p>
								{/* Add more fields as needed */}
							</div>
						)
					})}
				</div>
			</div>
			{/* Modal Component */}
			{isModalOpen && (
				<div className={styles.modalOverlay} onClick={handleCloseModal}>
					<div
						className={styles.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<button className={styles.closeButton} onClick={handleCloseModal}>
							&times;
						</button>
						<div className={styles.modalImages}>
							{selectedProductImages.map((image, index) => (
								<img
									key={index}
									src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
									alt={`Product Image ${index + 1}`}
									className={styles.modalImage}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Paintings
