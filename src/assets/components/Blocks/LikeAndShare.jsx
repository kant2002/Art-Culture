import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast, ToastContainer } from 'react-toastify'

function LikeAndShare({ className, postId, countClassName }) {
	const { t } = useTranslation()
	const [like, setLike] = useState(false)
	const [likeCount, setLikeCount] = useState(0)

	// Fetch like status and count on component load
	useEffect(() => {
		const fetchLikeStatus = async () => {
			try {
				const token = localStorage.getItem('token')
				const headers = token
					? { Authorization: `Bearer ${token}` }
					: {}

				const response = await axios.get(`/api/like/status`, {
					params: { entityId: postId, entityType: 'post' },
					headers,
				})

				setLike(response.data.liked)
				setLikeCount(response.data.likeCount)
			} catch (error) {
				if (
					error.response?.status === 401 ||
					error.response?.status === 403
				) {
					console.warn(
						'User not authenticated. Only like count is visible.',
					)
					try {
						const response = await axios.get(`/api/like/count`, {
							params: { entityId: postId, entityType: 'post' },
						})
						setLikeCount(response.data.likeCount)
					} catch (countError) {
						console.error('Error fetching like count:', countError)
					}
				} else {
					console.error('Error fetching like status:', error)
				}
			}
		}

		fetchLikeStatus()
	}, [postId])

	const handleLikeClick = async () => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				toast.error(t('Ви маєте бути зареестровані для вподобайки'), {
					position: 'top-right',
				})
				return
			}

			const headers = { Authorization: `Bearer ${token}` }
			if (like) {
				await axios.delete(`/api/like/unlike`, {
					data: { entityId: postId, entityType: 'post' },
					headers,
				})
				setLikeCount((prev) => prev - 1)
				setLike(false)
			} else {
				await axios.post(
					`/api/like`,
					{ entityId: postId, entityType: 'post' },
					{ headers },
				)
				setLikeCount((prev) => prev + 1)
				setLike(true)
			}
		} catch (error) {
			console.error('Error liking/unliking the post:', error)
			toast.error(t('An error occurred. Please try again.'), {
				position: 'top-right',
			})
		}
	}

	return (
		<div
			className={`${className ? className : ''} socialLikeAndShareInner`}
		>
			{countClassName ? (
				<div className={countClassName}>{likeCount}</div>
			) : (
				<div>{likeCount}</div>
			)}
			<button
				className={`socialLikeAndShareInner__likeButton circleButton ${like ? 'liked' : ''}`}
				onClick={handleLikeClick}
			>
				<img
					className="likeButtonImg"
					src="/Img/likeHeart.svg"
					alt={t('Світлина вподобайки')}
					onError={(e) => {
						e.target.onerror = null
						e.target.src = '/Img/likeHeart.svg'
					}}
				/>
			</button>
			<ToastContainer />
			<button className="socialLikeAndShareInner__shareButton circleButton">
				<img
					className="shareButtonImg"
					src="/Img/shareArrow.svg"
					alt={t('Світлина вподобайки')}
					onError={(e) => {
						e.target.onerror = null
						e.target.src = '/Img/likeHeart.svg'
					}}
				/>
			</button>
		</div>
	)
}

LikeAndShare.propTypes = {
	className: PropTypes.string,
	postId: PropTypes.number.isRequired,
	countClassName: PropTypes.string,
}

export default LikeAndShare
