import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/newsPage.module.scss'

function NewsPage() {
    const { t } = useTranslation();

    return (
        <div className={`${styles.newsPageContainer}`}>Hello world!</div>
    )
}

export default NewsPage
