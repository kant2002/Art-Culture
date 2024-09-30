import React from 'react'
import { AuthProvider } from '../../../Context/AuthContext'
import Login from '../../components/VerificationPages/LoginPage'
import SignUp from '../../components/VerificationPages/SignUpPage'
import AdminDashboard from '../Admin/AdminDashboard'
import Layout from '../layout/Layout'
import UserProfile from '../userProfile/userProfile'
function Home() {
	return (
		<Layout>
			<AuthProvider>
				<UserProfile />
				<AdminDashboard />
				<SignUp />
				<Login />
			</AuthProvider>
		</Layout>
	)
}

export default Home
