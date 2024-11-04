// import PropTypes from 'prop-types'
// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import style from '../../../../styles/components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.module.scss'

// const ArtistPageMasonryGallery = ({ products, baseUrl }) => {
// 	const { t, i18n } = useTranslation()
// 	const currentLanguage = i18n.language
// 	const containerRef = useRef(null)
// 	const sliderRef = useRef(null)
// 	const [isPaused, setIsPaused] = useState(false)
// 	const [sliderWidth, setSliderWidth] = useState(0)
// 	const [position, setPosition] = useState(0)
// 	const speed = 0.5 // Adjust this value to change the speed
// 	const [isModalOpen, setIsModalOpen] = useState(false)
// 	const [selectedProductImages, setSelectedProductImages] = useState([])
// 	const [selectedProduct, setSelectedProduct] = useState(null)

// 	// Zoom-related state variables
// 	const [zoomStates, setZoomStates] = useState([])

// 	// Carousel state
// 	const [currentSlide, setCurrentSlide] = useState(0)

// 	// Define the number of rows and custom scaling factor
// 	const numberOfRows = 3 // Change this to the desired number of rows
// 	const customScaleFactor = 1.0 // Change this to scale images up or down

// 	// Build the images array with product information
// 	const images = products.map(product => {
// 		const mainImageSrc =
// 			product.images && product.images.length > 0
// 				? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
// 				: '/Img/defaultProductImage.jpg' // Fallback image

// 		return {
// 			src: mainImageSrc,
// 			productId: product.id,
// 			productImages: product.images,
// 		}
// 	})

// 	// Prepare images with dimensions
// 	const [loadedImages, setLoadedImages] = useState([])

// 	useEffect(() => {
// 		const imagePromises = images.map(imageObj => {
// 			return new Promise(resolve => {
// 				const img = new Image()
// 				img.src = imageObj.src
// 				img.onload = () => {
// 					resolve({
// 						...imageObj,
// 						width: img.width,
// 						height: img.height,
// 					})
// 				}
// 				img.onerror = () => {
// 					resolve({
// 						...imageObj,
// 						width: 0,
// 						height: 0,
// 					})
// 				}
// 			})
// 		})

// 		Promise.all(imagePromises).then(imgs => {
// 			setLoadedImages(imgs)
// 		})
// 	}, [images])

// 	// Split images into rows
// 	const [rows, setRows] = useState([])

// 	useEffect(() => {
// 		if (loadedImages.length === 0) return

// 		const imagesPerRow = Math.ceil(loadedImages.length / numberOfRows)
// 		const newRows = []

// 		for (let i = 0; i < numberOfRows; i++) {
// 			const startIdx = i * imagesPerRow
// 			const endIdx = startIdx + imagesPerRow
// 			const rowImages = loadedImages.slice(startIdx, endIdx)
// 			newRows.push(rowImages)
// 		}

// 		setRows(newRows)
// 	}, [loadedImages, numberOfRows])

// 	// Calculate slider width and scale images
// 	useEffect(() => {
// 		if (rows.length === 0) return

// 		const containerWidth = window.innerWidth // Full window width
// 		const rowHeight = 250 // Desired image height
// 		const gap = 10

// 		let maxTotalWidth = 0
// 		const scaledRows = rows.map(row => {
// 			let totalWidth = 0
// 			const scaledImages = row.map((img, index) => {
// 				const aspectRatio = img.width / img.height || 1
// 				const scaledHeight = rowHeight * customScaleFactor
// 				const scaledWidth = aspectRatio * scaledHeight

// 				totalWidth += scaledWidth + (index > 0 ? gap : 0)
// 				return {
// 					...img,
// 					scaledWidth,
// 					scaledHeight,
// 				}
// 			})

// 			// Ensure totalWidth is sufficient for seamless looping
// 			if (totalWidth < containerWidth) {
// 				const scaleFactor = containerWidth / totalWidth
// 				scaledImages.forEach(img => {
// 					img.scaledWidth *= scaleFactor
// 					img.scaledHeight *= scaleFactor
// 				})
// 				totalWidth = containerWidth
// 			}

// 			if (totalWidth > maxTotalWidth) {
// 				maxTotalWidth = totalWidth
// 			}

// 			return scaledImages
// 		})

// 		setSliderWidth(maxTotalWidth)
// 		setRows(scaledRows)
// 	}, [rows, customScaleFactor])

// 	// Automatically move images to the left
// 	useEffect(() => {
// 		let animationFrameId

// 		const animate = () => {
// 			if (!isPaused) {
// 				setPosition(prev => {
// 					let newPosition = prev - speed

// 					if (-newPosition >= sliderWidth) {
// 						// Loop back seamlessly
// 						return 0
// 					}
// 					return newPosition
// 				})
// 			}
// 			animationFrameId = requestAnimationFrame(animate)
// 		}

