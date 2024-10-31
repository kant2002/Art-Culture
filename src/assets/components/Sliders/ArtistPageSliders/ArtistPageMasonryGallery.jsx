// import PropTypes from 'prop-types'
// import React, { useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import style from '../../../../styles/components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.module.scss'

// const ArtistPageMasonryGallery = ({ products, baseUrl }) => {
// 	const { t } = useTranslation()
// 	const containerRef = useRef(null)
// 	const [isPaused, setIsPaused] = useState(false)
// 	const [sliderWidth, setSliderWidth] = useState(0)
// 	const [position, setPosition] = useState(0)
// 	const sliderRef = useRef(null)
// 	const speed = 0.5 // Adjust this value to change the speed
// 	const [isModalOpen, setIsModalOpen] = useState(false)
// 	const [selectedProductImages, setSelectedProductImages] = useState([])

// 	// Zoom-related state variables
// 	const [zoomStates, setZoomStates] = useState([])

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

// 	// Handle mouse events to pause and resume animation
// 	const handleMouseEnter = () => {
// 		setIsPaused(true)
// 	}

// 	const handleMouseLeave = () => {
// 		setIsPaused(false)
// 	}

// 	const handleImageClick = productImages => {
// 		if (productImages && productImages.length > 0) {
// 			setSelectedProductImages(productImages)
// 			setZoomStates(
// 				productImages.map(() => ({
// 					zoomLevel: 1,
// 					isZoomed: false,
// 					cursorPos: { x: 0, y: 0 },
// 					showLens: false,
// 				}))
// 			)
// 		} else {
// 			// If no sub-images, you can choose to display a message or fallback
// 			setSelectedProductImages([])
// 			setZoomStates([])
// 		}
// 		setIsModalOpen(true)
// 	}

// 	const handleCloseModal = () => {
// 		setIsModalOpen(false)
// 		setSelectedProductImages([])
// 		setZoomStates([])
// 	}

// 	const handleWheelImage = (e, index) => {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		if (e.nativeEvent) {
// 			e.nativeEvent.preventDefault()
// 		}
// 		const zoomState = zoomStates[index]
// 		if (zoomState.isZoomed) {
// 			let newZoomLevel = zoomState.zoomLevel - e.deltaY * 0.01
// 			if (newZoomLevel < 1) newZoomLevel = 1
// 			if (newZoomLevel > 5) newZoomLevel = 5 // Maximum zoom level

// 			console.log(`Zoom level changed for image ${index}:`, newZoomLevel)

// 			setZoomStates(prevZoomStates => {
// 				const newZoomStates = [...prevZoomStates]
// 				newZoomStates[index] = {
// 					...prevZoomStates[index],
// 					zoomLevel: newZoomLevel,
// 				}
// 				return newZoomStates
// 			})
// 		}
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
// 									onClick={() => handleImageClick(img.productImages)}
// 								>
// 									<img
// 										src={img.src}
// 										alt=''
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
// 						onError={e => {
// 							e.target.onerror = null
// 							e.target.src = '/Img/newsCardERROR.jpg'
// 						}}
// 					/>
// 				</button>
// 			</div>
// 			{isModalOpen && (
// 				<div className={style.modalOverlay} onClick={handleCloseModal}>
// 					<div
// 						className={style.modalContent}
// 						onClick={e => e.stopPropagation()}
// 					>
// 						<button className={style.closeButton} onClick={handleCloseModal}>
// 							&times;
// 						</button>
// 						<div className={style.modalImages}>
// 							{selectedProductImages && selectedProductImages.length > 0 ? (
// 								selectedProductImages.map((image, index) => {
// 									const zoomState = zoomStates[index] || {
// 										zoomLevel: 1,
// 										isZoomed: false,
// 										cursorPos: { x: 0, y: 0 },
// 										showLens: false,
// 									}

// 									// Handlers for zoom functionality per image
// 									const handleMouseEnterImage = () => {
// 										console.log(`Mouse entered image ${index}`)
// 										setZoomStates(prevZoomStates => {
// 											const newZoomStates = [...prevZoomStates]
// 											newZoomStates[index] = {
// 												...prevZoomStates[index],
// 												showLens: true,
// 											}
// 											return newZoomStates
// 										})
// 									}

// 									const handleMouseLeaveImage = () => {
// 										console.log(`Mouse left image ${index}`)
// 										setZoomStates(prevZoomStates => {
// 											const newZoomStates = [...prevZoomStates]
// 											newZoomStates[index] = {
// 												...prevZoomStates[index],
// 												showLens: false,
// 												cursorPos: { x: 0, y: 0 },
// 											}
// 											return newZoomStates
// 										})
// 									}

// 									const handleMouseMoveImage = e => {
// 										const rect = e.currentTarget.getBoundingClientRect()
// 										const x = e.clientX - rect.left
// 										const y = e.clientY - rect.top

// 										console.log(`Mouse moved over image ${index}:`, {
// 											x,
// 											y,
// 										})

// 										setZoomStates(prevZoomStates => {
// 											const newZoomStates = [...prevZoomStates]
// 											newZoomStates[index] = {
// 												...prevZoomStates[index],
// 												cursorPos: { x, y },
// 											}
// 											return newZoomStates
// 										})
// 									}

// 									const handleImageClick = () => {
// 										console.log(`Image ${index} clicked`)
// 										setZoomStates(prevZoomStates => {
// 											const zoomState = prevZoomStates[index]
// 											const isZoomed = !zoomState.isZoomed
// 											const zoomLevel = isZoomed ? 2 : 1

// 											const newZoomStates = [...prevZoomStates]
// 											newZoomStates[index] = {
// 												...zoomState,
// 												isZoomed,
// 												zoomLevel,
// 											}
// 											return newZoomStates
// 										})
// 									}

