import React from "react";
import styles from "../../../styles/components/UserProfile/userProfileAddPost.module.scss";

const UserProfile = () => {
    return (
        <div className={`${styles.profile}`}>
            {/* Верхние кнопки */}
            <div className={`${styles.profileActions}`}>
                <button className={`${styles.profileAction} ${styles.profileActionActive}`}>Інформація</button>
                <button className={`${styles.profileAction}`}>Публікації</button>
                <button className={`${styles.profileAction}`}>Додати публікацію</button>
            </div>

			{/* Аватар и информация о пользователе */}
			<p>userProfileAddPost</p>
		</div>
	)
}

export default UserProfile