// 		animationFrameId = requestAnimationFrame(animate)

// 		return () => {
// 			cancelAnimationFrame(animationFrameId)
// 		}
// 	}, [isPaused, sliderWidth, speed])

// 	// Compute if any image is zoomed
// 	const isAnyImageZoomed = zoomStates.some(state => state.isZoomed)

// 	// Prevent body scrolling when any image is zoomed
// 	useEffect(() => {
// 		if (isAnyImageZoomed) {
// 			document.body.style.overflow = 'hidden'
// 		} else {
// 			document.body.style.overflow = 'auto'
// 		}
// 	}, [isAnyImageZoomed])

// 	// Handle mouse events to pause and resume animation
// 	const handleMouseEnter = () => {
// 		setIsPaused(true)
// 	}

// 	const handleMouseLeave = () => {
// 		setIsPaused(false)
// 	}

// 	const handleImageClick = (productImages, product) => {
// 		if (productImages && productImages.length > 0) {
// 			setSelectedProductImages(productImages)
// 			setSelectedProduct(product)
// 			setZoomStates(
// 				productImages.map(() => ({
// 					zoomLevel: 1,
// 					isZoomed: false,
// 					cursorPos: { x: 0, y: 0 },
// 					showLens: false,
// 				}))
// 			)
// 			setCurrentSlide(0) // Reset carousel to first slide
// 		} else {
// 			// If no sub-images, you can choose to display a message or fallback
// 			setSelectedProductImages([])
// 			setSelectedProduct(null)
// 			setZoomStates([])
// 		}
// 		setIsModalOpen(true)
// 	}

// 	const handleCloseModal = () => {
// 		setIsModalOpen(false)
// 		setSelectedProductImages([])
// 		setSelectedProduct
// 		setZoomStates([])
// 		setCurrentSlide(0) // Reset carousel
// 	}

// 	// Handle zoom in
// 	const handleZoomIn = index => {
// 		setZoomStates(prevZoomStates => {
// 			const newZoomStates = [...prevZoomStates]
// 			const currentZoom = newZoomStates[index].zoomLevel
// 			if (currentZoom < 5) {
// 				newZoomStates[index].zoomLevel = parseFloat(
// 					(currentZoom + 0.5).toFixed(1)
// 				)
// 				newZoomStates[index].isZoomed = true
// 			}
// 			return newZoomStates
// 		})
// 	}

// 	// Handle zoom out
// 	const handleZoomOut = index => {
// 		setZoomStates(prevZoomStates => {
// 			const newZoomStates = [...prevZoomStates]
// 			const currentZoom = newZoomStates[index].zoomLevel
// 			if (currentZoom > 1) {
// 				newZoomStates[index].zoomLevel = parseFloat(
// 					(currentZoom - 0.5).toFixed(1)
// 				)
// 				if (newZoomStates[index].zoomLevel === 1) {
// 					newZoomStates[index].isZoomed = false
// 				}
// 			}
// 			return newZoomStates
// 		})
// 	}

// 	// Handle mouse move events to update cursor position for zoom
// 	const handleMouseMoveImage = useCallback(
// 		(e, index) => {
// 			const rect = e.currentTarget.getBoundingClientRect()
// 			const x = e.clientX - rect.left
// 			const y = e.clientY - rect.top

// 			// Update cursor position
// 			setZoomStates(prevZoomStates => {
// 				const newZoomStates = [...prevZoomStates]
// 				newZoomStates[index] = {
// 					...newZoomStates[index],
// 					cursorPos: { x, y },
// 				}
// 				return newZoomStates
// 			})
// 		},
// 		[setZoomStates]
// 	)

// 	// Handle mouse enter to show zoom lens
// 	const handleMouseEnterImage = useCallback(
// 		index => {
// 			setZoomStates(prevZoomStates => {
// 				const newZoomStates = [...prevZoomStates]
// 				newZoomStates[index] = {
// 					...prevZoomStates[index],
// 					showLens: true,
// 				}
// 				return newZoomStates
// 			})
// 		},
// 		[setZoomStates]
// 	)

// 	// Handle mouse leave to hide zoom lens
// 	const handleMouseLeaveImage = useCallback(
// 		index => {
// 			setZoomStates(prevZoomStates => {
// 				const newZoomStates = [...prevZoomStates]
// 				newZoomStates[index] = {
// 					...prevZoomStates[index],
// 					showLens: false,
// 					cursorPos: { x: 0, y: 0 },
// 				}
// 				return newZoomStates
// 			})
// 		},
// 		[setZoomStates]
// 	)

// 	// Handle click to toggle zoom
// 	const handleImageClickToggleZoom = useCallback(
// 		index => {
// 			setZoomStates(prevZoomStates => {
// 				const newZoomStates = [...prevZoomStates]
// 				const zoomState = newZoomStates[index]
// 				const isZoomed = !zoomState.isZoomed
// 				const zoomLevel = isZoomed ? 2 : 1

