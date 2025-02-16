import PropTypes from 'prop-types'
import { useState } from 'react'
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
	const navigate = useNavigate()

	const defaultAuthor = '/Img/ArtistPhoto.jpg'
	const defaultProduct = '/Img/newsCardERROR.jpg'

	const getImageUrl = (path) => {
		if (!path || typeof path !== 'string') {
			return ''
		}
		return path.startsWith('/') ? path : `/${path}`
	}

	const handleSearchChange = async (e) => {
		const query = e.target.value
		setSearchQuery(query)

		if (query.length > 2) {
			try {
				const response = await API.get(`/search/all-search?q=${query}`)
				const { searchAllAuthors, searchAllProduct, searchAllPosts } =
					response.data
				console.log(searchAllAuthors, searchAllProduct, searchAllPosts)
				setResults({
					authors: searchAllAuthors || [],
					products: searchAllProduct || [],
					posts: searchAllPosts || [],
				})
			} catch (error) {
				console.error('Error fetching search result', error)
			}
		} else {
			setResults({ authors: [], products: [], posts: [] })
		}
	}
	// Single handler for all authors with different roles
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
			// If you have other roles, add more cases here
			default:
				// Fallback for authors or other user types
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
				<div className={styles.resultsWrapper}>
					{/* Display Authors */}
					{results.authors.length > 0 && (
						<div className={styles.itemContainer}>
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
					{results.posts && results.posts.length > 0 && (
						<div className={styles.itemContainer}>
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

SearchResult.PropTypes = {
	className: PropTypes.string,
	searchInput: PropTypes.string,
	styleInput: PropTypes.object,
}
export default SearchResult
