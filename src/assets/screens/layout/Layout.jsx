import cn from 'clsx'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../components/VerificationPages/LoginPage'
import SignUp from '../../components/VerificationPages/SignUpPage'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import MainPage from '../mainPage/MainPage'
import UserProfile from '../userProfile/userProfile'
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
				<Routes>
					<Route path='/' element={<Navigate to='/MainPage' />} />
					<Route path='/MainPage' element={<MainPage />} />
					<Route path='/userProfile' element={<UserProfile />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
				<Footer />
			</section>
		</BrowserRouter>
	)
}
export default Layout
