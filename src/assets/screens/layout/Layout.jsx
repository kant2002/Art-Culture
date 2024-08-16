import cn from 'clsx'
import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../components/VerificationPages/LoginPage'
import SignUp from '../../components/VerificationPages/SignUpPage'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import MainPage from '../mainPage/MainPage'
import UserProfile from '../userProfile/userProfile'
import UserProfileAddPost from '../userProfile/userProfileAddPost'
import UserProfilePosts from '../userProfile/userProfilePosts'
import styles from '/src/styles/layout/Layout.module.scss'

const Layout = ({ children, heading = '', backLink = '/' }) => {
	const [username, setUsername] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [serverMessage, setServerMessage] = useState('')
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
					<Route path='/userProfileAddPost' element={<UserProfileAddPost />} />
					<Route path='/userProfilePosts' element={<UserProfilePosts />} />
					<Route
						path='/login'
						element={
							<Login
								setUsername={setUsername}
								setIsLoggedIn={setIsLoggedIn}
								serverMessage={serverMessage}
								setServerMessage={setServerMessage}
							/>
						}
					/>
					<Route path='/signup' element={<SignUp />} />
				</Routes>
				<Footer />
			</section>
		</BrowserRouter>
	)
}
export default Layout
