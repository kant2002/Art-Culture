import React from "react";

const UserProfile = () => {
    return (
        <div className="profile">
            {/* Верхние кнопки */}
            <div className="profile__actions">
                <button className="profile__action">Кнопка 1</button>
                <button className="profile__action">Кнопка 2</button>
                <button className="profile__action">Кнопка 3</button>
            </div>

            {/* Аватар и информация о пользователе */}
            <div className="profile__info">
                <div className="profile__avatar">
                    <img src="ссылка_на_аватар" alt="Аватар пользователя" />
                </div>
                <div className="profile__details">
                    <div className="profile__field">
                        <span className="profile__label">ФИО:</span>
                        <span className="profile__value">Иван Иванов</span>
                        <button className="profile__edit">Редактировать</button>
                    </div>
                    <div className="profile__field">
                        <span className="profile__label">Дата рождения:</span>
                        <span className="profile__value">01.01.1990</span>
                        <button className="profile__edit">Редактировать</button>
                    </div>
                    <div className="profile__field">
                        <span className="profile__label">Почта:</span>
                        <span className="profile__value">example@mail.com</span>
                        <button className="profile__edit">Редактировать</button>
                    </div>
                    <div className="profile__field">
                        <span className="profile__label">Телефон:</span>
                        <span className="profile__value">+7 123 456 7890</span>
                        <button className="profile__edit">Редактировать</button>
                    </div>
                    <div className="profile__field">
                        <span className="profile__label">Соцсети:</span>
                        <span className="profile__value">Instagram, VK</span>
                        <button className="profile__edit">Редактировать</button>
                    </div>
                    <div className="profile__field">
                        <span className="profile__label">О себе:</span>
                        <span className="profile__value">
                            Краткое описание...
                        </span>
                        <button className="profile__edit">Редактировать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