// 				newZoomStates[index] = {
// 					...zoomState,
// 					isZoomed,
// 					zoomLevel,
// 				}
// 				return newZoomStates
// 			})
// 		},
// 		[setZoomStates]
// 	)

// 	// Auto-slide functionality for carousel
// 	// useEffect(() => {
// 	// 	if (isModalOpen) {
// 	// 		const slideInterval = setInterval(() => {
// 	// 			setCurrentSlide(prev => (prev + 1) % selectedProductImages.length)
// 	// 		}, 3000) // Slide every 3 seconds

// 	// 		return () => clearInterval(slideInterval)
// 	// 	}
// 	// }, [isModalOpen, selectedProductImages.length])

// 	// Handle manual navigation
// 	const handlePrevSlide = () => {
// 		setCurrentSlide(
// 			prev =>
// 				(prev - 1 + selectedProductImages.length) % selectedProductImages.length
// 		)
// 	}

// 	const handleNextSlide = () => {
// 		setCurrentSlide(prev => (prev + 1) % selectedProductImages.length)
// 	}

// 	return (
// 		<div className={style.galleryContainer} style={{ overflow: 'hidden' }}>
// 			<div className={style.galleryTitleWrapper}>
// 				<h3 className={style.galleryTitle}>{t('Роботи цього митця')}</h3>
// 			</div>
// 			<div
// 				className={style.justifiedGallery}
// 				ref={containerRef}
// 				style={{
// 					overflow: 'hidden',
// 					width: '100vw', // Full window width
// 				}}
// 				onMouseEnter={handleMouseEnter}
// 				onMouseLeave={handleMouseLeave}
// 			>
// 				<div
// 					ref={sliderRef}
// 					style={{
// 						display: 'flex',
// 						flexDirection: 'column',
// 						transform: `translateX(${position}px)`,
// 						width: `${sliderWidth * 2}px`, // Set width to accommodate seamless looping
// 					}}
// 				>
// 					{/* Render each row */}
// 					{rows.map((row, rowIndex) => (
// 						<div key={rowIndex} style={{ display: 'flex' }}>
// 							{/* Display images twice for seamless looping */}
// 							{row.concat(row).map((img, index) => (
// 								<div
// 									key={`${img.src}-${index}-${rowIndex}`}
// 									className={style.item}
// 									style={{
// 										marginRight: '20px',
// 										marginBottom: '20px',
// 										width: `${img.scaledWidth}px`,
// 										height: `${img.scaledHeight}px`,
// 										flex: '0 0 auto',
// 										cursor: 'pointer',
// 									}}
// 									onClick={() =>
// 										handleImageClick(
// 											img.productImages,
// 											products.find(p => p.id === img.productId)
// 										)
// 									}
// 								>
// 									<img
// 										src={img.src}
// 										alt=''
// 										loading='lazy'
// 										style={{
// 											width: '100%',
// 											height: '100%',
// 											objectFit: 'cover',
// 										}}
// 										onError={e => {
// 											e.target.onerror = null
// 											e.target.src = '/Img/newsCardERROR.jpg'
// 										}}
// 									/>
// 								</div>
// 							))}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 			<div className={style.moreArtsButtonWrapper}>
// 				<button className={style.moreArtsButton}>
// 					<p className={style.moreArtsButtonText}>{t('Всі роботи Митця')}</p>
// 					<img
// 						className={`${style.buttonArrow}`}
// 						src={'/Img/buttonArrow.svg'}
// 						alt={t('Фото митця')}
// 						loading='lazy'
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/Img/newsCardERROR.jpg'
// 						}}
// 					/>
// 				</button>
// 			</div>
// 			{isModalOpen && selectedProduct && (
// 				<div
// 					className={style.modalOverlay}
// 					onClick={handleCloseModal}
// 					style={{
// 						overflow: isAnyImageZoomed ? 'hidden' : 'auto',
// 					}}
// 					role='dialog'
// 					aria-modal='true'
// 					aria-labelledby='productInfoContainer '
// 				>
// 					<div
// 						className={style.modalContent}
// 						onClick={e => e.stopPropagation()}
// 						aria-labelledby='productInfoContainer '
// 					>
// 						<div
// 							id='productInfoContainer '
// 							className={style.productInfoContainer}
// 						>
// 							<div className={style.productHeaderWrapper}>
// 								<h2 className={style.productModalTitle}>
// 									{t(' Назва Картини:')}
// 									<p>
// 										{selectedProduct.title_en ||
// 											selectedProduct.title_uk ||
// 											selectedProduct.title}
// 									</p>
// 								</h2>
// 								<p className={style.productModalAuthorName}>
// 									{t('Імя автора:')}
// 								</p>
// 							</div>

