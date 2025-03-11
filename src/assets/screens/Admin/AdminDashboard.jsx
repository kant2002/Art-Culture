import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import styles from '@styles/components/UserProfile/AdminDashboard.module.scss'

const AdminDashboard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

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
				<div className={`${styles.AdminDashboardStatisticsItemContainer}`}>
					<h3 className={`${styles.AdminDashboardStatisticsItemTitle}`}>
						{t('Новини')}
					</h3>
					<h3 className={`${styles.AdminDashboardStatisticsItemValue}`}>1</h3>
					<button
						className={`${styles.AdminDashboardDemandARelookButton}`}
						// onClick={() => navigate('/admin/news')}
					>
						{t('Переглянути')}
					</button>
				</div>
				<div className={`${styles.AdminDashboardStatisticsItemContainer}`}>
					<h3 className={`${styles.AdminDashboardStatisticsItemTitle}`}>
						{t('Карточки')}
					</h3>
					<h3 className={`${styles.AdminDashboardStatisticsItemValue}`}>1</h3>
					<button
						className={`${styles.AdminDashboardDemandARelookButton}`}
					// onClick={() => navigate('/admin/news')}
					>
						{t('Переглянути')}
					</button>
				</div>
				<div
					className={`${styles.AdminDashboardStatisticsItemContainer}`}>
					<h3 className={`${styles.AdminDashboardStatisticsItemTitle}`}>
						{t('Нові користувачі')}
					</h3>
					<h3 className={`${styles.AdminDashboardStatisticsItemValue}`}>1</h3>
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
