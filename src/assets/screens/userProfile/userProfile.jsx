import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfile.module.scss'

const UserProfile = () => {
	const { user, logout, updateUser, loading, error } = useAuth() // Access user and logout from context
	const isUser = user && user.role === 'USER'
	const isCreator = user && user.role === 'CREATOR'
	const isMuseum = user && user.role === 'MUSEUM'
	const isAdmin = user && user.role === 'ADMIN'

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
		if (loading) return

		if (user) {
			console.log('User is logged in:', user)
			setEmail(user.email || '')
			setRegDate(
				user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''
			)
			setPageText(`${user.username || 'User'}'s User Profile`)
			setTitle(user.title || '')
			setBio(user.bio || '')
			setProfileImage(user.images || null)
		} else {
			if (error) {
				setServerMessage('No valid session found. Please login.')
			}
			navigate('/login') // Redirect to login page
		}
		console.log('UserProfile rendering for user:', user)
	}, [user, loading, error, navigate])

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

	const handleExhibitionListClick = () => {
		navigate('/Exhibitions')
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
				closeModal() // Закрываем модальное окно после успешного обновления
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.message || 'Update failed')
			} else {
				setServerMessage('An error occurred during profile update ')
			}
		}
	}

	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

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
				{!isUser && !isMuseum && (
					<>
						<button
							className={styles.profileAction}
							onClick={handleAddPostClick}
						>
							{t('Додати публікацію')}
						</button>
						<button className={styles.profileAction} onClick={handlePostsClick}>
							{t('Публікації')}
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
							{t('Переглянути вироби/картини')}
						</button>
					</>
				)}
				{isMuseum && (
					<>
						<button
							className={styles.profileAction}
							onClick={handleExhibitionCardCreateClick}
						>
							{t('Додати виставку')}
						</button>
						<button
							className={styles.profileAction}
							onClick={handleExhibitionListClick}
						>
							{t('Переглянути виставки')}
						</button>
					</>
				)}
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.profileInfo}>
				<div className={styles.profileTitleWrapper}>
					<h3 className={styles.profileTitle}>{t('Інформація профілю')}</h3>
				</div>
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
										<strong>{t('П.І.Б.')}:&#8194;</strong>
										{title}
									</p>
								)}

								{bio && (
									<p>
										<strong>{t('Про себе')}:&#8194;</strong> {bio}
									</p>
								)}

								<p>
									<strong>E-Mail:&#8194;</strong>
									{email}
								</p>
								<p>
									<strong>{t('Дата реєстрації')}:&#8194;</strong>
									{regDate}
								</p>

								{serverMessage && (
									<p className={styles.ErrorMessage}>{serverMessage}</p>
								)}

								<div className={styles.editButtonWrapper}>
									<button
										onClick={() => {
											toggleEditMode()
											openModal()
										}}
										className={styles.editButton}
									>
										{editMode ? t('Скасувати') : t('Редагувати')}
									</button>
								</div>
							</div>
						</div>
					)}

					<div className='App'>
						{isOpen && (
							<div className={styles.modal}>
								<div className={styles.modalContent}>
									{editMode && (
										<form
											className={styles.editProfileForm}
											onSubmit={handleUpdateProfile}
										>
											<div className={styles.modalTitleWrapper}>
												<h3 className={styles.modalTitle}>
													{t('Редагування профілю')}
												</h3>

												<div className={styles.closeButtonWrapper}>
													<button
														onClick={() => {
															toggleEditMode()
															closeModal()
														}}
														className={styles.editButton}
													>
														<span className={styles.close}>&times;</span>
													</button>
												</div>
											</div>

											<div className={styles.profileModalNameWrapper}>
												<p>
													<strong>{t('П.І.Б.')}&#8194;</strong>
												</p>

												<input
													type='text'
													placeholder='Title'
													name='title'
													value={title}
													onChange={e => setTitle(e.target.value)}
												/>
											</div>

											<div className={styles.profileModalBioWrapper}>
												<p>
													<strong>{t('Про себе')}&#8194;</strong>
												</p>

												<textarea
													placeholder='Bio'
													name='bio'
													value={bio}
													onChange={e => setBio(e.target.value)}
												/>
											</div>

											<div className={styles.profileModalImageDownloadWrapper}>
												<label className={styles.profileLabel}>
													{t('Додати зображення')}
													<input
														type='file'
														name='profileImages'
														accept='image/*'
														onChange={handleImageChange}
													/>
												</label>
											</div>

											<button className={styles.submitButton} type='submit'>
												{t('Оновити профіль')}
											</button>
										</form>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
