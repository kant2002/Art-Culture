import React from 'react'
import { AuthProvider } from '../../../Context/AuthContext'
import Login from '../../components/VerificationPages/LoginPage'
import SignUp from '../../components/VerificationPages/SignUpPage'
import Layout from '../layout/Layout'
import UserProfile from '../userProfile/userProfile'
function Home() {
	return (
		<Layout>
			<AuthProvider>
				<UserProfile />
				<SignUp />
				<Login />
			</AuthProvider>
		</Layout>
	)
}

export default Home
