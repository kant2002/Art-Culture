import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast, ToastContainer } from 'react-toastify'

function LikeAndShare({ className, postId, countClassName }) {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(true)
	const [likeStatus, setLikeStatus] = useState({ liked: false, likeCount: 0 })

	// Fetch like status and count on component load
	useEffect(() => {
		const fetchLikeStatus = async () => {
			console.log('[Front-end] => fetchLikeStatus for postId:', postId)
			try {
				const token = localStorage.getItem('token')
				const headers = token
					? { Authorization: `Bearer ${token}` }
					: {}

				const response = await axios.get('/api/like/status', {
					// Notice: these are query params
					params: { entityId: postId, entityType: 'post' },
					headers,
				})
				console.log(
					'[Front-end] => Response from /status:',
					response.data,
				)

				setLikeStatus({
					liked: response.data.liked,
					likeCount: response.data.likeCount,
				})
			} catch (error) {
				console.error(
					'[Front-end] => Error fetching like status:',
					error,
				)
				if (
					error.response?.status === 401 ||
					error.response?.status === 403
				) {
					console.warn(
						'[Front-end] => User not authenticated. Only count visible.',
					)
					try {
						const response = await axios.get('/api/like/count', {
							params: { entityId: postId, entityType: 'post' },
						})
						console.log(
							'[Front-end] => Fallback count:',
							response.data,
						)
						setLikeStatus((prevState) => ({
							...prevState,
							likeCount: response.data.likeCount,
						}))
					} catch (countError) {
						console.error(
							'[Front-end] => Error fetching like count:',
							countError,
						)
					}
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchLikeStatus()
	}, [postId])

	const handleLikeToggle = async () => {
		console.log(
			'[Front-end] => handleLikeToggle. Current status:',
			likeStatus,
		)
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				toast.error(t('Ви маєте бути зареєстровані для вподобайки'), {
					position: 'top-right',
				})
				return
			}

			setIsLoading(true)
			const headers = { Authorization: `Bearer ${token}` }

			const res = await axios.post(
				'/api/like/toggle',
				{ entityId: postId, entityType: 'post' },
				{ headers },
			)
			console.log('[Front-end] => toggle response:', res.data)

			setLikeStatus({
				liked: res.data.liked,
				likeCount: res.data.likeCount,
			})
		} catch (error) {
			console.error('[Front-end] => Error toggling like:', error)
			if (error.response?.data?.error === 'Already liked') {
				toast.error(t('Вже вподобанно вами!'), {
					position: 'top-right',
				})
			} else {
				toast.error(t('Сталася помилка. Спробуйте ще раз.'), {
					position: 'top-right',
				})
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div
			className={`${className ? className : ''} socialLikeAndShareInner`}
		>
			{countClassName && !isLoading ? (
				<div className={countClassName}>{likeStatus.likeCount}</div>
			) : (
				<div style={{ display: 'none' }}>{likeStatus.likeCount}</div>
			)}
			<button
				className={`socialLikeAndShareInner__likeButton circleButton ${likeStatus.liked ? 'liked' : ''}`}
				onClick={handleLikeToggle}
				disabled={isLoading}
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
