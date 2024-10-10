// src/components/ProductList/ProductList.jsx

import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/Context/AuthContext'
import styles from '/src/styles/screen/ProductList/Paintings.module.scss'
import API from '/src/utils/api.js'

const Paintings = () => {
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

	const handleProductCartCreateClick = () => {
		navigate('/ProductCardCreate')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	const handleImageClick = images => {
		setSelectedProductImages(images)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProductImages([])
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
					{products.map(product => (
						<div key={product.id} className={styles.productCard}>
							{product.images.length > 0 && (
								<img
									src={`${process.env.REACT_APP_API_URL}${product.images[0].imageUrl}`}
									alt={product.title}
									className={styles.productImage}
									onClick={() => handleImageClick(product.images)}
								/>
							)}
							<h3>{product.title}</h3>
							<p>{product.description}</p>
							{/* Add more fields as needed */}
						</div>
					))}
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