// 							<div className={style.productModalMainInfoAbout}>
// 								<h3 className={style.productModelAboutTitle}>
// 									{t('Докладніше')}
// 								</h3>
// 								<h4 className={style.productModelDescr}>
// 									{t('Про Картину:')}
// 									<p>
// 										{selectedProduct.description_en ||
// 											selectedProduct.description_uk ||
// 											selectedProduct.description}
// 									</p>
// 								</h4>
// 								<h4 className={style.productModelSpecs}>
// 									{t('Використані матеріали:')}
// 									<p>
// 										{selectedProduct.specs_en ||
// 											selectedProduct.specs_uk ||
// 											selectedProduct.specs}
// 									</p>
// 								</h4>
// 							</div>
// 						</div>
// 						<button
// 							className={style.closeButton}
// 							onClick={handleCloseModal}
// 							aria-label={t('Закрити модальне вікно')}
// 						>
// 							&times;
// 						</button>
// 						{/* Carousel Navigation Buttons */}
// 						{selectedProductImages.length > 1 && (
// 							<div className={style.carouselNav}>
// 								<button
// 									className={style.carouselButton}
// 									onClick={handlePrevSlide}
// 									aria-label={t('Попереднє зображення')}
// 								>
// 									&#10094; {/* Left Arrow */}
// 								</button>
// 								<button
// 									className={style.carouselButton}
// 									onClick={handleNextSlide}
// 									aria-label={t('Наступне зображення')}
// 								>
// 									&#10095; {/* Right Arrow */}
// 								</button>
// 							</div>
// 						)}
// 						<div className={style.modalImages}>
// 							{selectedProductImages && selectedProductImages.length > 0 ? (
// 								selectedProductImages.map((image, index) => {
// 									// Only render the current slide
// 									if (index !== currentSlide) return null

// 									const zoomState = zoomStates[index] || {
// 										zoomLevel: 1,
// 										isZoomed: false,
// 										cursorPos: { x: 0, y: 0 },
// 										showLens: false,
// 									}

// 									return (
// 										<div
// 											key={index}
// 											className={style.modalImageWrapper}
// 											onMouseEnter={() => handleMouseEnterImage(index)}
// 											onMouseLeave={() => handleMouseLeaveImage(index)}
// 											onMouseMove={e => handleMouseMoveImage(e, index)}
// 											onClick={() => handleImageClickToggleZoom(index)}
// 											style={{
// 												position: 'relative',
// 												overflow: 'hidden',
// 												cursor: zoomState.isZoomed ? 'zoom-out' : 'zoom-in',
// 												width:
// 													'calc(700px - (166 * ((1440px - 100vw) / (1440 - 375))))', // Ensure the wrapper takes full width
// 												height: 'auto',
// 												margin: '0 auto', // Center the image
// 											}}
// 										>
// 											<div
// 												className={style.zoomContainer}
// 												style={{
// 													transform: `scale(${zoomState.zoomLevel})`,
// 													transformOrigin: `${zoomState.cursorPos.x}px ${zoomState.cursorPos.y}px`,
// 													transition: 'transform 0.3s ease-in-out',
// 													display: 'inline-block',
// 												}}
// 											>
// 												<img
// 													src={`${baseUrl}${image.imageUrl.replace('../../', '/')}`}
// 													alt={`Product Image ${index + 1}`}
// 													loading='lazy'
// 													className={style.modalImage}
// 													style={{
// 														width: '100%',
// 														height: 'auto',
// 													}}
// 													onError={e => {
// 														e.target.onerror = null
// 														e.target.src = '/Img/defaultProductImage.jpg'
// 														console.error(
// 															'Error loading modal image:',
// 															e.target.src
// 														)
// 													}}
// 												/>
// 											</div>
// 											{zoomState.showLens && !zoomState.isZoomed && (
// 												<div
// 													className={style.zoomLens}
// 													style={{
// 														position: 'absolute',
// 														top: zoomState.cursorPos.y - 50,
// 														left: zoomState.cursorPos.x - 50,
// 														width: '100px',
// 														height: '100px',
// 														border: '2px solid #fff',
// 														borderRadius: '50%',
// 														pointerEvents: 'none',
// 														backgroundColor: 'rgba(255, 255, 255, 0.2)',
// 													}}
// 												></div>
// 											)}
// 											{/* Zoom Controls */}
// 											{zoomState.isZoomed && (
// 												<div className={style.zoomControls}>
// 													<button
// 														className={style.zoomButton}
// 														onClick={e => {
// 															e.stopPropagation()
// 															handleZoomOut(index)
// 														}}
// 														aria-label={t('Zoom Out')}
// 													>
// 														-
// 													</button>
// 													<div className={style.zoomIndicator}>
// 														<span>{`Zoom: ${zoomState.zoomLevel}x`}</span>
// 														<div className={style.zoomBar}>
// 															<div
// 																className={style.zoomProgress}
// 																style={{
// 																	width: `${((zoomState.zoomLevel - 1) / 4) * 100}%`,
// 																}}
// 															></div>
// 														</div>
// 													</div>

