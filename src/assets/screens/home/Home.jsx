import Login from '../../components/VerificationPages/LoginPage'
import SignUp from '../../components/VerificationPages/SignUpPage'
import Layout from '../layout/Layout'
import UserProfile from '../userProfile/userProfile'
function Home() {
	return (
		<Layout>
			<UserProfile />
			<SignUp />
			<Login />
		</Layout>
	)
}

export default Home
