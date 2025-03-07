import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'

const AdminDashboard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	return (
		<ProfilePageContainer>
			<div>
				<h2>{t('Панель керування')}</h2>				
			</div>
		</ProfilePageContainer>
	)
}

export default AdminDashboard
