import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import styles from '@styles/components/UserProfile/AdminDashboard.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [pendingCounts, setPendingCounts] = useState({
		posts: 0,
		products: 0,
		users: 0,
	})

	useEffect(() => {
		const fetchPendingCounts = async () => {
			try {
				const { data } = await axios.get('/api/admin/pending-counts', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setPendingCounts(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchPendingCounts()
	}, [])

	return (
		<ProfilePageContainer>
			<h2 className={`${styles.AdminDashboardTitle}`}>
				{t('Панель керування')}
			</h2>
			<div className={`${styles.AdminDashboardDemandARelookContainer}`}>
				<h3 className={`${styles.AdminDashboardDemandARelookTitle}`}>
					{t('Потребують перегляду')}
				</h3>
			</div>
			<div className={`${styles.AdminDashboardStatisticsContainer}`}>
				<div
					className={`${styles.AdminDashboardStatisticsItemContainer}`}
				>
					<h3
						className={`${styles.AdminDashboardStatisticsItemTitle}`}
					>
						{t('Новини')}
					</h3>
					<h3
						className={`${styles.AdminDashboardStatisticsItemValue}`}
					>
						{pendingCounts.posts}
					</h3>
					<button
						className={`${styles.AdminDashboardDemandARelookButton}`}
						// onClick={() => navigate('/admin/news')}
					>
						{t('Переглянути')}
					</button>
				</div>
				<div
					className={`${styles.AdminDashboardStatisticsItemContainer}`}
				>
					<h3
						className={`${styles.AdminDashboardStatisticsItemTitle}`}
					>
						{t('Карточки')}
					</h3>
					<h3
						className={`${styles.AdminDashboardStatisticsItemValue}`}
					>
						{pendingCounts.products}
					</h3>
					<button
						className={`${styles.AdminDashboardDemandARelookButton}`}
						// onClick={() => navigate('/admin/news')}
					>
						{t('Переглянути')}
					</button>
				</div>
				<div
					className={`${styles.AdminDashboardStatisticsItemContainer}`}
				>
					<h3
						className={`${styles.AdminDashboardStatisticsItemTitle}`}
					>
						{t('Нові користувачі')}
					</h3>
					<h3
						className={`${styles.AdminDashboardStatisticsItemValue}`}
					>
						1
					</h3>
					<button
						className={`${styles.AdminDashboardDemandARelookButton}`}
						// onClick={() => navigate('/admin/news')}
					>
						{t('Переглянути')}
					</button>
				</div>
			</div>
		</ProfilePageContainer>
	)
}

export default AdminDashboard
