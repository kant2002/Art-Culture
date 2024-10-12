// import React, { useEffect, useRef, useState } from 'react'
// import style from '../../../../styles/components/Sliders/MuseumPageSliders/MasonryGallery.module.scss'

// const MasonryGallery = () => {
// 	// Hardcoded list of image URLs
// 	const allImages = [
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
// 		// Add more image URLs as needed
// 	]

// 	// State to manage images currently displayed
// 	const [images, setImages] = useState(allImages.slice(0, 10))
// 	const [loadedImages, setLoadedImages] = useState([])
// 	const containerRef = useRef(null)

// 	useEffect(() => {
// 		const imagePromises = images.map(
// 			src =>
// 				new Promise(resolve => {
// 					const img = new Image()
// 					img.src = src
// 					img.onload = () =>
// 						resolve({ src, width: img.width, height: img.height })
// 				})
// 		)

// 		Promise.all(imagePromises).then(imgs => {
// 			setLoadedImages(imgs)
// 		})
// 	}, [images])

// 	useEffect(() => {
// 		window.addEventListener('resize', layoutImages)
// 		return () => window.removeEventListener('resize', layoutImages)
// 	}, [loadedImages])

// 	const layoutImages = () => {
// 		const containerWidth = containerRef.current.clientWidth
// 		const rowHeight = 250 // Desired row height
// 		const gap = 10

// 		let row = []
// 		let currentRowWidth = 0
// 		const rows = []

// 		loadedImages.forEach(img => {
// 			const scaledWidth = (img.width / img.height) * rowHeight
// 			img.scaledWidth = scaledWidth
// 			img.scaledHeight = rowHeight

// 			if (currentRowWidth + scaledWidth + gap * row.length > containerWidth) {
// 				// Adjust row images
// 				const scale =
// 					(containerWidth - gap * (row.length - 1)) / currentRowWidth
// 				row.forEach(rowImg => {
// 					rowImg.scaledWidth *= scale
// 					rowImg.scaledHeight *= scale
// 				})
// 				rows.push(row)
// 				row = []
// 				currentRowWidth = 0
// 			}

// 			row.push(img)
// 			currentRowWidth += scaledWidth
// 		})

// 		// Handle last row
// 		if (row.length > 0) {
// 			rows.push(row)
// 		}

// 		// Render images
// 		const gallery = containerRef.current
// 		gallery.innerHTML = '' // Clear previous images

// 		rows.forEach(row => {
// 			const rowDiv = document.createElement('div')
// 			rowDiv.className = style.row
// 			row.forEach(img => {
// 				const imgDiv = document.createElement('div')
// 				imgDiv.className = style.item
// 				imgDiv.style.width = `${img.scaledWidth}px`
// 				imgDiv.style.height = `${img.scaledHeight}px`
// 				imgDiv.style.marginRight = `${gap}px`

// 				const image = document.createElement('img')
// 				image.src = img.src
// 				image.style.width = '100%'
// 				image.style.height = '100%'
// 				image.style.objectFit = 'cover'

// 				imgDiv.appendChild(image)
// 				rowDiv.appendChild(imgDiv)
// 			})
// 			gallery.appendChild(rowDiv)
// 		})
// 	}

// 	useEffect(() => {
// 		if (loadedImages.length > 0) {
// 			layoutImages()
// 		}
// 	}, [loadedImages])

// 	const loadMoreImages = () => {
// 		setImages(prevImages => {
// 			const nextImages = allImages.slice(
// 				prevImages.length,
// 				prevImages.length + 5
// 			)
// 			return [...prevImages, ...nextImages]
// 		})
// 	}

// 	return (
// 		<div>
// 			<div className={style.masonryGallery} ref={containerRef}></div>
// 			{/* Load more button for testing purposes */}
// 			<button onClick={loadMoreImages}>Load More Images</button>
// 		</div>
// 	)
// }

// export default MasonryGallery

import React, { useEffect, useRef, useState } from 'react'
import style from '../../../../styles/components/Sliders/MuseumPageSliders/MasonryGallery.module.scss'

const MasonryGallery = () => {
	// Hardcoded list of image URLs
	const allImages = [
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
		// Add more image URLs as needed
	]

	// State to manage images currently displayed
	const [images, setImages] = useState(allImages.slice(0, 10))
	const [loadedImages, setLoadedImages] = useState([])
	const containerRef = useRef(null)

	// Load images and get their dimensions
	useEffect(() => {
		const imagePromises = images.map(
			src =>
				new Promise(resolve => {
					const img = new Image()
					img.src = src
					img.onload = () =>
						resolve({ src, width: img.width, height: img.height })
				})
		)

		Promise.all(imagePromises).then(imgs => {
			setLoadedImages(imgs)
		})
	}, [images])

	// Layout images whenever loadedImages changes or window resizes
	useEffect(() => {
		const handleResize = () => {
			layoutImages()
		}

		window.addEventListener('resize', handleResize)
		layoutImages() // Initial layout

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [loadedImages])

	// Function to layout images into justified rows
	const layoutImages = () => {
		const containerWidth = containerRef.current.clientWidth
		const rowHeight = 250 // Desired row height
		const gap = 10

		let row = []
		let currentRowWidth = 0
		const rows = []

		loadedImages.forEach(img => {
			const aspectRatio = img.width / img.height
			const scaledWidth = aspectRatio * rowHeight

			if (currentRowWidth + scaledWidth + gap * row.length > containerWidth) {
				// Adjust row images
				const scale =
					(containerWidth - gap * (row.length - 1)) / currentRowWidth
				row.forEach(rowImg => {
					rowImg.scaledWidth *= scale
					rowImg.scaledHeight *= scale
				})
				rows.push(row)
				row = []
				currentRowWidth = 0
			}

			img.scaledWidth = scaledWidth
			img.scaledHeight = rowHeight
			row.push(img)
			currentRowWidth += scaledWidth
		})

		// Handle last row (can choose to adjust or leave as is)
		if (row.length > 0) {
			// Optionally stretch the last row to fill the container
			const scale = (containerWidth - gap * (row.length - 1)) / currentRowWidth
			row.forEach(rowImg => {
				rowImg.scaledWidth *= scale
				rowImg.scaledHeight *= scale
			})
			rows.push(row)
		}

		// Render images
		const gallery = containerRef.current
		gallery.innerHTML = '' // Clear previous images

		rows.forEach(row => {
			const rowDiv = document.createElement('div')
			rowDiv.className = style.row

			row.forEach((img, index) => {
				const imgDiv = document.createElement('div')
				imgDiv.className = style.item
				imgDiv.style.width = `${img.scaledWidth}px`
				imgDiv.style.height = `${img.scaledHeight}px`
				if (index < row.length - 1) {
					imgDiv.style.marginRight = `${gap}px`
				}

				const image = document.createElement('img')
				image.src = img.src
				image.style.width = '100%'
				image.style.height = '100%'
				image.style.objectFit = 'cover'

				imgDiv.appendChild(image)
				rowDiv.appendChild(imgDiv)
			})

			gallery.appendChild(rowDiv)
		})
	}

	// Infinite Scroll: Load more images when user scrolls to bottom
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 100
			) {
				loadMoreImages()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [images])

	const loadMoreImages = () => {
		setImages(prevImages => {
			const nextImages = allImages.slice(
				prevImages.length,
				prevImages.length + 5
			)
			if (nextImages.length === 0) return prevImages
			return [...prevImages, ...nextImages]
		})
	}

	return (
		<div className={style.galleryContainer}>
			<div className={style.justifiedGallery} ref={containerRef}></div>
		</div>
	)
}

export default MasonryGallery
