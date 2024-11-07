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
	const [editingProduct, setEditingProduct] = useState(null)
	const [formData, setFormData] = useState({
		title_en: '',
		description_en: '',
		specs_en: '',
		title_uk: '',
		description_uk: '',
		specs_uk: '',
		images: null,
	})
	const [message, setMessage] = useState('')
	const [formErrors, setFormErrors] = useState([])
	const [remainingTitle, setRemainingTitle] = useState(50)
	const [remainingDescription, setRemainingDescription] = useState(500)

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

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleExhibitionCardCreateClick = () => {
		navigate('/ExhibitionCardCreate')
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

	const openEditModal = product => {
		setEditingProduct(product)
		setFormData({
			title_en: product.title_en || '',
			description_en: product.description_en || '',
			specs_en: product.specs_en || '',
			title_uk: product.title_uk || '',
			description_uk: product.description_uk || '',
			specs_uk: product.specs_uk || '',
			images: null,
		})
		setRemainingTitle(50 - product.title_en.length || product.title_uk.length)
		setRemainingDescription(
			500 - product.description_en.length || product.description_uk.length
		)
		setIsModalOpen(true)
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setEditingProduct(null)
		setFormErrors({})
		setMessage('')
	}

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images') {
			setFormData({ ...formData, images: files[0] })
		} else {
			setFormData({ ...formData, [name]: value })

			if (name === 'title') {
				setRemainingTitle(50 - value.length)
			}

			if (name === 'description') {
				setRemainingDescription(500 - value.length)
			}

			if (e.target.tagname.toLowerCase() === 'textarea') {
				e.target.style.height = 'auto'
				e.target.style.height = `${e.target.scrollHeight}px`
			}
		}
	}

	const handleEditSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setFormErrors({})

		if (
			!formData.title_en ||
			!formData.description_en ||
			!formData.title_uk ||
			!formData.description_uk ||
			!formData.specs_en ||
			!formData.specs_uk
		) {
			setFormErrors({ form: 'Потрібно заповнити поля' })
			return
		}

		try {
			const productData = new FormData()
			productData.append('title_en', formData.title_en)
			productData.append('description_en', formData.description_en)
			productData.append('title_uk', formData.title_uk)
			productData.append('description_uk', formData.description_uk)
			productData.append('specs_en', formData.specs_en)
			productData.append('specs_uk', formData.specs_uk)
			if (formData.images instanceof File) {
				productData.append('images', formData.images)
			}
			const response = await API.put(
				`/products/my-products/${editingProduct.id}`,
				productData,
				{
					headers: {
						'content-Type': 'multipart/form-data',
					},
				}
			)
			if (response.status === 200) {
				setMessage('Product update successfully')

				setProducts(prevProducts =>
					prevProducts.map(product =>
						product.id === editingProduct.id ? response.data : product
					)
				)
				closeEditModal()
			}
		} catch (error) {
			console.error('Error updating product', error)
			setMessage(
				error.response?.data?.error ||
					'Failed to update product. Please try again.'
			)
		}
	}

	const handleDeleteProduct = async productId => {
		if (window.confirm(t('Ви впевнені, що хочете видалити цей виріб?'))) {
			try {
				const response = await API.delete(`/products/my-products/${productId}`)
				if (response.status === 200) {
					setProducts(products.filter(product => product.id !== productId))
				}
			} catch (err) {
				console.error('Error deleting product', err)
				setError('Failed to delete product')
			}
		}
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
								<h3>
									{t('Назва картини')}
									<p>{title}</p>
								</h3>
								<h4>
									{t('Про картину')}
									<p>{description}</p>
								</h4>
								<h4>
									{t('Використані матеріали')}
									<p>{specs}</p>
								</h4>
								{/* Add more fields as needed */}
								<div className={styles.paintingsDelEditWrapper}>
									<button
										className={styles.paintingsEditButton}
										onClick={() => openEditModal(product)}
									>
										{t('Редагувати')}
									</button>
									<button
										className={styles.paintingsDeleteButton}
										onClick={() => handleDeleteProduct(product.id)}
									>
										{t('Видалити')}
									</button>
								</div>
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
