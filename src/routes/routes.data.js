import Login from '../assets/components/VerificationPages/LoginPage'
import SignUp from '../assets/components/VerificationPages/SignUpPage'
import Home from '../assets/screens/home/Home'
import Layout from '../assets/screens/layout/Layout'
import MainPage from '../assets/screens/mainPage/MainPage'
import userProfile from '../assets/screens/userProfile/userProfile'
import userProfileAddPost from '../assets/screens/userProfile/userProfileAddPost'
import userProfilePosts from '../assets/screens/userProfile/userProfilePosts'

export const routes = [
	{
		path: '/',
		element: Home,
		isAuth: false,
	},

	{
		path: '/MainPage',
		element: MainPage,
		isAuth: false,
	},
	{
		path: '/Layout',
		element: Layout,
		isAuth: false,
	},

	{
		path: '/userProfile',
		element: userProfile,
		isAuth: true,
	},

	{
		path: '/login',
		element: Login,
		isAuth: false,
	},

	{
		path: '/signup',
		element: SignUp,
		isAuth: false,
	},

	{
		path: '/userProfileAddPost',
		element: userProfileAddPost,
		isAuth: true,
	},

	{
		path: '/userProfilePosts',
		element: userProfilePosts,
		isAuth: true,
	},
]
