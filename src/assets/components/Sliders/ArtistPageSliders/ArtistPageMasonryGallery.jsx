// import React, { useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import style from '../../../../styles/components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.module.scss'

// const ArtistPageMasonryGallery = () => {
// 	const { t } = useTranslation()
// 	const containerRef = useRef(null)
// 	const [isPaused, setIsPaused] = useState(false)
// 	const [sliderWidth, setSliderWidth] = useState(0)
// 	const [position, setPosition] = useState(0)
// 	const sliderRef = useRef(null)
// 	const speed = 0.5 // Adjust this value to change the speed

// 	console.log('Component rendered. Initial position:', position)

// 	// Hardcoded list of image URLs
// 	const images = [
// 		'/Img/gallery/1.webp',
// 		'/Img/gallery/2.webp',
// 		'/Img/gallery/3.webp',
// 		'/Img/gallery/4.webp',
// 		'/Img/gallery/5.webp',
// 		'/Img/gallery/6.webp',
// 		'/Img/gallery/7.webp',
// 		'/Img/gallery/8.webp',
// 		'/Img/gallery/9.webp',
// 		'/Img/gallery/10.webp',
// 		'/Img/gallery/11.webp',
// 		'/Img/gallery/12.webp',
// 		'/Img/gallery/13.webp',
// 		'/Img/gallery/14.webp',
// 		'/Img/gallery/15.webp',
// 		// Add more images if needed
// 	]

// 	console.log('Images array:', images)

// 	// Prepare images with dimensions
// 	const [loadedImages, setLoadedImages] = useState([])

// 	useEffect(() => {
// 		console.log('Starting to load images...')
// 		const imagePromises = images.map(
// 			(src, index) =>
// 				new Promise(resolve => {
// 					const img = new Image()
// 					img.src = src
// 					img.onload = () => {
// 						console.log(
// 							`Image ${index} loaded: ${src}, width: ${img.width}, height: ${img.height}`
// 						)
// 						resolve({ src, width: img.width, height: img.height })
// 					}
// 					img.onerror = () => {
// 						console.error(`Failed to load image ${index}: ${src}`)
// 						resolve({ src, width: 0, height: 0 })
// 					}
// 				})
// 		)

// 		Promise.all(imagePromises).then(imgs => {
// 			console.log('All images loaded:', imgs)
// 			setLoadedImages(imgs)
// 		})
// 	}, [images])

// 	// Layout images into a single row to make a full-width slider
// 	useEffect(() => {
// 		if (loadedImages.length === 0) return

// 		const containerWidth = window.innerWidth // Full window width
// 		const rowHeight = 250 // Desired image height
// 		const gap = 10

// 		let totalWidth = 0
// 		const scaledImages = loadedImages.map((img, index) => {
// 			const aspectRatio = img.width / img.height || 1
// 			const scaledHeight = rowHeight
// 			const scaledWidth = aspectRatio * scaledHeight

// 			totalWidth += scaledWidth + (index > 0 ? gap : 0)
// 			return {
// 				...img,
// 				scaledWidth,
// 				scaledHeight,
// 			}
// 		})

// 		console.log('Initial totalWidth:', totalWidth)

// 		// Ensure totalWidth is sufficient for seamless looping
// 		if (totalWidth < containerWidth) {
// 			const scaleFactor = containerWidth / totalWidth
// 			scaledImages.forEach(img => {
// 				img.scaledWidth *= scaleFactor
// 				img.scaledHeight *= scaleFactor
// 			})
// 			totalWidth = containerWidth
// 			console.log('Adjusted totalWidth to containerWidth:', totalWidth)
// 		}

// 		setSliderWidth(totalWidth)
// 		setLoadedImages(scaledImages)
// 		console.log('Slider total width:', totalWidth)
// 	}, [loadedImages])

// 	// Automatically move images to the left
// 	useEffect(() => {
// 		let animationFrameId

// 		const animate = () => {
// 			if (!isPaused) {
// 				setPosition(prev => {
// 					let newPosition = prev - speed

// 					if (-newPosition >= sliderWidth) {
// 						// Loop back seamlessly
// 						console.log('Looping back to start')
// 						return 0
// 					}
// 					return newPosition
// 				})
// 			} else {
// 				console.log('Animation paused')
// 			}
// 			animationFrameId = requestAnimationFrame(animate)
// 		}

// 		animationFrameId = requestAnimationFrame(animate)

// 		return () => {
// 			cancelAnimationFrame(animationFrameId)
// 			console.log('Animation stopped')
// 		}
// 	}, [isPaused, sliderWidth, speed])

// 	// Handle mouse events to pause and resume animation
// 	const handleMouseEnter = () => {
// 		console.log('Mouse entered slider')
// 		setIsPaused(true)
// 	}

// 	const handleMouseLeave = () => {
// 		console.log('Mouse left slider')
// 		setIsPaused(false)
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
// 						transform: `translateX(${position}px)`,
// 						width: `${sliderWidth * 2}px`, // Set width to accommodate seamless looping
// 					}}
// 				>
// 					{/* Display images twice for seamless looping */}
// 					{loadedImages.concat(loadedImages).map((img, index) => (
// 						<div
// 							key={`${img.src}-${index}`}
// 							className={style.item}
// 							style={{
// 								marginRight: '10px',
// 								width: `${img.scaledWidth}px`,
// 								height: `${img.scaledHeight}px`,
// 								flex: '0 0 auto',
// 							}}
// 						>
// 							<img
// 								src={img.src}
// 								alt=''
// 								style={{
// 									width: '100%',
// 									height: '100%',
// 									objectFit: 'cover',
// 								}}
// 								onError={e => {
// 									e.target.onerror = null
// 									e.target.src = '/Img/newsCardERROR.jpg'
// 									console.error(`Error loading image: ${img.src}`)
// 								}}
// 							/>
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
// 							console.error('Error loading button arrow image')
// 						}}
// 					/>
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// export default ArtistPageMasonryGallery

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../../../styles/components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.module.scss'

