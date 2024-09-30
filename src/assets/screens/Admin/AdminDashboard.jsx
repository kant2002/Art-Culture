// src/components/AdminDashboard.jsx

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from '../../../styles/screen/Admin/AdminDashboard.module.scss'

const AdminDashboard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAuth()

	// Fetch data or perform admin-specific actions here

	return (
		<div className={styles.adminDashboard}>
			<h2>{t('Admin Dashboard')}</h2>
			{/* Admin functionalities like managing users, posts, etc. */}
			<button onClick={() => navigate('/admin/users')}>
				{t('Manage Users')}
			</button>
			<button onClick={() => navigate('/admin/posts')}>
				{t('Manage Posts')}
			</button>
		</div>
	)
}

export default AdminDashboard
