import cn from 'clsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import MainPage from '../mainPage/MainPage'
import styles from '/src/styles/layout/Layout.module.scss'

const Layout = ({ children, heading = '', backLink = '/' }) => {
	return (
		<BrowserRouter>
			<section
				className={cn(styles.container, {
					[styles.otherPage]: !!heading,
				})}
			>
				<Header />

				<MainPage />

				<Footer />
			</section>
		</BrowserRouter>
	)
}
export default Layout