const ArtistPageMasonryGallery = () => {
	const { t } = useTranslation()
	const containerRef = useRef(null)
	const [isPaused, setIsPaused] = useState(false)
	const [sliderWidth, setSliderWidth] = useState(0)
	const [position, setPosition] = useState(0)
	const sliderRef = useRef(null)
	const speed = 0.5 // Adjust this value to change the speed

	console.log('Component rendered. Initial position:', position)

	// Define the number of rows and custom scaling factor
	const numberOfRows = 3 // Change this to the desired number of rows
	const customScaleFactor = 1.0 // Change this to scale images up or down

	// Hardcoded list of image URLs
	const images = [
		'/Img/gallery/1.webp',
		'/Img/gallery/2.webp',
		'/Img/gallery/3.webp',
		'/Img/gallery/4.webp',
		'/Img/gallery/5.webp',
		'/Img/gallery/6.webp',
		'/Img/gallery/7.webp',
		'/Img/gallery/8.webp',
		'/Img/gallery/9.webp',
		'/Img/gallery/10.webp',
		'/Img/gallery/11.webp',
		'/Img/gallery/12.webp',
		'/Img/gallery/13.webp',
		'/Img/gallery/14.webp',
		'/Img/gallery/15.webp',
		// Add more images if needed
	]

	console.log('Images array:', images)

	// Prepare images with dimensions
	const [loadedImages, setLoadedImages] = useState([])

	useEffect(() => {
		console.log('Starting to load images...')
		const imagePromises = images.map(
			(src, index) =>
				new Promise(resolve => {
					const img = new Image()
					img.src = src
					img.onload = () => {
						console.log(
							`Image ${index} loaded: ${src}, width: ${img.width}, height: ${img.height}`
						)
						resolve({ src, width: img.width, height: img.height })
					}
					img.onerror = () => {
						console.error(`Failed to load image ${index}: ${src}`)
						resolve({ src, width: 0, height: 0 })
					}
				})
		)

		Promise.all(imagePromises).then(imgs => {
			console.log('All images loaded:', imgs)
			setLoadedImages(imgs)
		})
	}, [images])

	// Split images into rows
	useEffect(() => {
		if (loadedImages.length === 0) return

		console.log('Splitting images into rows...')
		const imagesPerRow = Math.ceil(loadedImages.length / numberOfRows)
		const newRows = []

		for (let i = 0; i < numberOfRows; i++) {
			const startIdx = i * imagesPerRow
			const endIdx = startIdx + imagesPerRow
			const rowImages = loadedImages.slice(startIdx, endIdx)
			newRows.push(rowImages)
		}

		setRows(newRows)
		console.log('Rows set:', newRows)
	}, [loadedImages, numberOfRows])

	// Calculate slider width and scale images
	const [rows, setRows] = useState([])

	useEffect(() => {
		if (rows.length === 0) return

		const containerWidth = window.innerWidth // Full window width
		const rowHeight = 250 // Desired image height
		const gap = 10

		let maxTotalWidth = 0
		const scaledRows = rows.map((row, rowIndex) => {
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

			console.log(`Row ${rowIndex} initial totalWidth:`, totalWidth)

			// Ensure totalWidth is sufficient for seamless looping
			if (totalWidth < containerWidth) {
				const scaleFactor = containerWidth / totalWidth
				scaledImages.forEach(img => {
					img.scaledWidth *= scaleFactor
					img.scaledHeight *= scaleFactor
				})
				totalWidth = containerWidth
				console.log(
					`Row ${rowIndex} adjusted totalWidth to containerWidth:`,
					totalWidth
				)
			}

			if (totalWidth > maxTotalWidth) {
				maxTotalWidth = totalWidth
			}

			return scaledImages
		})

		setSliderWidth(maxTotalWidth)
		setRows(scaledRows)
		console.log('Slider total width (max of rows):', maxTotalWidth)
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
						console.log('Looping back to start')
						return 0
					}
					return newPosition
				})
			} else {
				console.log('Animation paused')
			}
			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)
			console.log('Animation stopped')
		}
	}, [isPaused, sliderWidth, speed])

	// Handle mouse events to pause and resume animation
	const handleMouseEnter = () => {
		console.log('Mouse entered slider')
		setIsPaused(true)
	}

	const handleMouseLeave = () => {
		console.log('Mouse left slider')
		setIsPaused(false)
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
									}}
								>
									<img
										src={img.src}
										alt=''
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
										}}
										onError={e => {
											e.target.onerror = null
											e.target.src = '/Img/newsCardERROR.jpg'
											console.error(`Error loading image: ${img.src}`)
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
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
							console.error('Error loading button arrow image')
						}}
					/>
				</button>
			</div>
		</div>
	)
}

export default ArtistPageMasonryGallery