// 													<button
// 														className={style.zoomButton}
// 														onClick={e => {
// 															e.stopPropagation()
// 															handleZoomIn(index)
// 														}}
// 														aria-label={t('Zoom In')}
// 													>
// 														+
// 													</button>
// 												</div>
// 											)}
// 										</div>
// 									)
// 								})
// 							) : (
// 								<p>{t('Немає додаткових зображень для цього продукту.')}</p>
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// ArtistPageMasonryGallery.propTypes = {
// 	products: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.number.isRequired,
// 			images: PropTypes.arrayOf(
// 				PropTypes.shape({
// 					id: PropTypes.number.isRequired,
// 					imageUrl: PropTypes.string.isRequired,
// 				})
// 			),
// 			title: PropTypes.string.isRequired, // Ensure title fields are present
// 			title_en: PropTypes.string,
// 			title_uk: PropTypes.string,
// 			description: PropTypes.string.isRequired,
// 			description_en: PropTypes.string,
// 			description_uk: PropTypes.string,
// 			specs: PropTypes.string.isRequired,
// 			specs_en: PropTypes.string,
// 			specs_uk: PropTypes.string,
// 			author: PropTypes.string, // Assuming you have an author field
// 		})
// 	).isRequired,
// 	baseUrl: PropTypes.string.isRequired,
// }

// export default ArtistPageMasonryGallery

import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../../../styles/components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.module.scss'

