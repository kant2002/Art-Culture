import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../../../styles/components/Sliders/MuseumPageSliders/MuseumPageMasonryGallery.module.scss'

const MuseumPageMasonryGallery = () => {
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
		'/Img/gallery/1.webp',
		'/Img/gallery/2.webp',
		'/Img/gallery/3.webp',
		'/Img/gallery/4.webp',
		'/Img/gallery/5.webp',
		'/Img/gallery/6.webp',
		'/Img/gallery/7.webp',
		'/Img/gallery/8.webp',
		'/Img/gallery/9.webp',
		// Add more image URLs as needed
	]

	// State to manage images currently displayed
	const [images, setImages] = useState(allImages.slice(0, 12))
	const [loadedImages, setLoadedImages] = useState([])
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const containerRef = useRef(null)

	// Refs to hold the latest values of loading and hasMore
	const loadingRef = useRef(loading)
	const hasMoreRef = useRef(hasMore)

	// Update refs whenever the state changes
	useEffect(() => {
		loadingRef.current = loading
	}, [loading])

	useEffect(() => {
		hasMoreRef.current = hasMore
	}, [hasMore])

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
		if (!containerRef.current) return

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

		// Handle last row
		if (row.length > 0) {
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

		// Reset loading state after layout
		if (loading) {
			setLoading(false)
		}
	}

	// Infinite Scroll: Load more images when user scrolls to bottom of gallery
	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return

			if (loadingRef.current || !hasMoreRef.current) return

			const scrollPosition = window.scrollY + window.innerHeight
			const galleryBottomPosition =
				containerRef.current.offsetTop + containerRef.current.offsetHeight

			if (scrollPosition >= galleryBottomPosition - 1500) {
				loadMoreImages()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const loadMoreImages = () => {
		if (loadingRef.current || !hasMoreRef.current) return

		setLoading(true)
		setImages(prevImages => {
			const nextImages = allImages.slice(
				prevImages.length,
				prevImages.length + 5
			)
			if (nextImages.length === 0) {
				setHasMore(false)
				return prevImages
			}
			return [...prevImages, ...nextImages]
		})
	}

	const { t } = useTranslation();

	return (
		<div className={style.galleryContainer}>

			<div className={style.galleryTitleWrapper}>

				<h3 className={style.galleryTitle}>{t('Картини цього музею')}</h3>

			</div>

			<div className={style.justifiedGallery} ref={containerRef}></div>

			<div className={style.moreArtsButtonWrapper}>

				<button className={style.moreArtsButton} onClick={loadMoreImages}>

					<p className={style.moreArtsButtonText}>{t('Всі картини музею')}</p>

					<img
						className={`${style.buttonArrow}`}
						src={'/Img/buttonArrow.svg'}
						alt={t('Фото митця')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>

				</button>

			</div>

		</div>
	)
}

export default MuseumPageMasonryGallery