// 									return (
// 										<div
// 											key={index}
// 											className={style.modalImageWrapper}
// 											style={{
// 												position: 'relative',
// 												overflow: 'hidden',
// 												cursor: zoomState.isZoomed ? 'zoom-out' : 'zoom-in',
// 												width:
// 													'calc(700px - (166 * ((1440px - 100vw) / (1440 - 375))))',
// 												height: 'auto',
// 											}}
// 											onMouseEnter={handleMouseEnterImage}
// 											onMouseLeave={handleMouseLeaveImage}
// 											onMouseMove={handleMouseMoveImage}
// 											onClick={handleImageClick}
// 											onWheelCapture={e => handleWheelImage(e, index)}
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
// 		})
// 	).isRequired,
// 	baseUrl: PropTypes.string.isRequired,
// }

// export default ArtistPageMasonryGallery

import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../../../styles/components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.module.scss'

const ArtistPageMasonryGallery = ({ products, baseUrl }) => {
	const { t } = useTranslation()
	const containerRef = useRef(null)
	const sliderRef = useRef(null)
	const [isPaused, setIsPaused] = useState(false)
	const [sliderWidth, setSliderWidth] = useState(0)
	const [position, setPosition] = useState(0)
	const speed = 0.5 // Adjust this value to change the speed
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProductImages, setSelectedProductImages] = useState([])

	// Zoom-related state variables
	const [zoomStates, setZoomStates] = useState([])

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

	const handleImageClick = productImages => {
		if (productImages && productImages.length > 0) {
			setSelectedProductImages(productImages)
			setZoomStates(
				productImages.map(() => ({
					zoomLevel: 1,
					isZoomed: false,
					cursorPos: { x: 0, y: 0 },
					showLens: false,
				}))
			)
		} else {
			// If no sub-images, you can choose to display a message or fallback
			setSelectedProductImages([])
			setZoomStates([])
		}
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProductImages([])
		setZoomStates([])
	}

	// Handle zoom in
	const handleZoomIn = index => {
		setZoomStates(prevZoomStates => {
			const newZoomStates = [...prevZoomStates]
			const currentZoom = newZoomStates[index].zoomLevel
			if (currentZoom < 5) {
				newZoomStates[index].zoomLevel = currentZoom + 0.5
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
				newZoomStates[index].zoomLevel = currentZoom - 0.5
				if (newZoomStates[index].zoomLevel === 1) {
					newZoomStates[index].isZoomed = false
				}
			}
			return newZoomStates
		})
	}

	// Handle wheel events on the modal overlay to prevent scroll when zoomed

	// Throttle mouse move events to improve performance
	const handleMouseMoveImage = useCallback(
		(e, index) => {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// Update cursor position
			setZoomStates(prevZoomStates => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...prevZoomStates[index],
					cursorPos: { x, y },
				}
				return newZoomStates
			})
		},
		[setZoomStates]
	)

	const handleMouseEnterImage = useCallback(
		index => {
			setZoomStates(prevZoomStates => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...prevZoomStates[index],
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
					...prevZoomStates[index],
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
									onClick={() => handleImageClick(img.productImages)}
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
			{isModalOpen && (
				<div
					className={style.modalOverlay}
					onClick={handleCloseModal}
					style={{
						overflow: isAnyImageZoomed ? 'hidden' : 'auto',
					}}
				>
					<div
						className={style.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<button className={style.closeButton} onClick={handleCloseModal}>
							&times;
						</button>
						<div className={style.modalImages}>
							{selectedProductImages && selectedProductImages.length > 0 ? (
								selectedProductImages.map((image, index) => {
									const zoomState = zoomStates[index] || {
										zoomLevel: 1,
										isZoomed: false,
										cursorPos: { x: 0, y: 0 },
										showLens: false,
									}

									// Handlers for zoom functionality per image
									const handleMouseEnterImage = () => {
										setZoomStates(prevZoomStates => {
											const newZoomStates = [...prevZoomStates]
											newZoomStates[index] = {
												...prevZoomStates[index],
												showLens: true,
											}
											return newZoomStates
										})
									}

									const handleMouseLeaveImage = () => {
										setZoomStates(prevZoomStates => {
											const newZoomStates = [...prevZoomStates]
											newZoomStates[index] = {
												...prevZoomStates[index],
												showLens: false,
												cursorPos: { x: 0, y: 0 },
											}
											return newZoomStates
										})
									}

									return (
										<div
											key={index}
											className={style.modalImageWrapper}
											onMouseEnter={handleMouseEnterImage}
											onMouseLeave={handleMouseLeaveImage}
											onMouseMove={e => handleMouseMoveImage(e, index)}
											onClick={() => handleImageClickToggleZoom(index)}
											onWheelCapture={e => {
												// No wheel zoom, but still prevent scrolling if zoomed
												if (zoomState.isZoomed) {
													e.preventDefault()
													e.stopPropagation()
												}
											}}
											style={{
												position: 'relative',
												overflow: 'hidden',
												cursor: zoomState.isZoomed ? 'zoom-out' : 'zoom-in',
												width:
													' calc(700px - (166 * ((1440px - 100vw) / (1440 - 375))))', // Ensure the wrapper takes full width
												height: 'auto',
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
														width:
															' calc(700px - (166 * ((1440px - 100vw) / (1440 - 375))))',
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
															handleZoomIn(index)
														}}
														aria-label={t('Zoom In')}
													>
														+
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
															handleZoomOut(index)
														}}
														aria-label={t('Zoom Out')}
													>
														-
													</button>
													{/* Zoom Level Indicator */}
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
		})
	).isRequired,
	baseUrl: PropTypes.string.isRequired,
}

export default ArtistPageMasonryGallery
