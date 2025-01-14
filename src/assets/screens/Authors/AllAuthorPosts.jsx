import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../../styles/screen/Authors/AllArtistPostPage.module.scss'
import { getImageUrl } from '../../../utils/helper'

function AuthorPostsLists() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { id } = useParams()
	const [posts, setPosts] = useState([])
	const [author, setAuthor] = useState({})
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getAuthorPosts = async () => {
			try {
				setLoading(true)
				const response = await axios.get(`/api/users/authors/${id}`)
				setAuthor(response.data.author)
			} catch (error) {
				console.error('Error fetch author', error)
				setError(t('Не вдалося завантажити дані автора.'))
				setLoading(false)
				return
			}
			try {
				//* Fetch post by authorId
				setLoading(true)
				const postsResponse = await axios.get(`/api/posts/author/${id}`)
				console.log('PostFetched', postsResponse.data.posts)
				setPosts(postsResponse.data.posts)
			} catch (error) {
				if (error.response && error.response.status === 404) {
					console.log('No posts found for this author')
					setPosts([])
				} else {
					console.error('Error fetch posts', error)
					setError(t('Не вдалося завантажити новини.'))
					setPosts([])
				}
			}
			setLoading(false)
		}
		getAuthorPosts()
	}, [id, t])

	if (loading) {
		return <div className={styles.loading}>{t('Завантаження...')}</div>
	}

	if (error) {
		return <div className={styles.error}>{error}</div>
	}

	if (!author) {
		return (
			<div className={styles.noAuthor}>{t('Митець не знайдений.')}</div>
		)
	}

	const images = getImageUrl(author.images, '/Img/newsCardERROR.jpg')

	const handleAllArtistsPageClick = () => {
		navigate('/all-authors-page')
	}

	const handlePostClick = (id) => {
		navigate(`/posts/${id}`)
	}

	return (
		<div className={styles.AuthorsPageContainer}>
			<div className={styles.AuthorPhotoNameContainer}>
				<div className={styles.AuthorPhotoWrapper}>
					<img
						className={styles.AuthorPhoto}
						src={author.images || '/Img/ArtistPhoto.jpg'}
						alt={author.title}
						onError={(e) => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</div>
				<div className={styles.AuthorTitleWrapper}>
					<p className={styles.AuthorTitle}>{author.title}</p>
				</div>
			</div>
		</div>
	)
}
export default AuthorPostsLists
