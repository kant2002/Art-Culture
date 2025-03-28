import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import styles from '@styles/components/UserProfile/CurrentPostReview.module.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CurrentPostReview = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <ProfilePageContainer>
            <h2>
                {t('На розгляді')}
            </h2>
            <div className={`${styles.PostContainer}`}>
                <div className={`${styles.LeftContainer}`}>
                    <div className={`${styles.AuthorContainer}`}>
                        <div className={`${styles.AuthorImageContainer}`}>
                            <img src="/images/avatar.jpg" alt="avatar" /> //Вместо этого текста вставить аватар автора
                        </div>
                        <div className={`${styles.AuthorNameContainer}`}>
                            <h3>
                                {t('Імя автора')} //Вместо этого текста вставить имя автора
                            </h3>
                        </div>
                    </div>
                    <div className={`${styles.DateContainer}`}>
                        <h4>
                            {t('Дата')} //Вместо этого текста вставить дату
                        </h4>
                    </div>
                </div>
                <div className={`${styles.RightContainer}`}>
                    <div className={`${styles.TitleContainer}`}>
                        <h2>
                            {t('Назва')} //Вместо этого текста вставить Заголовок
                        </h2>
                    </div>
                    <div className={`${styles.DescriptionContainer}`}>
                        <p className={`${styles.DescriptionText}`}>
                            {t('Опис')} //Вместо этого текста вставить описание
                        </p>
                    </div>
                    <div className={`${styles.ButtonsContainer}`}>
                        <button
                            className={`${styles.Button} ${styles.AcceptButton}`}
                            onClick={() => navigate('/admin/accept-post')}
                        >
                            {t('Прийняти')}
                        </button>
                        <button
                            className={`${styles.Button} ${styles.RejectButton}`}
                            onClick={() => navigate('/admin/reject-post')}
                        >
                            {t('Відхилити')}
                        </button>
                    </div>
                </div>
            </div>
        </ProfilePageContainer>
    )
}

export default CurrentPostReview
