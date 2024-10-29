import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfile.module.scss'
const UserProfile = () => {
	const { user, logout, updateUser } = useAuth() // Access user and logout from context
	const [pageText, setPageText] = useState('')
	const [email, setEmail] = useState('')
	const [regDate, setRegDate] = useState('')
	const [serverMessage, setServerMessage] = useState('')
	const [title, setTitle] = useState('')
	const [bio, setBio] = useState('')
	const [profileImage, setProfileImage] = useState(null) // Can hold File object or URL
	const [editMode, setEditMode] = useState(false)
	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			setEmail(`${user.email}`)
			setRegDate(
				`${new Date(user.createdAt).toLocaleDateString()}`
			)
			setPageText(`${user.username}'s User Profile`)
			setTitle(user.title || '')
			setBio(user.bio || '')
			setProfileImage(user.images || null)
		} else {
			setServerMessage('No valid session found. Please login.')
			navigate('/login') // Redirect to login page
		}
		console.log('UserProfile rendering for user:', user)
	}, [user, navigate])

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	const handleProductCartCreateClick = () => {
		navigate('/ProductCardCreate')
	}

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleExhibitionCardCreateClick = () => {
		navigate('/ExhibitionCardCreate')
	}

	const toggleEditMode = () => {
		setEditMode(!editMode)
		setServerMessage('')
	}

	const handleUpdateProfile = async e => {
		e.preventDefault()
		setServerMessage('')

		const formData = new FormData()
		formData.append('title', title)
		formData.append('bio', bio)
		if (profileImage instanceof File) {
			formData.append('profileImage', profileImage)
		}

		try {
			const response = await API.put('/auth/me', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			if (response.status === 200) {
				const { user: updatedUserProfile, message } = response.data
				setServerMessage(message)
				setEditMode(false)
				updateUser(updatedUserProfile)
				// const meResponse = await API.get('/auth/me')
				// if (meResponse.status === 200) {
				// 	login(meResponse.data.user, '')
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.message || 'Update failed')
			} else {
				setServerMessage('An error occurred during profile update ')
			}
		}
	}

	const handleImageChange = e => {
		if (e.target.files && e.target.files[0]) {
			setProfileImage(e.target.files[0])
		}
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleProfilePageClick}
				>
					{t('Профіль')}
				</button>
				<button className={styles.profileAction} onClick={handlePostsClick}>
					{t('Публікації')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
				</button>

				<button
					className={styles.profileAction}
					onClick={handleProductCartCreateClick}
				>
					{t('Додати картину')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handlePaintingCardListClick}
				>
					{t('Переглянути вироби/картини ')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionCardCreateClick}
				>
					{t('Додати виставку ')}
				</button>
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.profileInfo}>
				<div className={styles.profileDetails}>
					<h2>{pageText}</h2>
					{profileImage && (
						<div className={styles.profileInformationContainer}>
							<div className={styles.profileAvatarWrapper}>
								<div className={styles.profileAvatar}>
									<img
										src={
											profileImage instanceof File
												? URL.createObjectURL(profileImage)
												: profileImage.startsWith('http') ||
													profileImage.startsWith('/uploads/profileImages')
													? `${process.env.REACT_APP_API_URL}${profileImage}`
													: profileImage
										}
										alt='Profile'
										className={styles.profileImage}
									/>
								</div>
							</div>

							<div className={styles.profileTextWrapper}>

								{title && (
									<p>
										<strong>{t('П.І.Б.')}:&#8194;</strong>{title}
									</p>
								)}

								{bio && (
									<p>
										<strong>{t('Про себе')}:&#8194;</strong> {bio}
									</p>
								)}

								<p><strong>E-Mail:&#8194;</strong>{email}</p>
								<p><strong>{t('Дата реєстрації')}:&#8194;</strong>{regDate}</p>

								{serverMessage && (
									<p className={styles.ErrorMessage}>{serverMessage}</p>
								)}

								{console.log(serverMessage)}


								<div className={styles.editButtonWrapper}>

									<button onClick={toggleEditMode} className={styles.editButton}>
										{editMode ? t('Скасувати') : t('Редагувати')}
									</button>

								</div>

							</div>

						</div>
					)}


					{editMode && (
						<form
							className={styles.editProfileForm}
							onSubmit={handleUpdateProfile}
						>
							<input
								type='text'
								placeholder='Title'
								name='title'
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
							<textarea
								placeholder='Bio'
								name='bio'
								value={bio}
								onChange={e => setBio(e.target.value)}
							/>
							<input
								type='file'
								name='profileImages'
								accept='image/*'
								onChange={handleImageChange}
							/>
							<button type='submit'>Update Profile</button>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserProfile
