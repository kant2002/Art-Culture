import React from "react";
import styles from "../../../styles/layout/userProfile.module.scss";

const UserProfile = () => {
    return (
        <div className={`${styles.profile}`}>
            {/* Верхние кнопки */}
            <div className={`${styles.profileActions}`}>
                <button className={`${styles.profileAction}`}>Информация о пользователе</button>
                <button className={`${styles.profileAction}`}>Посты пользователя</button>
                <button className={`${styles.profileAction}`}>Добавить пост</button>
            </div>

            {/* Аватар и информация о пользователе */}
            <div className={`${styles.profile__info}`}>
                <div className={`${styles.profile__avatar}`}>
                    <img src="ссылка_на_аватар" alt="Аватар пользователя" />
                </div>
                <div className={`${styles.profile__details}`}>
                    <div className={`${styles.profile__field}`}>
                        <span className={`${styles.profile__label}`}>ФИО:</span>
                        <span className={`${styles.profile__value}`}>Иван Иванов</span>
                        <button className={`${styles.profile__edit}`}>Редактировать</button>
                    </div>
                    <div className={`${styles.profile__field}`}>
                        <span className={`${styles.profile__label}`}>Дата рождения:</span>
                        <span className={`${styles.profile__value}`}>01.01.1990</span>
                        <button className={`${styles.profile__edit}`}>Редактировать</button>
                    </div>
                    <div className={`${styles.profile__field}`}>
                        <span className={`${styles.profile__label}`}>Почта:</span>
                        <span className={`${styles.profile__value}`}>example@mail.com</span>
                        <button className={`${styles.profile__edit}`}>Редактировать</button>
                    </div>
                    <div className={`${styles.profile__field}`}>
                        <span className={`${styles.profile__label}`}>Телефон:</span>
                        <span className={`${styles.profile__value}`}>+7 123 456 7890</span>
                        <button className={`${styles.profile__edit}`}>Редактировать</button>
                    </div>
                    <div className={`${styles.profile__field}`}>
                        <span className={`${styles.profile__label}`}>Соцсети:</span>
                        <span className={`${styles.profile__value}`}>Instagram, VK</span>
                        <button className={`${styles.profile__edit}`}>Редактировать</button>
                    </div>
                    <div className={`${styles.profile__field}`}>
                        <span className={`${styles.profile__label}`}>О себе:</span>
                        <span className={`${styles.profile__value}`}>
                            Краткое описание...
                        </span>
                        <button className={`${styles.profile__edit}`}>Редактировать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
