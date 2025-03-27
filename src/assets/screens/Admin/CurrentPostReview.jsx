import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import styles from '@styles/components/UserProfile/AdminDashboard.module.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CurrentPostReview = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <ProfilePageContainer>
            <h2 className={styles.AdminDashboardTitle}>
                {t('На розгляді')}
            </h2>
        </ProfilePageContainer>
    )
}

export default CurrentPostReview
