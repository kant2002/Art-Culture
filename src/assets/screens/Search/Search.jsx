import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/screen/Search/Search.module.scss'
import API from '../../../utils/api'

function SearchResult({ className, searchInput, styleInput }) {
	const { t } = useTranslation()
	const [searchQuery, setSearchQuery] = useState('')
	const [results, setResults] = useState({
		authors: [],
		products: [],
		posts: [],
	})
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [isFetching, setIsFetching] = useState(false)
	const navigate = useNavigate()
	const resultsRef = useRef(null)

	const defaultAuthor = '/Img/ArtistPhoto.jpg'
	const defaultProduct = '/Img/newsCardERROR.jpg'

	const getImageUrl = (path) => {
		if (!path || typeof path !== 'string') return ''
		return path.startsWith('/') ? path : `/${path}`
	}

	// Function to fetch a specific page of results.
	const fetchPage = async (pageNumber) => {
		setIsFetching(true)
		try {
			const response = await API.get(
				`/search/all-search?q=${searchQuery}&page=${pageNumber}&limit=30`,
			)
			const { searchAllAuthors, searchAllProduct, searchAllPosts } =
				response.data
			// Append new data to existing results
			setResults((prev) => ({
				authors: [...prev.authors, ...(searchAllAuthors || [])],
				products: [...prev.products, ...(searchAllProduct || [])],
				posts: [...prev.posts, ...(searchAllPosts || [])],
			}))
			setPage(pageNumber)
			// If every category returns less than 30, assume no more results.
			if (
				(searchAllAuthors?.length || 0) < 30 &&
				(searchAllProduct?.length || 0) < 30 &&
				(searchAllPosts?.length || 0) < 30
			) {
				setHasMore(false)
			}
		} catch (error) {
			console.error('Error fetching page', error)
		} finally {
			setIsFetching(false)
		}
	}

	// Reset when the search query changes.
	const handleSearchChange = async (e) => {
		const query = e.target.value
		setSearchQuery(query)
		if (query.length > 2) {
			// Reset pagination when query changes
			setPage(1)
			setHasMore(true)
			try {
				const response = await API.get(
					`/search/all-search?q=${query}&page=1&limit=30`,
				)
				const { searchAllAuthors, searchAllProduct, searchAllPosts } =
					response.data
				console.log(searchAllAuthors, searchAllProduct, searchAllPosts)
				setResults({
					authors: searchAllAuthors || [],
					products: searchAllProduct || [],
					posts: searchAllPosts || [],
				})
				// Check if we received fewer than 30 in each category.
				if (
					(searchAllAuthors?.length || 0) < 30 &&
					(searchAllProduct?.length || 0) < 30 &&
					(searchAllPosts?.length || 0) < 30
				) {
					setHasMore(false)
				}
			} catch (error) {
				console.error('Error fetching search result', error)
			}
		} else {
			setResults({ authors: [], products: [], posts: [] })
			setPage(1)
			setHasMore(true)
		}
	}

	// Infinite scroll handler: fetch next page if near bottom.
	useEffect(() => {
		const resultsDiv = resultsRef.current
		if (!resultsDiv) return

		const handleScroll = () => {
			if (
				resultsDiv.scrollHeight -
					resultsDiv.scrollTop -
					resultsDiv.clientHeight <
					100 &&
				hasMore &&
				!isFetching
			) {
				fetchPage(page + 1)
			}
		}

		resultsDiv.addEventListener('scroll', handleScroll)
		return () => resultsDiv.removeEventListener('scroll', handleScroll)
	}, [page, hasMore, isFetching])

	// Navigation handlers (unchanged)
	const handleRoleClick = (author) => {
		switch (author.role) {
			case 'MUSEUM':
				navigate(`/museum-page/${author.id}`)
				break
			case 'EXHIBITION':
				navigate(`/all-author-posts/${author.id}`)
				break
			case 'CREATOR':
				navigate(`/artist/${author.id}`)
				break
			case 'AUTHOR':
				navigate(`/all-author-posts/${author.id}`)
				break
			default:
				navigate(`/artist/${author.id}`)
				break
		}
	}

	const handlePostPageClick = (post) => {
		navigate(`/posts/${post.id}`)
	}

	return (
		<div className={`${styles.searchWrapper} ${className || ''}`}>
			<input
				type="text"
				className={`${styles.searchInputWrapper} ${searchInput || ''}`}
				style={styleInput}
				value={searchQuery}
				onChange={handleSearchChange}
				placeholder={t('Пошук') || 'Пошук...'}
			/>
			{searchQuery.length > 2 && (
				<div ref={resultsRef} className={styles.resultsWrapper}>
					{/* Display Authors */}
					{results.authors.length > 0 && (
						<div className={styles.itemContainer}>
							<>
								<h2>{t('Автори')}</h2>
							</>
							<div className={styles.itemWrapper}>
								{results.authors.map((author) => (
									<div
										className={styles.itemInfo}
										key={author.id}
										onClick={() => handleRoleClick(author)}
									>
										<>
											<img
												src={getImageUrl(
													author.images ||
														defaultAuthor,
												)}
												alt={
													author.title || author.email
												}
											/>
										</>
										<div className={styles.itemInfoTitle}>
											<p>
												{author.title || author.email}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Display Products */}
					{results.products.length > 0 && (
						<div className={styles.itemContainer}>
							<>
								<h2>{t('Вироби')}</h2>
							</>
							<div className={styles.itemWrapper}>
								{results.products.map((product) => (
									<div
										className={styles.itemInfo}
										key={product.id}
									>
										<>
											<img
												src={
													product.images?.[0]
														?.imageUrl
														? getImageUrl(
																product
																	.images[0]
																	.imageUrl,
															)
														: defaultProduct
												}
												alt={
													product.title_en ||
													product.title_uk ||
													'Product'
												}
											/>
										</>
										<div className={styles.itemInfoTitle}>
											<p>
												{product.title_uk ||
													product.title_en}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Display Posts */}
					{results.posts && results.posts.length > 0 && (
						<div className={styles.itemContainer}>
							<>
								<h2>{t('Новини')}</h2>
							</>
							<div className={styles.itemWrapper}>
								{results.posts.map((post) => (
									<div
										key={post.id}
										className={styles.itemInfo}
										onClick={() =>
											handlePostPageClick(post)
										}
									>
										<img
											src={post.images || defaultProduct}
											alt={
												post.title_en ||
												post.title_uk ||
												'Post'
											}
										/>
										<div className={styles.itemInfoTitle}>
											<p>
												{post.title_uk || post.title_en}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* If no results found */}
					{results.authors.length === 0 &&
						results.products.length === 0 &&
						results.posts.length === 0 && (
							<div>
								{t('Не знайдено результатів') ||
									'No results found'}
							</div>
						)}
				</div>
			)}
		</div>
	)
}

SearchResult.propTypes = {
	className: PropTypes.string,
	searchInput: PropTypes.string,
	styleInput: PropTypes.object,
}
export default SearchResult