const ArtistPageMasonryGallery = ({ products, baseUrl, creator }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const containerRef = useRef(null)
	const sliderRef = useRef(null)
	const [isPaused, setIsPaused] = useState(false)
	const [sliderWidth, setSliderWidth] = useState(0)
	const [position, setPosition] = useState(0)
	const speed = 0.5 // Adjust this value to change the speed
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProductImages, setSelectedProductImages] = useState([])
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [selectedCreator, setSelectedCreator] = useState(null) // Initialize with null

	// Zoom-related state variables
	const [zoomStates, setZoomStates] = useState([])

	// Carousel state
	const [currentSlide, setCurrentSlide] = useState(0)

	// Define the number of rows and custom scaling factor
	const numberOfRows = 3 // Change this to the desired number of rows
	const customScaleFactor = 1.0 // Change this to scale images up or down

	// Build the images array with product information
	const images = products.map(product => {
		const mainImageSrc =
			product.images && product.images.length > 0
				? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
				: '/Img/defaultProductImage.jpg' // Fallback image

		return {
			src: mainImageSrc,
			productId: product.id,
			productImages: product.images,
		}
	})

	// Prepare images with dimensions
	const [loadedImages, setLoadedImages] = useState([])

	useEffect(() => {
		const imagePromises = images.map(imageObj => {
			return new Promise(resolve => {
				const img = new Image()
				img.src = imageObj.src
				img.onload = () => {
					resolve({
						...imageObj,
						width: img.width,
						height: img.height,
					})
				}
				img.onerror = () => {
					resolve({
						...imageObj,
						width: 0,
						height: 0,
					})
				}
			})
		})

		Promise.all(imagePromises).then(imgs => {
			setLoadedImages(imgs)
		})
	}, [images])

	// Split images into rows
	const [rows, setRows] = useState([])

	useEffect(() => {
		if (loadedImages.length === 0) return

		const imagesPerRow = Math.ceil(loadedImages.length / numberOfRows)
		const newRows = []

		for (let i = 0; i < numberOfRows; i++) {
			const startIdx = i * imagesPerRow
			const endIdx = startIdx + imagesPerRow
			const rowImages = loadedImages.slice(startIdx, endIdx)
			newRows.push(rowImages)
		}

		setRows(newRows)
	}, [loadedImages, numberOfRows])

	// Calculate slider width and scale images
	useEffect(() => {
		if (rows.length === 0) return

		const containerWidth = window.innerWidth // Full window width
		const rowHeight = 250 // Desired image height
		const gap = 10

		let maxTotalWidth = 0
		const scaledRows = rows.map(row => {
			let totalWidth = 0
			const scaledImages = row.map((img, index) => {
				const aspectRatio = img.width / img.height || 1
				const scaledHeight = rowHeight * customScaleFactor
				const scaledWidth = aspectRatio * scaledHeight

				totalWidth += scaledWidth + (index > 0 ? gap : 0)
				return {
					...img,
					scaledWidth,
					scaledHeight,
				}
			})

			// Ensure totalWidth is sufficient for seamless looping
			if (totalWidth < containerWidth) {
				const scaleFactor = containerWidth / totalWidth
				scaledImages.forEach(img => {
					img.scaledWidth *= scaleFactor
					img.scaledHeight *= scaleFactor
				})
				totalWidth = containerWidth
			}

			if (totalWidth > maxTotalWidth) {
				maxTotalWidth = totalWidth
			}

			return scaledImages
		})

		setSliderWidth(maxTotalWidth)
		setRows(scaledRows)
	}, [rows, customScaleFactor])

	// Automatically move images to the left
	useEffect(() => {
		let animationFrameId

		const animate = () => {
			if (!isPaused) {
				setPosition(prev => {
					let newPosition = prev - speed

					if (-newPosition >= sliderWidth) {
						// Loop back seamlessly
						return 0
					}
					return newPosition
				})
			}
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [isPaused, sliderWidth, speed])

	// Compute if any image is zoomed
	const isAnyImageZoomed = zoomStates.some(state => state.isZoomed)

	// Prevent body scrolling when any image is zoomed
	useEffect(() => {
		if (isAnyImageZoomed) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isAnyImageZoomed])

	// Handle mouse events to pause and resume animation
	const handleMouseEnter = () => {
		setIsPaused(true)
	}

	const handleMouseLeave = () => {
		setIsPaused(false)
	}

	// Updated handleImageClick to accept product
	const handleImageClick = (productImages, product) => {
		if (productImages && productImages.length > 0) {
			setSelectedProductImages(productImages)
			setSelectedProduct(product) // Set the selected product
			setSelectedCreator(creator) // Set the selected creator
			console.log('Selected Creator:', creator) // Debugging line
			setZoomStates(
				productImages.map(() => ({
					zoomLevel: 1,
					isZoomed: false,
					cursorPos: { x: 0, y: 0 },
					showLens: false,
				}))
			)
			setCurrentSlide(0) // Reset carousel to first slide
		} else {
			// If no sub-images, display fallback
			setSelectedProductImages([])
			setSelectedProduct(null)
			setSelectedCreator(null)
			setZoomStates([])
		}
		setIsModalOpen(true)
	}

	// Corrected handleCloseModal
	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProductImages([])
		setSelectedProduct(null) // Reset to null
		setSelectedCreator(null) // Reset to null
		setZoomStates([])
		setCurrentSlide(0) // Reset carousel
	}

	// Handle zoom in
	const handleZoomIn = index => {
		setZoomStates(prevZoomStates => {
			const newZoomStates = [...prevZoomStates]
			const currentZoom = newZoomStates[index].zoomLevel
			if (currentZoom < 5) {
				newZoomStates[index].zoomLevel = parseFloat(
					(currentZoom + 0.5).toFixed(1)
				)
				newZoomStates[index].isZoomed = true
			}
			return newZoomStates
		})
	}

	// Handle zoom out
	const handleZoomOut = index => {
		setZoomStates(prevZoomStates => {
			const newZoomStates = [...prevZoomStates]
			const currentZoom = newZoomStates[index].zoomLevel
			if (currentZoom > 1) {
				newZoomStates[index].zoomLevel = parseFloat(
					(currentZoom - 0.5).toFixed(1)
				)
				if (newZoomStates[index].zoomLevel === 1) {
					newZoomStates[index].isZoomed = false
				}
			}
			return newZoomStates
		})
	}

	// Handle mouse move events to update cursor position for zoom
	const handleMouseMoveImage = useCallback(
		(e, index) => {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// Update cursor position
			setZoomStates(prevZoomStates => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...newZoomStates[index],
					cursorPos: { x, y },
				}
				return newZoomStates
			})
		},
		[setZoomStates]
	)

	// Handle mouse enter to show zoom lens
	const handleMouseEnterImage = useCallback(
		index => {
			setZoomStates(prevZoomStates => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...newZoomStates[index],
					showLens: true,
				}
				return newZoomStates
			})
		},
		[setZoomStates]
	)

	// Handle mouse leave to hide zoom lens
	const handleMouseLeaveImage = useCallback(
		index => {
			setZoomStates(prevZoomStates => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...newZoomStates[index],
					showLens: false,
					cursorPos: { x: 0, y: 0 },
				}
				return newZoomStates
			})
		},
		[setZoomStates]
	)

	// Handle click to toggle zoom
	const handleImageClickToggleZoom = useCallback(
		index => {
			setZoomStates(prevZoomStates => {
				const newZoomStates = [...prevZoomStates]
				const zoomState = newZoomStates[index]
				const isZoomed = !zoomState.isZoomed
				const zoomLevel = isZoomed ? 2 : 1

				newZoomStates[index] = {
					...zoomState,
					isZoomed,
					zoomLevel,
				}
				return newZoomStates
			})
		},
		[setZoomStates]
	)

	// Auto-slide functionality for carousel
	// useEffect(() => {
	// 	if (isModalOpen && selectedProductImages.length > 1) {
	// 		const slideInterval = setInterval(() => {
	// 			setCurrentSlide(prev => (prev + 1) % selectedProductImages.length)
	// 		}, 3000) // Slide every 3 seconds

	// 		return () => clearInterval(slideInterval)
	// 	}
	// }, [isModalOpen, selectedProductImages.length])

	// Handle manual navigation
	const handlePrevSlide = () => {
		setCurrentSlide(
			prev =>
				(prev - 1 + selectedProductImages.length) % selectedProductImages.length
		)
	}

	const handleNextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % selectedProductImages.length)
	}

	return (
		<div className={style.galleryContainer} style={{ overflow: 'hidden' }}>
			<div className={style.galleryTitleWrapper}>
				<h3 className={style.galleryTitle}>{t('Роботи цього митця')}</h3>
			</div>
			<div
				className={style.justifiedGallery}
				ref={containerRef}
				style={{
					overflow: 'hidden',
					width: '100vw', // Full window width
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div
					ref={sliderRef}
					style={{
						display: 'flex',
						flexDirection: 'column',
						transform: `translateX(${position}px)`,
						width: `${sliderWidth * 2}px`, // Set width to accommodate seamless looping
					}}
				>
					{/* Render each row */}
					{rows.map((row, rowIndex) => (
						<div key={rowIndex} style={{ display: 'flex' }}>
							{/* Display images twice for seamless looping */}
							{row.concat(row).map((img, index) => (
								<div
									key={`${img.src}-${index}-${rowIndex}`}
									className={style.item}
									style={{
										marginRight: '20px',
										marginBottom: '20px',
										width: `${img.scaledWidth}px`,
										height: `${img.scaledHeight}px`,
										flex: '0 0 auto',
										cursor: 'pointer',
									}}
									onClick={() =>
										handleImageClick(
											img.productImages,
											products.find(p => p.id === img.productId)
										)
									}
								>
									<img
										src={img.src}
										alt=''
										loading='lazy'
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
										}}
										onError={e => {
											e.target.onerror = null
											e.target.src = '/Img/newsCardERROR.jpg'
										}}
									/>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
			<div className={style.moreArtsButtonWrapper}>
				<button className={style.moreArtsButton}>
					<p className={style.moreArtsButtonText}>{t('Всі роботи Митця')}</p>
					<img
						className={`${style.buttonArrow}`}
						src={'/Img/buttonArrow.svg'}
						alt={t('Фото митця')}
						loading='lazy'
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</button>
			</div>
			{isModalOpen && selectedProduct && selectedCreator && (
				<div
					className={style.modalOverlay}
					onClick={handleCloseModal}
					style={{
						overflow: isAnyImageZoomed ? 'hidden' : 'auto',
					}}
					role='dialog'
					aria-modal='true'
					aria-labelledby='productInfoContainer'
				>
					<div
						className={style.modalContent}
						onClick={e => e.stopPropagation()}
						aria-labelledby='productInfoContainer'
					>
						{/* Product Information */}
						<div
							id='productInfoContainer'
							className={style.productInfoContainer}
							tabIndex='-1' // Make it focusable
						>
							<div className={style.productHeaderWrapper}>
								<h2 className={style.productModalTitle}>
									{t('Назва Картини:')}
									<p>
										{selectedProduct.title_en ||
											selectedProduct.title_uk ||
											selectedProduct.title ||
											'—'}
									</p>
								</h2>
								<h3 className={style.productModalAuthorName}>
									{t('Імя автора:')}
									<p>
										{selectedCreator.title_en ||
											selectedCreator.title_uk ||
											selectedCreator.title ||
											'—'}
									</p>
								</h3>
							</div>

							<div className={style.productModalMainInfoAbout}>
								<h3 className={style.productModelAboutTitle}>
									{t('Докладніше')}
								</h3>
								<h4 className={style.productModelDescr}>
									{t('Про Картину:')}
									<p>
										{selectedProduct.description_en ||
											selectedProduct.description_uk ||
											selectedProduct.description ||
											'—'}
									</p>
								</h4>
								<h4 className={style.productModelSpecs}>
									{t('Використані матеріали:')}
									<p>
										{selectedProduct.specs_en ||
											selectedProduct.specs_uk ||
											selectedProduct.specs ||
											'—'}
									</p>
								</h4>
							</div>
						</div>

						{/* Close Button */}
						<button
							className={style.closeButton}
							onClick={handleCloseModal}
							aria-label={t('Закрити модальне вікно')}
						>
							&times;
						</button>

						{/* Carousel Navigation Buttons */}
						{selectedProductImages.length > 1 && (
							<div className={style.carouselNav}>
								<button
									className={style.carouselButton}
									onClick={handlePrevSlide}
									aria-label={t('Попереднє зображення')}
								>
									&#10094; {/* Left Arrow */}
								</button>
								<button
									className={style.carouselButton}
									onClick={handleNextSlide}
									aria-label={t('Наступне зображення')}
								>
									&#10095; {/* Right Arrow */}
								</button>
							</div>
						)}

						{/* Carousel Images */}
						<div className={style.modalImages}>
							{selectedProductImages && selectedProductImages.length > 0 ? (
								selectedProductImages.map((image, index) => {
									// Only render the current slide
									if (index !== currentSlide) return null

									const zoomState = zoomStates[index] || {
										zoomLevel: 1,
										isZoomed: false,
										cursorPos: { x: 0, y: 0 },
										showLens: false,
									}

									return (
										<div
											key={index}
											className={style.modalImageWrapper}
											onMouseEnter={() => handleMouseEnterImage(index)}
											onMouseLeave={() => handleMouseLeaveImage(index)}
											onMouseMove={e => handleMouseMoveImage(e, index)}
											onClick={() => handleImageClickToggleZoom(index)}
											style={{
												position: 'relative',
												overflow: 'hidden',
												cursor: zoomState.isZoomed ? 'zoom-out' : 'zoom-in',
												width:
													'calc(700px - (166 * ((1440px - 100vw) / (1440 - 375))))', // Adjust as needed
												height: 'auto',
												margin: '0 auto', // Center the image
											}}
										>
											<div
												className={style.zoomContainer}
												style={{
													transform: `scale(${zoomState.zoomLevel})`,
													transformOrigin: `${zoomState.cursorPos.x}px ${zoomState.cursorPos.y}px`,
													transition: 'transform 0.3s ease-in-out',
													display: 'inline-block',
												}}
											>
												<img
													src={`${baseUrl}${image.imageUrl.replace('../../', '/')}`}
													alt={`Product Image ${index + 1}`}
													loading='lazy'
													className={style.modalImage}
													style={{
														width: '100%',
														height: 'auto',
													}}
													onError={e => {
														e.target.onerror = null
														e.target.src = '/Img/defaultProductImage.jpg'
														console.error(
															'Error loading modal image:',
															e.target.src
														)
													}}
												/>
											</div>
											{zoomState.showLens && !zoomState.isZoomed && (
												<div
													className={style.zoomLens}
													style={{
														position: 'absolute',
														top: zoomState.cursorPos.y - 50,
														left: zoomState.cursorPos.x - 50,
														width: '100px',
														height: '100px',
														border: '2px solid #fff',
														borderRadius: '50%',
														pointerEvents: 'none',
														backgroundColor: 'rgba(255, 255, 255, 0.2)',
													}}
												></div>
											)}
											{/* Zoom Controls */}
											{zoomState.isZoomed && (
												<div className={style.zoomControls}>
													<button
														className={style.zoomButton}
														onClick={e => {
															e.stopPropagation()
															handleZoomOut(index)
														}}
														aria-label={t('Zoom Out')}
													>
														-
													</button>
													<div className={style.zoomIndicator}>
														<span>{`Zoom: ${zoomState.zoomLevel}x`}</span>
														<div className={style.zoomBar}>
															<div
																className={style.zoomProgress}
																style={{
																	width: `${((zoomState.zoomLevel - 1) / 4) * 100}%`,
																}}
															></div>
														</div>
													</div>

													<button
														className={style.zoomButton}
														onClick={e => {
															e.stopPropagation()
															handleZoomIn(index)
														}}
														aria-label={t('Zoom In')}
													>
														+
													</button>
												</div>
											)}
										</div>
									)
								})
							) : (
								<p>{t('Немає додаткових зображень для цього продукту.')}</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

ArtistPageMasonryGallery.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired,
					imageUrl: PropTypes.string.isRequired,
				})
			),
			title: PropTypes.string.isRequired,
			title_en: PropTypes.string,
			title_uk: PropTypes.string,
			description: PropTypes.string.isRequired,
			description_en: PropTypes.string,
			description_uk: PropTypes.string,
			specs: PropTypes.string.isRequired,
			specs_en: PropTypes.string,
			specs_uk: PropTypes.string,
			author: PropTypes.shape({
				title: PropTypes.string,
				title_en: PropTypes.string,
				title_uk: PropTypes.string,
				// ... other fields
			}),
		})
	).isRequired,
	baseUrl: PropTypes.string.isRequired,
	creator: PropTypes.shape({
		title: PropTypes.string,
		title_en: PropTypes.string,
		title_uk: PropTypes.string,
		// ... other fields
	}), // Ensure creator has the necessary fields
}

export default ArtistPageMasonryGallery
